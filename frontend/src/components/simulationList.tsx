import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SimulationDto } from "../types/simulation";
import { useInView } from "react-intersection-observer";

export default function SimulationList() {
  const [data, setData] = useState<SimulationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const { ref, inView } = useInView();

  const [counter, setCounter] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  const getSimulations = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/simulation/ten?index=" + counter,
      );
      if (response.data.data.length === 0) {
        setFinished(true);
        return;
      }
      setData([...data, ...response.data.data]);
      setCounter(counter + 1);
    } catch (error) {
      setError("Erro ao buscar dados de simulções antigas!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSimulations();
    if (inView) {
      getSimulations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col flex-grow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of Simulations
      </h2>
      <div
        ref={divRef}
        className="flex flex-col gap-4 overflow-y-auto scrollbar-thin"
      >
        {data.map((simulation) => (
          <div key={simulation.id} className="flex flex-col p-2">
            <div className="flex flex-wrap">
              <p className="mr-10">
                <strong>Client Name:</strong> {simulation.clientName}
              </p>
              <p>
                <strong>Product dimensions:</strong> {simulation.productHeight}x
                {simulation.productWidth}x{simulation.productLength}
              </p>
            </div>
            <div className="flex flex-wrap">
              <p>
                <strong>Address From:</strong>{" "}
                {simulation.fromAddress
                  .replaceAll("%20", " ")
                  .replaceAll("%2C", ",")}
              </p>
            </div>
            <div className="flex flex-wrap">
              <p>
                <strong>Address To:</strong>{" "}
                {simulation.toAddress
                  .replaceAll("%20", " ")
                  .replaceAll("%2C", ",")}
              </p>
            </div>
            <hr className="border-t border-gray-300 mt-2"></hr>
          </div>
        ))}
        {finished && (
          <div ref={ref} className="flex items-center justify-center">
            End of the simulations list
          </div>
        )}
        {!finished && (
          <div ref={ref} className="flex items-center justify-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

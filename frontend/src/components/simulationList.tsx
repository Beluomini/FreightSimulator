import React, { useEffect, useState } from "react";
import axios from "axios";
import { SimulationDto } from "../types/simulation";

const mockedSimulations = [
  {
    id: "1",
    clientName: "Client 1",
    productHeight: 1.0,
    productLength: 1.0,
    productWidth: 1.0,
    toAddress: "Address 1",
    fromAddress: "Address 2",
  },
  {
    id: "2",
    clientName: "Client 2",
    productHeight: 2.0,
    productLength: 2.0,
    productWidth: 2.0,
    toAddress: "Address 2",
    fromAddress: "Address 3",
  },
  {
    id: "3",
    clientName: "Client 3",
    productHeight: 3.0,
    productLength: 3.0,
    productWidth: 3.0,
    toAddress: "Address 3",
    fromAddress: "Address 4",
  },
  {
    id: "3",
    clientName: "Client 3",
    productHeight: 3.0,
    productLength: 3.0,
    productWidth: 3.0,
    toAddress: "Address 3",
    fromAddress: "Address 4",
  },
  {
    id: "3",
    clientName: "Client 3",
    productHeight: 3.0,
    productLength: 3.0,
    productWidth: 3.0,
    toAddress: "Address 3",
    fromAddress: "Address 4",
  },
  {
    id: "3",
    clientName: "Client 3",
    productHeight: 3.0,
    productLength: 3.0,
    productWidth: 3.0,
    toAddress: "Address 3",
    fromAddress: "Address 4",
  },
];

export default function SimulationList() {
  const [data, setData] = useState<SimulationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/simulation",
        );
        setData(response.data.data);
      } catch (error) {
        setData(mockedSimulations);
        setError(""); //Erro ao buscar dados de simulções antigas
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of Simulations
      </h2>
      <div className="flex flex-col gap-4">
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
                <strong>Address From:</strong> {simulation.fromAddress}
              </p>
            </div>
            <div className="flex flex-wrap">
              <p>
                <strong>Address To:</strong> {simulation.toAddress}
              </p>
            </div>
            <hr className="border-t border-gray-300 mt-2"></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

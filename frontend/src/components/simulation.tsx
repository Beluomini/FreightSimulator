import React, { useEffect, useState } from "react";
import axios from "axios";

interface Simulation {
  id: number;
  userName: string;
  prodHeight: number;
  prodWidth: number;
  prodDepth: number;
  prodWeight: number;
  toAddress: string;
  fromAddress: string;
  distance: number;
  fasterLogisticOperator: string;
  cheaperLogisticOperator: string;
}

const mockedSimulation = {
  id: 1,
  userName: "Test User",
  prodHeight: 10,
  prodWidth: 10,
  prodDepth: 10,
  prodWeight: 10,
  toAddress: "Rua dos Bobos, 0",
  fromAddress: "Rua dos Bobos, 0",
  distance: 10,
  fasterLogisticOperator: "Logistic Operator 1",
  cheaperLogisticOperator: "Logistic Operator 2",
};

export default function SimulationData() {
  const [data, setData] = useState<Simulation>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/logistic-operator",
        );
        setData(response.data.data);
      } catch (error) {
        setData(mockedSimulation);
        setError("Erro ao buscar dados");
        console.error("Erro ao buscar dados:", error);
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
      <h2 className="text-xl font-semibold mb-3">
        Simulation
      </h2>

      <div className="mb-2">
        <p className="text-gray-500">User Name</p>
        <div className="border border-gray-500 pl-2 rounded-md w-1/2">
          <p className="sm:text-sm">{data.userName}</p>
        </div>
      </div>
      
      <div className="mb-2">
        <p className="text-gray-500">Produto</p>
        <div className="border border-gray-300 px-2 rounded-md">  
          <div className="mb-2 grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500">Height</p>
              <div className="flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodHeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Width</p>
              <div className="flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodWidth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Depth</p>
              <div className="flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodDepth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Weight</p>
              <div className="flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodWeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">From Address</p>
        <div className="flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.fromAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">To Address</p>
        <div className="flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.toAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Distance</p>
        <div className="md:w-1/4 flex justify-end items-center border border-gray-500 pr-2 rounded-md">
          <p className="sm:text-sm">{data.distance}</p>
          <p className="pl-1 text-gray-500 sm:text-sm">km</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Faster Logistic Operator</p>
        <div className="flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.fasterLogisticOperator}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Cheaper Logistic Operator</p>
        <div className="flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.cheaperLogisticOperator}</p>
        </div>
      </div>
    </div>
  );
}

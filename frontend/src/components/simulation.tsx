import React, { useEffect, useState } from "react";
import { SimulationResponse } from "../types/simulation";

const mockedSimulation = {
  id: 1,
  userName: " ",
  prodHeight: 0,
  prodWidth: 0,
  prodDepth: 0,
  prodWeight: 0,
  toAddress: " ",
  fromAddress: " ",
  distance: 0,
  fasterLogisticOperator: " ",
  cheaperLogisticOperator: " ",
};

export default function SimulationData() {
  const [data, setData] = useState<SimulationResponse>(mockedSimulation);

  useEffect(() => {
    setData(mockedSimulation);
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-3">Simulation</h2>

      <div className="mb-2 flex">
        <p className="text-gray-500">User Name:</p>
        <div className="min-h-[20px] ml-5 flex-grow border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.userName}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Produto</p>
        <div className="border border-gray-300 px-2 rounded-md">
          <div className="mb-2 grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500">Height:</p>
              <div className="min-h-[20px] flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodHeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Width:</p>
              <div className="min-h-[20px] flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodWidth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Depth:</p>
              <div className="min-h-[20px] flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodDepth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Weight:</p>
              <div className="min-h-[20px] flex justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{data.prodWeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">From Address</p>
        <div className="min-h-[25px] flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.fromAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">To Address</p>
        <div className="min-h-[25px] flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.toAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Distance</p>
        <div className="md:w-1/4 min-h-[25px] flex justify-end items-center border border-gray-500 pr-2 rounded-md">
          <p className="sm:text-sm">{data.distance}</p>
          <p className="pl-1 text-gray-500 sm:text-sm">km</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Faster Logistic Operator</p>
        <div className="min-h-[25px] flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.fasterLogisticOperator}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Cheaper Logistic Operator</p>
        <div className="min-h-[25px] flex border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{data.cheaperLogisticOperator}</p>
        </div>
      </div>
    </div>
  );
}

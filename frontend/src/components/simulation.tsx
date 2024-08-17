import React, { useEffect, useState } from "react";
import { SimulationResponse } from "../types/simulation";

const mockedSimulation = {
  id: 1,
  clientName: " ",
  productHeight: 0,
  productWidth: 0,
  productDepth: 0,
  productWeight: 0,
  toAddress: " ",
  fromAddress: " ",
  distance: 0,
  fasterOperator: {
    id: " ",
    name: " ",
    weightCost: 0,
    distanceMult: 0,
    distanceMult100: 0,
    distanceMult500: 0,
    deliveryTime: 0,
    deliveryTime100: 0,
    deliveryTime500: 0,
    createdAt: " ",
    updatedAt: " ",
  },
  cheaperOperator: {
    id: " ",
    name: " ",
    weightCost: 0,
    distanceMult: 0,
    distanceMult100: 0,
    distanceMult500: 0,
    deliveryTime: 0,
    deliveryTime100: 0,
    deliveryTime500: 0,
    createdAt: " ",
    updatedAt: " ",
  },
};

interface SimulationDataProps {
  data?: {
    statusCode: number;
    data: SimulationResponse;
  };
}

export default function SimulationData({ data }: SimulationDataProps) {
  const [lastSimData, setLastSimData] =
    useState<SimulationResponse>(mockedSimulation);

  useEffect(() => {
    if (data) {
      data.data.toAddress = data.data.toAddress.replaceAll("%20", " ");
      data.data.toAddress = data.data.toAddress.replaceAll("%2C", ",");
      data.data.fromAddress = data.data.fromAddress.replaceAll("%20", " ");
      data.data.fromAddress = data.data.fromAddress.replaceAll("%2C", ",");
      setLastSimData(data.data);
      console.log(data.data);
    } else {
      setLastSimData(mockedSimulation);
    }
  }, [data]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-3">Simulation</h2>

      <div className="mb-2 flex">
        <p className="text-gray-500">User Name:</p>
        <div className="min-h-[20px] ml-5 flex-grow flex items-center border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.clientName}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Produto</p>
        <div className="border border-gray-300 px-2 rounded-md">
          <div className="mb-2 grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500">Height:</p>
              <div className="min-h-[20px] flex items-center justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{lastSimData.productHeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Width:</p>
              <div className="min-h-[20px] flex items-center justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{lastSimData.productWidth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Depth:</p>
              <div className="min-h-[20px] flex items-center justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{lastSimData.productDepth}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">cm</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Weight:</p>
              <div className="min-h-[20px] flex items-center justify-end border border-gray-500 pr-2 rounded-md">
                <p className="sm:text-sm">{lastSimData.productWeight}</p>
                <p className="pl-1 text-gray-500 sm:text-sm">g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">From Address</p>
        <div className="min-h-[25px] overflow-x-auto flex border items-center border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.fromAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">To Address</p>
        <div className="min-h-[25px] overflow-x-auto flex border items-center border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.toAddress}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Distance</p>
        <div className="md:w-1/2 overflow-x-auto min-h-[25px] flex justify-end items-center border border-gray-500 pr-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.distance}</p>
          <p className="pl-1 text-gray-500 sm:text-sm">km</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Faster Logistic Operator</p>
        <div className="min-h-[25px] flex items-center border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.fasterOperator.name}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-500">Cheaper Logistic Operator</p>
        <div className="min-h-[25px] flex items-center border border-gray-500 pl-2 rounded-md">
          <p className="sm:text-sm">{lastSimData.cheaperOperator.name}</p>
        </div>
      </div>
    </div>
  );
}

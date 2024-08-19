import Head from "next/head";
import Link from "next/link";
import Form from "../components/form";
import LOList from "../components/logisticOperatorsList";
import SimulationData from "../components/simulation";
import { useState } from "react";
import { SimulationAPIResponse } from "../types/simulation";

export default function Home() {
  const [simulationData, setSimulationData] = useState<SimulationAPIResponse>();

  const handleFormSubmit = (data: SimulationAPIResponse) => {
    setSimulationData(data);
  };

  return (
    <>
      <div>
        <Head>
          <title>Shipping Simulator</title>
        </Head>
        <div className="flex flex-wrap justify-center">
          <div className="md:w-1/2 p-5 border mx-5 mr-0 my-5 bg-slate-200 rounded-lg">
            <h1 className="text-xl font-bold">Shipping Simulator</h1>
            <p className="text-sm text-gray-500 mb-5">
              {" "}
              Made by Lucas Beluomini{" "}
            </p>
            <p className="mb-5 text-sm">
              This is a shipping calculator using product characteristics and
              address latitude and longitude (Geocoding API). The full code can
              be seen on my{" "}
              <Link
                className="font-bold underline"
                href="https://github.com/Beluomini/ShippingSimulator"
                target={"_blank"}
              >
                Github
              </Link>
            </p>
            <Form onFormSubmit={handleFormSubmit} />
          </div>
          <div className="md:w-1/3 flex flex-col justify-between mx-4 mb-5 my-5 rounded-lg">
            <div className="flex-grow p-5 border bg-slate-200 rounded-lg">
              <SimulationData data={simulationData} />
            </div>
          </div>
          <div className="flex-grow max-h-[20rem] mx-[7.8%] mb-3 overflow-y-auto p-5 border bg-slate-200 rounded-lg">
            <LOList />
          </div>
        </div>
      </div>
    </>
  );
}

import Head from "next/head";
import Link from "next/link";
import Form from "../components/form";
import LOList from "../components/logisticOperatorsList";

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Shipping Simulator</title>
        </Head>
        <div className="flex flex-wrap justify-center">
          <div className="md:w-1/2 w-5/6 p-5 border mx-5 mr-0 my-5 bg-slate-200 rounded-lg">
            <h1 className="text-xl font-bold">Shipping Simulator</h1>
            <p className="text-sm text-gray-500 mb-5">
              {" "}
              Made by Lucas Beluomini{" "}
            </p>
            <p className="mb-12">
              This is a shipping calculator using product characteristics and
              address latitude and longitude (Geocoding API).
              <br />
              The full code can be seen on my{" "}
              <Link
                className="font-bold underline"
                href="https://github.com/Beluomini/ShippingSimulator"
                target={"_blank"}
              >
                Github
              </Link>
            </p>
            <Form />
          </div>
          <div className="md:w-1/4 w-5/6 h-1/4 p-5 border mx-4 my-5 bg-slate-200 rounded-lg">
            <LOList />
          </div>
        </div>
      </div>
    </>
  );
}

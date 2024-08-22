import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { handleAdress } from "../utils/handleAdress";
import { SimulationAPIResponse } from "../types/simulation";

const formSchema = z.object({
  userName: z.string().min(1, { message: "User name is required" }),
  productHeight: z.string().min(1, { message: "Height name is required" }),
  productWidth: z.string().min(1, { message: "Width name is required" }),
  productLenght: z.string().min(1, { message: "Length name is required" }),
  cep1: z.string().length(8, { message: "CEP must contain only numbers (8)" }),
  country1: z.string().min(1, { message: "Country is required" }),
  state1: z.string().length(2, { message: "State must be 2 characters (UF)" }),
  city1: z.string().min(1, { message: "City is required" }),
  neighborhood1: z.string().min(1, { message: "Neighborhood is required" }),
  address1: z.string().min(1, { message: "Street is required" }),
  number1: z.string().min(1, { message: "Number is required" }),
  cep2: z.string().length(8, { message: "CEP must contain only numbers (8)" }),
  country2: z.string().min(1, { message: "Country is required" }),
  state2: z.string().length(2, { message: "State must be 2 characters (UF)" }),
  city2: z.string().min(1, { message: "City is required" }),
  neighborhood2: z.string().min(1, { message: "Neighborhood is required" }),
  address2: z.string().min(1, { message: "Street is required" }),
  number2: z.string().min(1, { message: "Number is required" }),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
  /* eslint-disable-next-line  no-unused-vars */
  onFormSubmit: (data: SimulationAPIResponse) => void;
}

export default function Form({ onFormSubmit }: FormProps) {
  const [result, setResult] = useState<string>();
  const [resultColor, setResultColor] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const processForm = async (data: FormData) => {
    // @ts-ignore-next-line
    try {
      const adressTo = handleAdress(
        data.address1,
        data.number1,
        data.neighborhood1,
        data.city1,
        data.state1,
        data.cep1,
        data.country1,
      );
      const adressFrom = handleAdress(
        data.address2,
        data.number2,
        data.neighborhood2,
        data.city2,
        data.state2,
        data.cep2,
        data.country2,
      );

      const config = {
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL + "/simulation",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          clientName: data.userName,
          fromAddress: adressFrom,
          toAddress: adressTo,
          productHeight: parseFloat(data.productHeight),
          productWidth: parseFloat(data.productWidth),
          productLength: parseFloat(data.productLenght),
        },
      };

      const response = await axios(config);
      if (response.status === 200 || response.status === 201) {
        onFormSubmit(response.data);
        setResult("");
        setResultColor("text-green-500");
        reset();
      }
    } catch (err: any) {
      setResult("error: " + err);
      setResultColor("text-red-500");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(processForm)} noValidate>
      {/* Nome de Usuário */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          User Name
        </label>
        <input
          type="text"
          id="username"
          placeholder="User Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("userName")}
        />
        {errors.userName?.message && (
          <div className="text-red-500 text-xs mt-1">
            {errors.userName?.message}
          </div>
        )}
      </div>

      {/* Dimensões do Produto */}
      <div className="grid grid-cols-3 gap-8">
        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-700"
          >
            Height
          </label>
          <input
            type="number"
            id="height"
            {...register("productHeight")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.productHeight?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.productHeight?.message}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="width"
            className="block text-sm font-medium text-gray-700"
          >
            Width
          </label>
          <input
            type="number"
            id="width"
            {...register("productWidth")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.productWidth?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.productWidth?.message}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="length"
            className="block text-sm font-medium text-gray-700"
          >
            Length
          </label>
          <input
            type="number"
            id="length"
            {...register("productLenght")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.productLenght?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.productLenght?.message}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Endereço 2 */}
        <div>
          <label
            htmlFor="addressFrom"
            className="block text-sm font-medium text-gray-700"
          >
            Address From
          </label>
          <div className="border border-gray-300 rounded-lg p-2">
            <label
              htmlFor="cep2"
              className="block text-sm mt-2 pl-2 font-medium text-gray-700"
            >
              CEP
            </label>
            <input
              type="text"
              id="cep2"
              {...register("cep2")}
              placeholder="CEP (Just numbers)"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cep2?.message && (
              <div className="text-red-500 text-xs mt-1">
                {errors.cep2?.message}
              </div>
            )}
            <label
              htmlFor="address2"
              className="block text-sm mt-2 pl-2 font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address2"
              {...register("address2")}
              placeholder="Street"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.address2?.message && (
              <div className="text-red-500 text-xs mt-1">
                {errors.address2?.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="number2"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Number
                </label>
                <input
                  type="text"
                  id="number2"
                  {...register("number2")}
                  placeholder="Number"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.number2?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.number2?.message}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="neighborhood2"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Neighborhood
                </label>
                <input
                  type="text"
                  id="neighborhood2"
                  {...register("neighborhood2")}
                  placeholder="Neighborhood"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.neighborhood2?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.neighborhood2?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <label
                  htmlFor="city2"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city2"
                  {...register("city2")}
                  placeholder="City"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.city2?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.city2?.message}
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="state2"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state2"
                  {...register("state2")}
                  placeholder="XX"
                  maxLength={2}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.state2?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.state2?.message}
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="country2"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country2"
                  {...register("country2")}
                  placeholder="Country"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.country2?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.country2?.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Endereço 1 */}
        <div>
          <label
            htmlFor="addressTo"
            className="block text-sm font-medium text-gray-700"
          >
            Address To
          </label>
          <div className="border border-gray-300 rounded-lg p-2">
            <label
              htmlFor="cep"
              className="block text-sm mt-2 pl-2 font-medium text-gray-700"
            >
              CEP
            </label>
            <input
              type="text"
              id="cep1"
              {...register("cep1")}
              placeholder="CEP (Just numbers)"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cep1?.message && (
              <div className="text-red-500 text-xs mt-1">
                {errors.cep1?.message}
              </div>
            )}
            <label
              htmlFor="address1"
              className="block text-sm mt-2 pl-2 font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address1"
              {...register("address1")}
              placeholder="Street"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.address1?.message && (
              <div className="text-red-500 text-xs mt-1">
                {errors.address1?.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="number1"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Number
                </label>
                <input
                  type="text"
                  id="number1"
                  {...register("number1")}
                  placeholder="Number"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.number1?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.number1?.message}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="neighborhood1"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Neighborhood
                </label>
                <input
                  type="text"
                  id="neighborhood1"
                  {...register("neighborhood1")}
                  placeholder="Neighborhood"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.neighborhood1?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.neighborhood1?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <label
                  htmlFor="city1"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city1"
                  {...register("city1")}
                  placeholder="City"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.city1?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.city1?.message}
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="state1"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state1"
                  {...register("state1")}
                  placeholder="XX"
                  maxLength={2}
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.state1?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.state1?.message}
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="country1"
                  className="block text-sm mt-2 pl-2 font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country1"
                  {...register("country1")}
                  placeholder="Country"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.country1?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.country1?.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p></p>

        <div className="flex gap-10 items-center justify-between">
          <button
            className={`${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } ml-auto bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline duration-300`}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(processForm)}
          >
            {isSubmitting ? "Simulating..." : "Simulate"}
          </button>
        </div>

        {isSubmitSuccessful && (
          <div className={`text-right ${resultColor}`}>{result}</div>
        )}
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
  userName: z.string(),
  prodHeight: z.number().int().positive(),
  prodWidth: z.number().int().positive(),
  prodDepth: z.number().int().positive(),
  prodWeight: z.number().int().positive(),
  cep1: z.string().length(8, { message: "CEP deve conter apenas números (8)" }),
  country1: z.string().min(1, { message: "Country is required" }),
  state1: z.string().length(2, { message: "State must be 2 characters (UF)" }),
  city1: z.string().min(1, { message: "City is required" }),
  neighborhood1: z.string().min(1, { message: "Neighborhood is required" }),
  address1: z.string().min(1, { message: "Logradouro é obrigatório" }),
  number1: z.string().min(1, { message: "Número é obrigatório" }),
  cep2: z.string().length(8, { message: "CEP deve conter apenas números (8)" }),
  country2: z.string().min(1, { message: "Country is required" }),
  state2: z.string().length(2, { message: "State must be 2 characters (UF)" }),
  city2: z.string().min(1, { message: "City is required" }),
  neighborhood2: z.string().min(1, { message: "Neighborhood is required" }),
  address2: z.string().min(1, { message: "Logradouro é obrigatório" }),
  number2: z.string().min(1, { message: "Número é obrigatório" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [result, setResult] = useState<string>();
  const [resultColor, setResultColor] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "John Doe",
      prodHeight: 10,
      prodWidth: 10,
      prodDepth: 10,
      prodWeight: 10,
      cep1: "12345678",
      country1: "Brazil",
      state1: "RJ",
      city1: "Rio de Janeiro",
      neighborhood1: "Copacabana",
      address1: "Rua 1",
      number1: "123",
      cep2: "87654321",
      country2: "Brazil",
      state2: "SP",
      city2: "São Paulo",
      neighborhood2: "Jardins",
      address2: "Rua 2",
      number2: "456",
    },
  });
  const processForm = async (data: FormData) => {
    // @ts-ignore-next-line
    data["token"] = "";
    const config = {
      method: "get",
      url: process.env.NEXT_PUBLIC_API_URL + "/logistic-operator",
    };
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201) {
        setResult("data" + response.data);
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
      <div className="grid grid-cols-4 gap-4">
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
            {...register("prodHeight")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.prodHeight?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.prodHeight?.message}
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
            {...register("prodWidth")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.prodWidth?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.prodWidth?.message}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="depth"
            className="block text-sm font-medium text-gray-700"
          >
            Depth
          </label>
          <input
            type="number"
            id="depth"
            {...register("prodDepth")}
            placeholder="cm"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.prodDepth?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.prodDepth?.message}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight
          </label>
          <input
            type="number"
            id="weight"
            {...register("prodWeight")}
            placeholder="Kg"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.prodWeight?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.prodWeight?.message}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Endereço 1 */}
        <div>
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-gray-700"
          >
            Address To
          </label>
          <input
            type="text"
            id="cep1"
            {...register("cep1")}
            placeholder="CEP"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.cep1?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.cep1?.message}
            </div>
          )}
          <input
            type="text"
            id="address1"
            {...register("address1")}
            placeholder="Nome da Rua"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.address1?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.address1?.message}
            </div>
          )}
          <input
            type="text"
            id="number1"
            {...register("number1")}
            placeholder="Number"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.number1?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.number1?.message}
            </div>
          )}
          <input
            type="text"
            id="neighborhood1"
            {...register("neighborhood1")}
            placeholder="Neighborhood"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.neighborhood1?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.neighborhood1?.message}
            </div>
          )}
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
          <input
            type="text"
            id="state1"
            {...register("state1")}
            placeholder="State (Ex: RJ)"
            maxLength={2}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.state1?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.state1?.message}
            </div>
          )}
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

        {/* Endereço 2 */}
        <div>
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-gray-700"
          >
            Address To
          </label>
          <input
            type="text"
            id="cep2"
            {...register("cep2")}
            placeholder="CEP"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.cep2?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.cep2?.message}
            </div>
          )}
          <input
            type="text"
            id="address2"
            {...register("address2")}
            placeholder="Nome da Rua"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.address2?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.address2?.message}
            </div>
          )}
          <input
            type="text"
            id="number2"
            {...register("number2")}
            placeholder="Number"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.number2?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.number2?.message}
            </div>
          )}
          <input
            type="text"
            id="neighborhood2"
            {...register("neighborhood2")}
            placeholder="Neighborhood"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.neighborhood2?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.neighborhood2?.message}
            </div>
          )}
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
          <input
            type="text"
            id="state2"
            {...register("state2")}
            placeholder="State (Ex: RJ)"
            maxLength={2}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.state2?.message && (
            <div className="text-red-500 text-xs mt-1">
              {errors.state2?.message}
            </div>
          )}
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
        <div className="flex gap-10 items-center justify-between">
          <button
            className={`${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline duration-300`}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(processForm)}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          {isSubmitSuccessful && (
            <div className={`text-right ${resultColor}`}>{result}</div>
          )}
        </div>
      </div>
    </form>
  );
}

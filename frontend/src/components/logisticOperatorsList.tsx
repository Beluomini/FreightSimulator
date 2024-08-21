import React, { useEffect, useState } from "react";
import axios from "axios";

const mockedLogisticOperators = [
  { id: 1, name: "Logistic Operator 1" },
  { id: 2, name: "Logistic Operator 2" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
  { id: 3, name: "Logistic Operator 3" },
];

interface LogisticOperator {
  id: number;
  name: string;
}

export default function LOList() {
  const [data, setData] = useState<LogisticOperator[]>([]);
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
        setData(mockedLogisticOperators);
        setError(""); // Erro ao buscar dados de operadores logisticos
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col flex-grow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of Logistic Operators
      </h2>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
        {data.map((lo) => (
          <div key={lo.id} className="flex flex-col p-2">
            <h3>{lo.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

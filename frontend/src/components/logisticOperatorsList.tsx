import React, { useEffect, useState } from "react";
import axios from "axios";

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
          "http://localhost:5000/logistic-operator",
        );
        setData(response.data.data);
      } catch (error) {
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
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of Logistic Operators
      </h2>
      <ul className="space-y-4">
        {data.map((lo) => (
          <li key={lo.id}>
            <h3>{lo.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

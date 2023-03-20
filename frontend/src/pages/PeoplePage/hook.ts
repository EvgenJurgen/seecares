import { useCallback, useEffect, useState } from "react";
import { PEOPLE_URL } from "./constants";

interface Person {
  id: number;
  fullName: string;
  age: number;
  position: string;
}

export const useGetPeople = (
  page?: number,
  pageSize?: number,
  order?: "asc" | "desc" | "",
  age?: string,
  minAge?: number
) => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPeople = useCallback(() => {
    try {
      setIsLoading(true);
      const fetchData = async (query: URLSearchParams) => {
        const result = await fetch(`${PEOPLE_URL}?` + query);

        !result.ok && setError("Fetch Error");

        const data = await result.json();

        setPeople(data);
        setIsLoading(false);
      };

      const query = new URLSearchParams();

      page !== undefined && query.set("page", page.toString());
      pageSize !== undefined && query.set("pageSize", pageSize.toString());
      order && query.set("order", order);
      age && query.set("age", age);
      minAge !== undefined && query.set("minAge", minAge.toString());

      fetchData(query);
    } catch ({ message }) {
      setError((message as string) || "Error");
    }
  }, [page, pageSize, order, age, minAge]);

  useEffect(() => {
    fetchPeople();
  }, [page, pageSize, order, age, minAge]);

  return { people, isLoading, error, refresh: fetchPeople };
};

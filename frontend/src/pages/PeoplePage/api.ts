import { PEOPLE_URL } from "./constants";

export const deletePerson = (id: number) => {
  return fetch(`${PEOPLE_URL}/${id}`, { method: "DELETE" });
};

export const addPerson = (person: {
  fullName: string;
  age: number;
  position: string;
}) => {
  return fetch(PEOPLE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(person),
  });
};

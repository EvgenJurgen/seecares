import React, { useState } from "react";
import Dropdown from "../../components/dropdown";
import Modal from "../../components/modal";
import Search from "../../components/search";
import { addPerson, deletePerson } from "./api";
import { useGetPeople } from "./hook";
import styles from "./peoplePage.module.scss";

const SORTING = [
  { title: "ASC", value: "asc" },
  { title: "DESC", value: "desc" },
];

const PeoplePage = () => {
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<{
    title: string;
    value: "asc" | "desc" | "";
  }>({
    title: "",
    value: "",
  });

  const [search, setSearch] = useState("");

  const [isOnlyAdults, setIsOnlyAdults] = useState(false);

  const [isOpenAddModal, setIsOpenAddModat] = useState(false);

  const { people, isLoading, error, refresh } = useGetPeople(
    page,
    5,
    sorting.value,
    search,
    isOnlyAdults ? 18 : undefined
  );

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");

  const handleChangePage = (step: number) => {
    page + step >= 1 && setPage(page + step);
  };

  const handleSorting = (data: { title: string; value: "asc" | "desc" }) => {
    setSorting(data);
  };

  const handleDeletePerson = (id: number) => {
    deletePerson(id);
    refresh();
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModat(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModat(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseAddModal();

    addPerson({ fullName, age: +age, position }).then(() => refresh());
  };

  return (
    <>
      <div className={styles["container"]}>
        {isLoading ? (
          <p className={styles["message"]}>Loading...</p>
        ) : error ? (
          <p className={styles["message"]}>{error}</p>
        ) : (
          <div className={styles["main"]}>
            <div className={styles["actions-container"]}>
              <Dropdown
                itemsList={SORTING}
                selectedItem={sorting}
                selectItem={handleSorting}
              />
              <div>
                <input
                  type="checkbox"
                  id="adults_only"
                  name="adults_only"
                  checked={isOnlyAdults}
                  onChange={(event) => setIsOnlyAdults(event.target.checked)}
                />
                <label htmlFor="adults_only">Only Adults</label>
              </div>
              <Search
                placeholder="Search by age"
                searchValue={search}
                changeSearchValue={setSearch}
              />
              <button
                className={styles["add-button"]}
                onClick={handleOpenAddModal}
              >
                Add
              </button>
            </div>
            <ul className={styles["list"]}>
              {people?.map((person) => (
                <li className={styles["list-item"]} key={person.id}>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDeletePerson(person.id)}
                  >
                    Delete
                  </button>
                  <div className={styles["person-card"]}>
                    <p>{person.fullName}</p>
                    <p>age: {person.age}</p>
                    <p>{person.position}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles["pagination-container"]}>
              <button onClick={() => handleChangePage(-1)}>Prev</button>
              <p>{page}</p>
              <button onClick={() => handleChangePage(1)}>Next</button>
            </div>
          </div>
        )}
      </div>
      {isOpenAddModal && (
        <Modal closeModal={handleCloseAddModal}>
          <form onSubmit={handleSubmit} className={styles["add-form"]}>
            <input
              placeholder="Fullname"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <input
              placeholder="Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            <input
              placeholder="Position"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      )}
    </>
  );
};

export default PeoplePage;

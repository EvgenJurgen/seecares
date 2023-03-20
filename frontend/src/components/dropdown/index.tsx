import React, { FC, useState, useRef } from "react";
import { useClickOutside } from "../../utils";
import styles from "./dropdown.module.scss";
import { Item, Props } from "./dropdown.types";

const Dropdown: FC<Props> = ({ itemsList, selectedItem, selectItem }) => {
  const ref = useRef(null);
  const [isDropdownVisiable, setIsDropdownVisiable] = useState(false);

  const handleSelectItem = (item: Item) => {
    setIsDropdownVisiable(false);
    selectItem(item);
  };

  useClickOutside(ref, () => setIsDropdownVisiable(false));

  return (
    <div className={styles["custom-dropdown"]} ref={ref}>
      <div
        className={styles["custom-dropdown-selection"]}
        onClick={() => setIsDropdownVisiable(!isDropdownVisiable)}
      >
        {selectedItem.title ? selectedItem.title : "Please select an item..."}
      </div>
      {isDropdownVisiable && itemsList && (
        <div className={styles["items-holder"]}>
          {itemsList.map((item) => (
            <div
              key={item.value}
              className={styles["dropdown-item"]}
              onClick={() => handleSelectItem(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

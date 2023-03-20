import React, { FC } from "react";
import styles from "./modal.module.scss";

interface Props {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ closeModal, children }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["modal"]}>
        <div className={styles["header"]} onClick={closeModal}>
          x
        </div>
        <div className={styles["children"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

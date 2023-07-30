import { MouseEvent, useState } from "react";
import styles from "./DeleteButton.module.scss";
import { IUser } from "../../../../interfaces/IUser";
import { DeleteUserModal } from "../../../Modal/DeleteUserModal";

export interface IDeleteButtonProps {
  user: IUser;
  onDelete: (user: IUser) => void;
}

export function DeleteButton({ user, onDelete }: IDeleteButtonProps) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsDeleteModalOpened(true);
  };

  const closeHandleClick = () => {
    setIsDeleteModalOpened(false);
  };

  return (
    <>
      <button
        className={styles.btn}
        onClick={openHandleClick}
        aria-label="Удалить"
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
          </svg>
        </span>
      </button>
      {isDeleteModalOpened && (
        <DeleteUserModal
          user={user}
          onDelete={onDelete}
          onClose={closeHandleClick}
        />
      )}
    </>
  );
}

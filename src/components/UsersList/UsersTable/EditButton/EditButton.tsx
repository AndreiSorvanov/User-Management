import { MouseEvent, useState } from "react";
import { CreateUserModal } from "../../../Modal/CreateUserModal";
import styles from "./EditButton.module.scss";
import { IUser } from "../../../../interfaces/IUser";

export interface IEditButtonProps {
  user: IUser;
  onSave: (user: IUser) => void;
}

export function EditButton({ user, onSave }: IEditButtonProps) {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditModalOpened(true);
  };

  const closeHandleClick = () => {
    setIsEditModalOpened(false);
  };

  return (
    <>
      <button
        className={styles.btn}
        onClick={openHandleClick}
        aria-label="Редактировать"
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" />
          </svg>
        </span>
      </button>
      {isEditModalOpened && (
        <CreateUserModal
          isEdit={true}
          user={user}
          onEditUser={onSave}
          onClose={closeHandleClick}
        />
      )}
    </>
  );
}

import styles from "./CreateButton.module.scss";
import { MouseEvent, useState } from "react";
import { CreateUserModal } from "../../Modal/CreateUserModal";
import { IUser } from "../../../interfaces/IUser";

export interface ICreateButtonProps {
  onSave: (user: Omit<IUser, "id">) => void;
}

export function CreateButton({ onSave }: ICreateButtonProps) {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsCreateModalOpened(true);
  };

  const closeHandleClick = () => {
    setIsCreateModalOpened(false);
  };

  return (
    <>
      <button className={styles.btn} onClick={openHandleClick}>
        Добавить пользователя
      </button>
      {isCreateModalOpened && (
        <CreateUserModal
          isEdit={false}
          onCreateUser={onSave}
          onClose={closeHandleClick}
        />
      )}
    </>
  );
}

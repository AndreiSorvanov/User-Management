import styles from "./DeleteUserModal.module.scss";
import { FormEvent, MouseEvent } from "react";
import { Modal } from "..";
import { IUser } from "../../../interfaces/IUser";

interface IDeleteUserModal {
  user: IUser;
  onDelete: (user: IUser) => void;
  onClose: () => void;
}

export function DeleteUserModal({ user, onDelete, onClose }: IDeleteUserModal) {
  const confirmHandleClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onDelete(user);
    onClose();
  };

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  };

  return (
    <Modal>
      <h2 className={styles.userModalHeading}>Удалить пользователя?</h2>

      <form className={styles.form} onSubmit={confirmHandleClick}>
        <div className={styles.btnGroup}>
          <button type="submit" className={styles.confirmBtn}>
            Удалить
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={cancelHandleClick}
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
}

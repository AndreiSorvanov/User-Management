import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateUserModal.module.scss";
import { MouseEvent } from "react";
import { Input } from "../../common/Input";
import validator from "validator";
import { Modal } from "..";
import { IUser } from "../../../interfaces/IUser";

interface ICreateUserModal {
  isEdit: boolean;
  user?: IUser;
  onClose: () => void;
  onCreateUser?: (user: Omit<IUser, "id">) => void;
  onEditUser?: (user: IUser) => void;
}

export function CreateUserModal({
  isEdit = false,
  user,
  onClose,
  onCreateUser = (user: Omit<IUser, "id">) => {},
  onEditUser = (user: IUser) => {},
}: ICreateUserModal) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [name, setName] = useState<string>(user?.name ?? "");
  const [nameError, setNameError] = useState<string>("");
  function validateName() {
    if (name.length === 0) return "Поле является обязательным";

    return "";
  }

  const [surname, setSurname] = useState<string>(user?.surname ?? "");
  const [surnameError, setSurnameError] = useState<string>("");
  function validateSurname() {
    if (surname.length === 0) return "Поле является обязательным";

    return "";
  }

  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [emailError, setEmailError] = useState<string>("");
  function validateEmail() {
    if (email.length === 0) return "Поле является обязательным";
    if (!validator.isEmail(email)) return "Email имеет неверный формат";

    return "";
  }

  function validate() {
    const validName = validateName();
    const validSurname = validateSurname();
    const validEmail = validateEmail();

    setNameError(validName);
    setSurnameError(validSurname);
    setEmailError(validEmail);

    return !validName && !validSurname && !validEmail;
  }

  const nameHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const surnameHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.currentTarget.value);
  };

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const saveHandleClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTouched(true);

    setNameError("");
    setSurnameError("");
    setEmailError("");
    setError("");

    if (validate()) {
      if (!isEdit) {
        onCreateUser({
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
        });
      } else {
        onEditUser({
          id: user?.id!,
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
        });
      }

      onClose();
    }
  };

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  };

  return (
    <Modal>
      <h2 className={styles.userModalHeading}>
        {isEdit ? "Редактировать пользователя" : "Добавить пользователя"}
      </h2>

      <form className={styles.form} onSubmit={saveHandleClick}>
        <Input
          id="nameInputId"
          type="text"
          label="Имя *"
          value={name}
          onChange={nameHandleChange}
          error={nameError}
          isRequired={true}
          isTouched={isTouched}
        />
        <Input
          id="surnameInputId"
          type="text"
          label="Фамилия *"
          value={surname}
          onChange={surnameHandleChange}
          error={surnameError}
          isRequired={true}
          isTouched={isTouched}
        />
        <Input
          id="emailInputId"
          type="text"
          label="E-mail *"
          value={email}
          onChange={emailHandleChange}
          error={emailError}
          isRequired={true}
          isTouched={isTouched}
        />

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.saveBtn}>
            Сохранить
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={cancelHandleClick}
          >
            Отмена
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Modal>
  );
}

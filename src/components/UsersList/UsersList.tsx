import styles from "./UsersList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IState, addUserAction } from "../../store";
import { IUser } from "../../interfaces/IUser";
import { Title } from "./Title";
import { CreateButton } from "./CreateButton";
import { UsersTable } from "./UsersTable";

export function UsersList() {
  const dispatch = useDispatch();

  const onCreateUser = (user: Omit<IUser, "id">) => {
    dispatch(addUserAction(user));
  };

  const usersList = useSelector<IState, Array<IUser>>(
    (state) => state.usersList
  );

  return (
    <>
      <div className={styles.header}>
        <Title title={"Список пользователей"} />
        <CreateButton onSave={onCreateUser} />
      </div>
      <UsersTable usersList={usersList}></UsersTable>
    </>
  );
}

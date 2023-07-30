import styles from "./UsersTable.module.scss";
import { IUser } from "../../../interfaces/IUser";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { useDispatch } from "react-redux";
import { deleteUserAction, editUserAction } from "../../../store";

export interface IUsersTableProps {
  usersList: Array<IUser>;
}

export function UsersTable({ usersList }: IUsersTableProps) {
  const dispatch = useDispatch();

  const onEditUser = (user: IUser) => {
    dispatch(editUserAction(user));
  };

  const onDeleteUser = (user: IUser) => {
    dispatch(deleteUserAction(user));
  };

  return (
    <>
      {usersList.length !== 0 ? (
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={`styles.row styles.headRow`}>
              <th
                className={[
                  styles.cell,
                  styles.headCell,
                  styles.numberCell,
                ].join(" ")}
              >
                №
              </th>
              <th
                className={[styles.cell, styles.headCell, styles.nameCell].join(
                  " "
                )}
              >
                Имя
              </th>
              <th
                className={[
                  styles.cell,
                  styles.headCell,
                  styles.surnameCell,
                ].join(" ")}
              >
                Фамилия
              </th>
              <th
                className={[
                  styles.cell,
                  styles.headCell,
                  styles.emailCell,
                ].join(" ")}
              >
                Email
              </th>
              <th
                className={[
                  styles.cell,
                  styles.headCell,
                  styles.buttonsCell,
                ].join(" ")}
              ></th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr className={`styles.row styles.bodyRow`} key={user.id}>
                <td className={[styles.cell, styles.numberCell].join(" ")}>
                  {index + 1}
                </td>
                <td
                  className={[styles.cell, styles.nameCell].join(" ")}
                  data-title={user.name}
                  tabIndex={0}
                >
                  <div className={styles.cellContent}>{user.name}</div>
                </td>
                <td
                  className={[styles.cell, styles.surnameCell].join(" ")}
                  data-title={user.surname}
                  tabIndex={0}
                >
                  <div className={styles.cellContent}>{user.surname}</div>
                </td>
                <td
                  className={[styles.cell, styles.emailCell].join(" ")}
                  data-title={user.email}
                  tabIndex={0}
                >
                  <div className={styles.cellContent}> {user.email}</div>
                </td>
                <td className={[styles.cell, styles.buttonsCell].join(" ")}>
                  <EditButton user={user} onSave={onEditUser} />
                  <DeleteButton user={user} onDelete={onDeleteUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.empty}>Нет пользователей</div>
      )}
    </>
  );
}

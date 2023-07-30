import { Reducer } from "@reduxjs/toolkit";
import { ActionCreator, AnyAction } from "redux";
import { IUser } from "./interfaces/IUser";

const ADD_USER = "ADD_USER";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";

export interface IState {
  usersList: Array<IUser>;
}

const storageUsersList = localStorage.getItem("usersList");

const initialState: IState = {
  usersList: storageUsersList
    ? JSON.parse(storageUsersList, (key, value) =>
        key === "id" ? Number(value) : value
      )
    : [],
};

export const addUserAction: ActionCreator<AnyAction> = (
  user: Omit<IUser, "id">
) => {
  return { type: ADD_USER, user };
};

export const editUserAction: ActionCreator<AnyAction> = (user: IUser) => {
  return { type: EDIT_USER, user };
};

export const deleteUserAction: ActionCreator<AnyAction> = (user: IUser) => {
  return { type: DELETE_USER, user };
};

export const rootReducer: Reducer<IState> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      const id = (state.usersList.at(-1)?.id ?? 0) + 1;
      const newState = {
        ...state,
        usersList: [...state.usersList, { ...action.user, id }],
      };

      localStorage.setItem("usersList", JSON.stringify(newState.usersList));

      return newState;
    }

    case EDIT_USER: {
      const index = state.usersList.findIndex(
        (user) => user.id === action.user.id
      );
      const newUsersList = [...state.usersList];

      if (index !== -1) {
        newUsersList[index] = action.user;
      }

      const newState = {
        ...state,
        usersList: newUsersList,
      };

      localStorage.setItem("usersList", JSON.stringify(newState.usersList));

      return newState;
    }

    case DELETE_USER: {
      const newUsersList = state.usersList.filter(
        (user) => user.id !== action.user.id
      );

      const newState = {
        ...state,
        usersList: newUsersList,
      };

      localStorage.setItem("usersList", JSON.stringify(newState.usersList));

      return newState;
    }

    default:
      return state;
  }
};

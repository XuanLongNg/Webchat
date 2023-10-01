import { infoBoxChat } from "../../../types/firebase";
import { Action } from "redux";

export const ADD_BOX = "ADD_BOX";
export const DELETE_BOX = "DELETE_BOX";

// Define action interfaces
export interface ADD extends Action<typeof ADD_BOX> {
  type: typeof ADD_BOX;
  payload: infoBoxChat;
}
export interface DELETE extends Action<typeof DELETE_BOX> {
  type: typeof DELETE_BOX;
  payload: string;
}

export type BoxesActionTypes = ADD | DELETE;

// Define action creators
export const addBox = (boxData: infoBoxChat): ADD => ({
  type: "ADD_BOX" as const,
  payload: boxData,
});

export const deleteBox = (boxId: string): DELETE => ({
  type: "DELETE_BOX" as const,
  payload: boxId,
});

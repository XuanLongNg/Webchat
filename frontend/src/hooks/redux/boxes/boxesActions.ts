import { MessageData, infoBoxChat } from "../../../types/firebase";
import { Action } from "redux";

export const ADD_BOX = "ADD_BOX";
export const DELETE_BOX = "DELETE_BOX";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
// Define action interfaces
export interface TADD_BOX extends Action<typeof ADD_BOX> {
  type: typeof ADD_BOX;
  payload: infoBoxChat;
}
export interface TDELETE_BOX extends Action<typeof DELETE_BOX> {
  type: typeof DELETE_BOX;
  payload: string;
}

export interface TADD_MESSAGE extends Action<typeof ADD_MESSAGE> {
  type: typeof ADD_MESSAGE;
  payload: MessageData;
  key?: infoBoxChat;
}
export interface TDELETE_MESSAGE extends Action<typeof DELETE_MESSAGE> {
  type: typeof DELETE_MESSAGE;
  payload: string;
  key: infoBoxChat;
}
export type BoxesActionTypes =
  | TADD_BOX
  | TDELETE_BOX
  | TADD_MESSAGE
  | TDELETE_MESSAGE;

// Define action creators
export const addBox = (boxData: infoBoxChat): TADD_BOX => ({
  type: "ADD_BOX" as const,
  payload: boxData,
});

export const deleteBox = (boxId: string): TDELETE_BOX => ({
  type: "DELETE_BOX" as const,
  payload: boxId,
});

export const addMessage = (
  messageData: MessageData,
  box?: infoBoxChat
): TADD_MESSAGE => ({
  type: "ADD_MESSAGE" as const,
  payload: messageData,
  key: box,
});

export const deleteMessage = (
  messageId: string,
  box: infoBoxChat
): TDELETE_MESSAGE => ({
  type: "DELETE_MESSAGE" as const,
  payload: messageId,
  key: box,
});

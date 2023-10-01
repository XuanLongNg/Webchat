import { MessageData, message } from "../../../types/firebase";
import { Action } from "redux";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

// Define action interfaces
export interface ADD extends Action<typeof ADD_MESSAGE> {
  type: typeof ADD_MESSAGE;
  payload: MessageData;
}
export interface DELETE extends Action<typeof DELETE_MESSAGE> {
  type: typeof DELETE_MESSAGE;
  payload: string;
}

export type MessagesActionTypes = ADD | DELETE;

// Define action creators
export const addMessage = (messageData: MessageData): ADD => ({
  type: "ADD_MESSAGE" as const,
  payload: messageData,
});

export const deleteMessage = (messageId: string): DELETE => ({
  type: "DELETE_MESSAGE" as const,
  payload: messageId,
});

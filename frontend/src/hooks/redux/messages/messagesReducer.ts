import { MessageData, message } from "../../../types/firebase";
import {
  MessagesActionTypes,
  ADD_MESSAGE,
  DELETE_MESSAGE,
} from "./messagesActions";
import { Reducer, AnyAction } from "redux";
export interface MessagesState {
  messages: MessageData[];
}

const initialState = {
  messages: [],
};

const messagesReducer: Reducer<MessagesState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (
        state.messages.find(
          (e) => Object.keys(e)[0] == Object.keys(action.payload)[0]
        )
      )
        return {
          ...state,
        };
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message: MessageData) => Object.keys(message)[0] !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default messagesReducer;

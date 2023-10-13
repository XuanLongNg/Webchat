import { MessageData, infoBoxChat, message } from "../../../types/firebase";
import {
  BoxesActionTypes,
  ADD_BOX,
  DELETE_BOX,
  ADD_MESSAGE,
  DELETE_MESSAGE,
} from "./boxesActions";
import { Reducer, AnyAction } from "redux";
export interface BoxesState {
  boxes: {
    info: infoBoxChat;
    messages: MessageData[];
  }[];
}
const initialState = {
  boxes: [],
};

const boxesReducer: Reducer<BoxesState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_BOX:
      if (state.boxes.find((e) => e.info.id == action.payload.id))
        return {
          ...state,
        };
      return {
        ...state,
        boxes: [...state.boxes, { info: action.payload, messages: [] }],
      };
    case DELETE_BOX:
      return {
        ...state,
        boxes: state.boxes.filter((e) => e.info.id !== action.payload),
      };
    case ADD_MESSAGE:
      const boxId = action.key.id;
      const messageData = action.payload;
      const updatedBoxes = state.boxes.map((box) => {
        if (box.info.id === boxId) {
          // If the box matches the boxId, add the new message
          if (
            box.messages.find(
              (e) => Object.keys(e)[0] == Object.keys(messageData)[0]
            )
          )
            return box;
          return {
            ...box,
            messages: [...box.messages, messageData],
          };
        }
        return box;
      });

      return {
        ...state,
        boxes: updatedBoxes,
      };

    // case DELETE_MESSAGE:
    //   box = state.boxes.find((e) => e.info.id === action.key.id);

    //   return {
    //     ...state,
    //     boxes: [
    //       ...state.boxes.filter((e) => e.info.id == action.payload.id),
    //       {
    //         info: action.key,
    //         messages: box
    //           ? box.messages.filter(
    //               (message: MessageData) =>
    //                 Object.keys(message)[0] !== action.payload
    //             )
    //           : [],
    //       },
    //     ],
    //   };
    default:
      return state;
  }
};

export default boxesReducer;

import { MessageData, infoBoxChat, message } from "../../../types/firebase";
import { BoxesActionTypes, ADD_BOX, DELETE_BOX } from "./boxesActions";
import { Reducer, AnyAction } from "redux";
export interface BoxesState {
  boxes: {
    info: infoBoxChat[];
    message: MessageData[];
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
      if (state.boxes.find((e) => e. == action.payload.id))
        return {
          ...state,
        };
      return {
        ...state,
        boxes: [...state.boxes, action.payload],
      };
    case DELETE_BOX:
      return {
        ...state,
        boxes: state.boxes.filter(
          (box: infoBoxChat) => box.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default boxesReducer;

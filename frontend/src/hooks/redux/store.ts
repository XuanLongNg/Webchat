// store.ts
import boxesReducer from "./boxes/boxesReducer";
import messagesReducer from "./messages/messagesReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    boxes: boxesReducer,
    messages: messagesReducer,
    // as Reducer<BoxesState, BoxesActionTypes>,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

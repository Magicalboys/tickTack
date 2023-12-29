import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./features/counterSlice";

const store = configureStore({
  reducer: {
    tickTack: counterSlice,
  },
});

export default store;

//导出推导
export type CounterSliceType = ReturnType<typeof store.getState>;

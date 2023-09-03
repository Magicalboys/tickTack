import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./features/counterSlice";
// import recommendSlice from "./features/recommendSlice";

const store = configureStore({
  reducer: {
    tickTack: counterSlice,
    // recommend: recommendSlice,
  },
});

export default store;

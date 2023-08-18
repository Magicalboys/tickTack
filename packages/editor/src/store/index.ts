import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./features/counterSlice";
// import recommendSlice from "./features/recommendSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    // recommend: recommendSlice,
  },
});

export default store;

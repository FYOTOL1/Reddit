import dataSlice from "./reducer/dataSlice";
const { configureStore } = require("@reduxjs/toolkit");
const { default: profileSlice } = require("./reducer/profileSlice");

const store = configureStore({
  reducer: {
    listSlice: profileSlice,
    data: dataSlice,
  },
});

export default store;

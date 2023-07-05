const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    boolList: false,
    boolComm: false,
  },
  reducers: {
    changeBool: (state, { payload }) => {
      state.boolList = !state.boolList;
    },
    closeList: (state, action) => {
      state.boolList = false;
    },
    changeComm: (state, { payload }) => {
      state.boolComm = payload;
    },
  },
});

export const { changeBool, closeList, changeComm } = profileSlice.actions;

export default profileSlice.reducer;

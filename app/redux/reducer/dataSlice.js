import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "dataSlice/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "https://egy-temble.github.io/Reddit/api/userData/userData"
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error + "Error");
      return rejectWithValue(error.message);
    }
  }
);

export const getUserFeeds = createAsyncThunk(
  "getUserFeeds/ dataSlice",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getFeeds = await axios.get(
        "https://egy-temble.github.io/Reddit/api/feedData/feedData"
      );
      const res = await getFeeds.data;
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCommunity = createAsyncThunk(
  "dataSlice/getCommunity",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getComm = await axios.get(
        "https://egy-temble.github.io/Reddit/api/communityData/communityData"
      );
      const data = await getComm.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postUser = createAsyncThunk(
  "dataSlice/postUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "https://egy-temble.github.io/Reddit/api/userData/userData",
        { ...data }
      );
      return res;
    } catch (error) {
      console.log(error + "Error");
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    data: [],
    userFeeds: [],
    allCommunity: [],
    id: null,
    action: false,
    loading: false,
    error: null,
    checkOfHeader: false,
  },

  reducers: {
    changeUserLogin: (state, { payload }) => {
      state.checkOfHeader = payload;
    },
    changeAction: (state, { payload }) => {
      state.action === true ? (state.action = false) : (state.action = true);
      window.localStorage.setItem(`${payload}`, state.action);
    },
  },

  extraReducers: {
    [getUsers.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    //
    [postUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [postUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      window.localStorage.setItem("userId", payload.data.postData._id);
      state.id = window.localStorage.getItem("userId");
    },
    [postUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    //
    [getUserFeeds.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUserFeeds.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userFeeds = payload;
    },
    [getUserFeeds.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    //
    [getCommunity.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getCommunity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allCommunity = payload;
    },
    [getCommunity.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { postData, changeUserLogin, changeAction } = dataSlice.actions;

export default dataSlice.reducer;

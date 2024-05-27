import { createSlice } from "@reduxjs/toolkit";

const loaderReducer = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoader } = loaderReducer.actions;

export default loaderReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const mobileViewReducer = createSlice({
  name: "mobileView",
  initialState: {
    isFixture: true,
    isMarkets: false,
    isBetSlip: false,
  },
  reducers: {
    showMarkets: (state, action) => {
      state.isMarkets = !state.isMarkets;
    },
    showBetSlip: (state, action) => {
      state.isBetSlip = !state.isBetSlip;
    },
    showFixtures: (state, action) => {
      state.isFixture = !state.isFixture;
    },
  },
});

export const { showBetSlip, showFixtures, showMarkets } =
  mobileViewReducer.actions;

export default mobileViewReducer.reducer;

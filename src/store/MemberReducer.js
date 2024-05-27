import { createSlice } from "@reduxjs/toolkit";

const userInfoReducer = createSlice({
  name: "userInfos",
  initialState: {
    userInfo: {},
    betList: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserMoney: (state, action) => {
      state.userInfo.balance = action.payload;
    },
    setUserlanguage: (state, action) => {
      state.userInfo.language = action.payload;
    },
    setBetList: (state, action) => {
      state.betList = action.payload;
    },
    deleteBetlist: (state, action) => {
      const BetID = action.payload;
      const delBetData = state.betList.data.filter((item) => {
        return item.BetID !== BetID;
      });
      state.betList.data = delBetData;
    },
    setBetListRefreash: (state, action) => {
      state.betListRefreash = !state.betListRefreash;
    },
  },
});

export const {
  setUserInfo,
  setUserMoney,
  setUserlanguage,
  setBetList,
  setBonusFolder,
  deleteBetlist,
  setBetListRefreash,
} = userInfoReducer.actions;

export default userInfoReducer.reducer;

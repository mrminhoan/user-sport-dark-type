import { createSlice } from "@reduxjs/toolkit";

const webStateReducer = createSlice({
  name: "webState",
  initialState: {
    sportList: [],
    pageView: { page: 0, type: "loding" }, // 0: Loading page, 1: main page, 2: error page
    progress: 0,
    isOpenModalLive: false,
    sportIdLive: null,
    idFixtureLive: -1,
    sportSelected: 0,
    tabSelected: {},
    currentLang: localStorage.getItem("lang") || "ko"
  },
  reducers: {
    setSportList: (state, action) => {
      state.sportList = action.payload;
    },
    setPageView: (state, action) => {
      state.pageView = action.payload;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    setOpenLive: (state, action) => {
      state.isOpenModalLive = true;
      state.sportIdLive = action?.sportId;
      state.idFixtureLive = action?.fixtureId;
    },
    setCloseLive: (state, action) => {
      state.isOpenModalLive = false;
      state.sportIdLive = null;
      state.idFixtureLive = -1;
    },
    setSportSelected: (state, action) => {
      state.sportSelected = action.payload;
    },
    setTabSelected: (state, action) => {
      state.tabSelected = action.payload;
    },
    setCurrentLang: (state, action) => {
      state.currentLang = action.payload
    }
  },
});

export const {
  setSportList,
  setPageView,
  setProgress,
  setOpenLive,
  setCloseLive,
  setSportSelected,
  setTabSelected,
  setCurrentLang
} = webStateReducer.actions;

export default webStateReducer.reducer;

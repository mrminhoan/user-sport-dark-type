import data_fixture, {
  data_price_change,
} from "@/new_modules/fixture/mock_data";
import { FixturesMockData } from "@/lib/mockData";
import { createSlice } from "@reduxjs/toolkit";
import { STATUS_BETTING, STATUS_FETCHING_DATA } from "@/lib/constants";

const marketReducer = createSlice({
  name: "markets",
  initialState: {
    fixtureId: null,
    markets: [],
    leagueName: "",
    location: "",
    sportId: "",
    bonusFolder: [],
    sportsList: [],
    fixtures: [],
    priceChanges: [],
    exchangeFixtures: [],
    currentAmountFixtures: 0,
    isFetchingFixture: false,
    isBetting: false,
    fixtureKoData: [],
    fixtureSelected: {},
  },
  reducers: {
    setMarkets: (state, action) => {
      state.markets = action.payload;
    },
    setFixtureId: (state, action) => {
      state.fixtureId = action.payload;
    },
    setLeagueName: (state, action) => {
      state.leagueName = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setSportId: (state, action) => {
      state.sportId = action.payload;
    },
    setBonusFolder: (state, action) => {
      state.bonusFolder = action.payload;
    },
    setSportsList: (state, action) => {
      state.sportsList = action.payload;
    },
    setFixturesList: (state, action) => {
      state.fixtures = action.payload;
      state.currentAmountFixtures;
    },
    setPriceChange: (state, action) => {
      state.priceChanges = action.payload;
    },
    setExchangeFixtures: (state, action) => {
      const cloneState = [...state.exchangeFixtures];
      const listWithMarket = cloneState.filter((c) => c.Markets !== null);
      if (action.payload[0].Markets === null) return;
      state.exchangeFixtures = [...listWithMarket, ...action.payload];
    },
    setExchangeFixturesAll: (state, action) => {
      const listWithMarket = action.payload.filter((c) => c.Markets !== null);
      state.exchangeFixtures = listWithMarket;
    },
    setCurrentAmountFixtures: (state, action) => {
      state.currentAmountFixtures += 10;
    },
    setStatusFetchingFixtures: (state, action) => {
      switch (action?.payload) {
        case STATUS_FETCHING_DATA.LOADING:
          state.isFetchingFixture = true;
          break;
        case STATUS_FETCHING_DATA.SUCCESS:
          state.isFetchingFixture = false;
          break;
        case STATUS_FETCHING_DATA.FAILED:
          state.isFetchingFixture = false;
          break;
        default:
          break;
      }
    },
    setFixtureKoData: (state, action) => {
      state.fixtureKoData = [...state.fixtureKoData, ...action.payload];
    },

    removeItemFixtureKoData: (state, action) => {
      const { fixtureId } = action.payload;
      const fixtureIdx = state.fixtureKoData.findIndex(
        (f) => f.FixtureId === fixtureId
      );
      const cloneFixtureKoData = [...state.fixtureKoData];
      cloneFixtureKoData.splice(fixtureIdx, 1);
      state.fixtureKoData = cloneFixtureKoData;
    },

    setBetFixture: (state, action) => {
      const { fixtureId, marketId, betId, bet } = action.payload;
      const cloneFixtures = [...state.fixtures.data.documents];
      const fixtureIdx = cloneFixtures.findIndex(
        (c) => c.value.FixtureId === Number(fixtureId)
      );

      if (fixtureIdx < 0) return;
      const fixtureItem = cloneFixtures[fixtureIdx].value.Markets;
      const marketIdx = fixtureItem.findIndex((m) => m.Id === marketId);

      if (marketIdx < 0) return;
      const marketItem = fixtureItem[marketIdx];
      const betIdx = marketItem.Bets.findIndex((b) => b.Id === betId);

      if (betIdx < 0) {
        cloneFixtures[fixtureIdx].value.Markets[marketIdx].Bets[
          marketItem.Bets.length
        ] = bet;
        state.fixtures.data.documents = cloneFixtures;
        return;
      }

      cloneFixtures[fixtureIdx].value.Markets[marketIdx].Bets[betIdx] = bet;
      state.fixtures.data.documents = cloneFixtures;
    },
    deleteItemExchangeFixtures: (state, action) => {
      const fixtureId = action.payload;
      const cloneExchange = [...state.exchangeFixtures];
      const fixtureIdx = cloneExchange.findIndex(
        (i) => i.FixtureId === fixtureId
      );
      if (fixtureIdx < 0) return;
      cloneExchange.splice(fixtureIdx, 1);
      state.exchangeFixtures = cloneExchange;
    },
    updatedFixtureItem: (state, action) => {
      const { fixtureId, fixture } = action.payload;
      if (!state.fixtures?.data) return;

      const fixtureIdx = state.fixtures.data?.documents.findIndex(
        (f) => f.value.FixtureId === fixtureId
      );
      if (fixtureIdx < 0) return;
      const item = state.fixtures.data.documents[fixtureIdx];

      state.fixtures.data.documents[fixtureIdx] = {
        ...item,
        value: { ...item.value, Fixture: fixture.Fixture },
      };

      // const cloneFixtureKoData = [...state.fixtureKoData];
      // cloneFixtureKoData.splice(fixtureIdx, 1);
      // state.fixtureKoData = cloneFixtureKoData;
    },
    setFixtureSelected: (state, action) => {
      state.fixtureSelected = action.payload;
    },

    setStatusBetting: (state, action) => {
      switch (action?.payload) {
        case STATUS_BETTING.LOADING:
          state.isBetting = true;
          break;
        case STATUS_BETTING.SUCCESS:
          state.isBetting = false;
          break;
        case STATUS_BETTING.FAILED:
          state.isBetting = false;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  setMarkets,
  setFixtureId,
  setLeagueName,
  setLocation,
  setSportId,
  setBonusFolder,
  setBetFixture,
  setSportsList,
  setFixturesList,
  setPriceChange,
  setExchangeFixtures,
  setCurrentAmountFixtures,
  setStatusFetchingFixtures,
  deleteItemExchangeFixtures,
  setExchangeFixturesAll,
  setFixtureKoData,
  updatedFixtureItem,
  setFixtureSelected,
  removeItemFixtureKoData,
  setStatusBetting
} = marketReducer.actions;

export default marketReducer.reducer;

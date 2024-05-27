import data_slips from "@/lib/mock_data";
import { createSlice } from "@reduxjs/toolkit";
import _, { isEmpty } from "lodash";

const betSlipV2Reducer = createSlice({
  name: "betSlipV2",
  initialState: {
    slips: [],
    totalPrice: 0,
    bonusInfo: {
      BonusFolder: 1,
      BonusRate: 1,
      BonusMinRate: 1,
    },
    isLoading: false,
  },
  reducers: {
    addBet: (state, action) => {
      const { fixture, market, bet } = action.payload;
      const newItem = { fixture, market, bet };
      const cloneBetSlip = [...state.slips];
      let resetBetSlip = {};
      resetBetSlip["FixtureId"] = fixture.FixtureId;
      resetBetSlip["gameInfo"] = {};
      resetBetSlip["gameInfo"]["Fixture"] = {};
      resetBetSlip["gameInfo"]["Fixture"]["SportId"] = fixture.Fixture.Sport.Id;
      resetBetSlip["gameInfo"]["Fixture"]["LocationId"] =
        fixture.Fixture.Location.Id;
      resetBetSlip["gameInfo"]["Fixture"]["LeagueId"] =
        fixture.Fixture.League.Id;
      resetBetSlip["gameInfo"]["Fixture"]["Participants"] =
        fixture.Fixture.Participants;
      resetBetSlip["gameInfo"]["Fixture"]["StartDate"] =
        fixture.Fixture.StartDate;
      resetBetSlip["gameInfo"]["Markets"] = {};
      const selBet = bet;
      const selMarket = market;
      let selBets = [];

      if (selBet?.BaseLine) {
        selBets = selMarket?.Bets?.filter(
          (bet) => bet?.BaseLine == selBet.BaseLine
        );
      } else {
        selBets = selMarket.Bets;
      }

      resetBetSlip["gameInfo"]["Markets"]["Id"] = selMarket.Id;
      resetBetSlip["gameInfo"]["Markets"]["Name"] = selMarket.Name;
      resetBetSlip["gameInfo"]["Markets"]["MainLine"] = selMarket.MainLine;
      resetBetSlip["gameInfo"]["Markets"]["Bet"] = selBets;
      resetBetSlip["gameInfo"]["Markets"]["BaseLine"] = selBet.BaseLine;
      resetBetSlip["selectBetId"] = bet.Id;
      newItem["resetSelBet"] = resetBetSlip;

      if (cloneBetSlip.length === 0) return { ...state, slips: [newItem] };

      const item = cloneBetSlip.findIndex(
        (c) =>
          c?.fixture?.FixtureId === newItem?.fixture?.FixtureId &&
          c?.market.Id === newItem?.market.Id
      );

      if (item < 0) {
        state.slips = [...state.slips, newItem];
        return;
      }
      cloneBetSlip[item] = newItem;

      return { ...state, slips: cloneBetSlip };
    },

    deleteBet: (state, action) => {
      const BetId = action.payload;

      state.slips = state.slips.filter((item) => {
        return item.bet.Id !== BetId;
      });
    },

    clearAllBet: (state, action) => {
      let cloneBetSlip = [...state.slips];
      cloneBetSlip = [];
      state.slips = cloneBetSlip;
      return;
    },

    addTotalPrice: (state, action) => {
      return { ...state, totalPrice: Number(action.payload) };
    },

    setBonusInfo: (state, action) => {
      return { ...state, bonusInfo: action.payload };
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    updateBetSlip: (state, action) => {
      const { fixtureId, fixture } = action.payload;
      const newSlips = _.keys(
        _.pickBy(state.slips, {
          fixture: {
            FixtureId: fixtureId,
          },
        })
      );

      if (!newSlips || isEmpty(newSlips)) return;
      newSlips.forEach((slipIdx) => {
        state.slips[slipIdx].fixture.Fixture = {
          FixtureId: fixture.FixtureId,
          ...fixture.Fixture,
        };
      });
    },
  },
});

export const {
  addBet,
  deleteBet,
  clearAllBet,
  addTotalPrice,
  setBonusInfo,
  setLoading,
  updateBetSlip,
} = betSlipV2Reducer.actions;

export default betSlipV2Reducer.reducer;

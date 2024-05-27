import { createSlice } from "@reduxjs/toolkit";

const betSlipReducer = createSlice({
  name: "betSlip",
  initialState: {
    slips: [1],
    bets: {},
    currentSlip: 1,
    oddsInfo: {
      rate: 0,
      bonusInfo: {
        BonusFolder: 1, 
        BonusRate: 1, 
        BonusMinRate : 1 
      }
    },
    GameInfo: []
  },
  reducers: {
    setCurrentSlip: (state, action) => {
      state.currentSlip = parseInt(action.payload);
    },
    setSlips: (state, action) => {
      state.slips.push(parseInt(action.payload));
    },
    deleteSlip: (state, action) => {
      const slipToDelete = parseInt(action.payload);
      state.slips = state.slips.filter((slip) => slip !== slipToDelete);
      state.bets[slipToDelete] = {};
      const newCurrentSlip =
        state.slips && state.slips.length > 0
          ? state.slips[state.slips.length - 1]
          : 0;
      state.currentSlip = newCurrentSlip;

      state.oddsInfo["rate"] = 0;
      state.GameInfo = [];
    },
    deleteBet: (state, action) => {
      const { fixtureId } = action.payload;
      delete state.bets[state.currentSlip][fixtureId];

      let foundIdx = state.GameInfo.findIndex((element)=>element.FixtureId === fixtureId);
      if (foundIdx > -1) {
        delete state.GameInfo.splice(foundIdx, 1)
      }
      
      let totalRate = 0;
      for (const [fixtureIdKey, markets] of Object.entries(state.bets[state.currentSlip])) {
        if (fixtureId !== fixtureIdKey) {
          const foundBet = markets.bets.find((element) => element.Id === markets.selectedBetId);
          totalRate = parseFloat((parseInt(parseFloat((totalRate===0?1:totalRate)*parseFloat(foundBet.Price)) * 100) / 100).toFixed(2)*1);
        }
      }

      state.oddsInfo["rate"] = totalRate;
    },
    setBets: (state, action) => {
      const { market, bets, fixtureId, fixture, selectedBetId, baseLine, marketId, MainLine } =
        action.payload;
      if (state.slips.length === 0) {
        state.slips.push(1);
        state.currentSlip = 1;
      }
      const currentBets = state.bets[state.currentSlip] || {};
      if (currentBets[fixtureId]?.selectedBetId === selectedBetId) {
        delete currentBets[fixtureId];

        state.bets[state.currentSlip] = currentBets;
      } else {
        state.bets[state.currentSlip] = {
          ...currentBets,
          [fixtureId]: {
            market,
            fixtureId,
            fixture,
            bets,
            selectedBetId,
            baseLine,
          },
        };

        state.GameInfo.push({
          FixtureId: parseInt(fixtureId),
          gameInfo: {
            Fixture: {
              SportId: fixture.Sport.Id,
              LocationId: fixture.Location.Id,
              LeagueId: fixture.League.Id,
              Participants: fixture.Participants,
              StartDate: fixture.StartDate
            },
            Markets: {
              Id: marketId,
              MainLine: MainLine,
              Bet: bets,
              BaseLine: baseLine
            }
          },
          selectBetId: selectedBetId
        });
      }

      let totalRate = 0;
      for (const [fixtureId, markets] of Object.entries(state.bets[state.currentSlip])) {
        const foundBet = markets.bets.find((element) => element.Id === markets.selectedBetId);
        totalRate = parseFloat((parseInt(parseFloat((totalRate===0?1:totalRate)*parseFloat(foundBet.Price)) * 100) / 100).toFixed(2)*1);
      }

      state.oddsInfo["rate"] = totalRate;
    },
  },
});

export const { setCurrentSlip, setSlips, deleteSlip, setBets, deleteBet } =
  betSlipReducer.actions;

export default betSlipReducer.reducer;

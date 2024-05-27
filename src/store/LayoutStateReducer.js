import { LAYOUT_VIEW_STATE } from "@/lib/constants";
import data_slips from "@/lib/mock_data";
import { createSlice } from "@reduxjs/toolkit";

const LayoutStateReducer = createSlice({
    name: "layoutState",
    initialState: {
        slips: [],
        betSlipView: false,
        fixtureDetailView: false,
        fixtureView: true
    },
    reducers: {
        setLayoutState: (state, action) => {
            let layout = action.payload
            switch (layout) {
                case LAYOUT_VIEW_STATE.FIXTURE:
                    state.fixtureView = true;
                    state.fixtureDetailView = false;
                    state.betSlipView = false;
                    break
                case LAYOUT_VIEW_STATE.BETTING_SLIP:
                    state.fixtureView = false;
                    state.fixtureDetailView = false;
                    state.betSlipView = true;
                    break
                case LAYOUT_VIEW_STATE.DETAIL_FIXTURE:
                    state.fixtureView = false;
                    state.fixtureDetailView = true;
                    state.betSlipView = false;
                    break
            }

        }
    },
});

export const { setLayoutState } =
    LayoutStateReducer.actions;

export default LayoutStateReducer.reducer;

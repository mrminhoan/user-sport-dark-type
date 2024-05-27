import { configureStore } from "@reduxjs/toolkit";
import MarketReducer from "./MarketReducer";
import LoaderReducer from "./LoaderReducer";
import BetSlipReducer from "./BetSlipReducer";
import MobileViewReducer from "./MobileViewReducer";
import MemberReducer from "./MemberReducer";
import BetSlipV2Reducer from "./BetSlipV2Reducer";
import { createSocketMiddleware } from "../sockets/socketMiddleware";
import LayoutStateReducer from "./LayoutStateReducer";
import WebStateReducer from "./WebStateReducer";

const socketMiddleware = createSocketMiddleware();
const store = configureStore({
  reducer: {
    markets: MarketReducer,
    loader: LoaderReducer,
    betSlip: BetSlipReducer,
    betSlipV2: BetSlipV2Reducer,
    mobileView: MobileViewReducer,
    userInfos: MemberReducer,
    layoutState: LayoutStateReducer,
    webState: WebStateReducer
  },
  middleware: (getDefaultMiddleware) => [
    socketMiddleware,
    ...getDefaultMiddleware(),
  ],
});

export default store;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBet, deleteBet } from "@/store/BetSlipV2Reducer";
import { setFixtureSelected } from "@/store/MarketReducer";
import { LAYOUT_VIEW_STATE, TYPE_BETTING_CARD } from "@/lib/constants";
import { setLayoutState } from "@/store/LayoutStateReducer";
function MarketBettingCards({
  fixture,
  bet,
  market,
  actived = false,
  disabled = false,
  swap = false,
  title,
  value,
  type,
  renderCompare,
}) {
  // if (fixture?.Fixture?.Status !== 1 && fixture?.Fixture?.Status !== 9)
  //   disabled = true;
  const dispatch = useDispatch();
  const slips = useSelector((state) => state.betSlipV2.slips);
  const handleCheckExists = (marketId, fixtureId, betId) => {
    const isExits = slips?.some(
      (item) =>
        item.fixture.FixtureId === fixtureId &&
        item.market.Id === marketId &&
        item.bet.Id === betId
    );

    return isExits;
  };

  const handleSelectBetting = (market, fixture, bet) => {
    let marketId = market?.Id;
    let fixtureId = fixture?.FixtureId;
    let betId = bet?.Id;
    let isExists = handleCheckExists(marketId, fixtureId, betId);
    if (isExists) return dispatch(deleteBet(betId));
    dispatch(
      addBet({
        fixture: fixture,
        bet,
        market: market,
      })
    );
    dispatch(setFixtureSelected(fixture));
  };
  let BG = "";
  let BG_ACTIVED = "";
  let BG_DISABLED = "";
  //  `${type == TYPE_BETTING_CARD.FIXTURE_ZONE || type == TYPE_BETTING_CARD.BETTING_SLIP_ZONE ? "bg-[#ffffff3d] [transition:all_0.8s,_color_0.3s_0.3s,_transform_0.3s] hover:border-[#08838A] hover:[box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset]" : "bg-[red]"}`

  switch (type) {
    case TYPE_BETTING_CARD.FIXTURE_ZONE:
      BG =
        "bg-[#ffffff3d] [transition:all_0.8s,_color_0.3s_0.3s,_transform_0.3s] hover:border-[#08838A] hover:[box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset]";
      BG_ACTIVED =
        "[box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset] !border-[#08838A] text-[#08838A]";
      BG_DISABLED = "bg-[#ffffff10] pointer-events-none opacity-60";
      break;
    case TYPE_BETTING_CARD.DETAIL_FIXTURE_ZONE:
      BG =
        "bg-bg border-[#000] [transition:all_0.8s,_color_0.3s_0.3s,_transform_0.3s] hover:border-[#08838A] hover:[box-shadow:16rem_0_0_0_#ffffff3d_inset,_-16rem_0_0_0_#ffffff3d_inset]";
      BG_ACTIVED =
        " [box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset] !border-[#08838A] text-[#08838A]";
      BG_DISABLED = "bg-[#49525e40] pointer-events-none opacity-60";
      break;
    case TYPE_BETTING_CARD.BETTING_SLIP_ZONE:
      BG =
        "bg-[#ffffff3d] [transition:all_0.8s,_color_0.3s_0.3s,_transform_0.3s] hover:border-[#08838A] hover:[box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset]";
      BG_ACTIVED =
        "[box-shadow:16rem_0_0_0_#0A0E14_inset,_-16rem_0_0_0_#0A0E14_inset] !border-[#08838A] text-[#08838A]";
      BG_DISABLED = "bg-[#ffffff10] pointer-events-none opacity-60";
      break;
  }

  return (
    <button
      className={` flex flex-1 select-none justify-between ${BG} border-[1px] border-transparent p-[8px] rounded-[6px] text-white  ${
        disabled ? BG_DISABLED : ""
      } ${actived ? BG_ACTIVED : ""}`}
      disabled={disabled}
      onClick={() => handleSelectBetting(market, fixture, bet)}
    >
      {swap === false ? (
        <>
          <span className="text-14">{title}</span>
          <span className="text-14 flex items-center gap-2">
            {renderCompare && renderCompare}
            {value}
          </span>
        </>
      ) : (
        <>
          <span className="text-14 flex items-center gap-2">
            {value}
            {renderCompare && renderCompare}
          </span>
          <span className="text-14">{title}</span>
        </>
      )}
    </button>
  );
}

export default MarketBettingCards;

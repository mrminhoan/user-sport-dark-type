import { LAYOUT_VIEW_STATE, TYPE_BETTING_CARD } from "@/lib/constants";
import React from "react";
import LiveZone from "@/components/tracker/LiveZone";
import { IconsList } from "@/components/common/Icons";
import useMarkets from "@/hooks/useMarkets";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutState } from "@/store/LayoutStateReducer";
import { useMediaQuery } from "react-responsive";
import { isEmpty } from "lodash";
import { checkStatus } from "@/lib/functions";

const MarketContainer = ({ children, isDisabled }) => {
  return (
    <div className={isDisabled && "cursor-not-allowed"}>
      <div
        className={`bg-neutral/800 px-[16px] py-[5px] rounded-[10px] my-[16px] ${
          isDisabled && "opacity-50 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

function DetailFixure() {
  const dispatch = useDispatch();
  const { renderMarket } = useMarkets();
  const fixtures = useSelector((state) => state.markets.fixtures);
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const fixtureSelected = useSelector((state) => state.markets.fixtureSelected);

  const fixtureItem = fixtures
    ? fixtures.data?.documents?.find(
        (element) => element.value.FixtureId == fixtureSelected.FixtureId
      )
    : {};

  if (!fixtureItem || isEmpty(fixtureItem)) return;

  const fixtureValue = fixtureItem.value;
  const ListMarkets = fixtureValue?.Markets;
  const SportId = fixtureValue?.Fixture?.Sport.Id;
  const FixtureId = fixtureValue?.FixtureId;

  return (
    <div
      className={`text-white ${
        isMediumScreen ? "overflow-auto max-h-full" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center bg-transparent  lg:bg-[#1B1F24] px-[12px] py-[10px] rounded-t-lg mb-[8px]">
        <div className="flex flex-row justify-between items-center gap-[2px] w-full lg:w-max">
          <div
            onClick={() => dispatch(setLayoutState(LAYOUT_VIEW_STATE.FIXTURE))}
            className="z-50"
          >
            <img
              src={
                !isMediumScreen ? IconsList.ic_details : IconsList.ic_arrow_back
              }
              alt="ic_slip"
              className="w-full lg:w-[16px]"
            />
          </div>
          <p className="text-[16px]  flex-1 w-full font-bold lg:font-normal text-white text-center ">
            Details
          </p>
          <div />
        </div>
      </div>
      <LiveZone fixtureId={FixtureId} sportId={SportId} />

      {ListMarkets &&
        Array.isArray(ListMarkets) &&
        ListMarkets?.length > 0 &&
        ListMarkets.map((marketItem, index) => {
          return (
            <MarketContainer
              key={index}
              isDisabled={checkStatus(fixtureValue.Fixture)}
            >
              {renderMarket({
                fixture: fixtureValue,
                market: marketItem,
                type: TYPE_BETTING_CARD.DETAIL_FIXTURE_ZONE,
                // isLockFixture:
                //   FixtureChange &&
                //   FixtureChange?.Fixture?.Status !== 1 &&
                //   FixtureChange?.Fixture?.Status !== 9 &&
                //   true,
              })}
            </MarketContainer>
          );
        })}
    </div>
  );
}

export default DetailFixure;

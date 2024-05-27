import CommonButton from "@/components/common/Button";
import Dot from "@/components/common/Dot";
import { IconsList } from "@/components/common/Icons";
import Handicap from "@/components/common/market_type_card/Handicap";
import UnderOver from "@/components/common/market_type_card/UnderOver";
import WinOrLose from "@/components/common/market_type_card/WinOrLose";
import { Avatar } from "antd";
import {
  LANGUAGE_VALUES,
  LAYOUT_VIEW_STATE,
  LIST_MAIN_MENU,
  MARKET_TYPE,
  TYPE_BETTING_CARD,
} from "@/lib/constants";
import {
  checkStatus,
  setChangePrice,
  setUTCSumTimeZone,
} from "@/lib/functions";
import { deleteBet } from "@/store/BetSlipV2Reducer";
import { Divider } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFixtureSelected } from "@/store/MarketReducer";
import useMarkets from "@/hooks/useMarkets";
import { setLayoutState } from "@/store/LayoutStateReducer";
const FixtureItem = ({ item, key, index }) => {
  const { renderMarket } = useMarkets();
  const fixtureKoData = useSelector((state) => state.markets.fixtureKoData);
  const priceChanges = useSelector((state) => state.markets.priceChanges);
  const fixtureSelected = useSelector((state) => state.markets.fixtureSelected);
  const userInfo = useSelector((state) => state.userInfos.userInfo);
  const currentLang = useSelector((state) => state.webState.currentLang);
  const ICON_URL = import.meta.env.VITE_ICON_URL;
  const dispatch = useDispatch();

  const { Fixture, Markets, bet } = item;

  const { StartDate, Participants } = Fixture;
  const homeTeam = Participants.find((item) => item.Position == 1);
  const awayTeam = Participants.find((item) => item.Position == 2);
  const firstIcon = homeTeam?.IconName
    ? ICON_URL + "/" + homeTeam?.IconName
    : "";
  const secondIcon = awayTeam?.IconName
    ? ICON_URL + "/" + awayTeam?.IconName
    : "";

  console.log({ firstIcon, secondIcon });

  const SportId = Fixture?.Sport?.Id;
  const SPORT = LIST_MAIN_MENU.find((element) => element.Id == SportId);

  let NewPriceMarkets = JSON.parse(JSON.stringify(Markets));
  const priceChange = priceChanges?.find(
    (item) => item.SportId == Fixture.Sport.Id
  );

  for (let market of NewPriceMarkets) {
    market.Bets = setChangePrice(market.Bets, priceChange);
  }
  const markets = NewPriceMarkets.filter((m) => {
    if (
      Fixture.Sport.Id == 6046 || // 축구
      Fixture.Sport.Id == 35232 // 아이스 하키
    )
      return [1, 2, 3].includes(m.Id);
    else return [1, 2, 3, 52, 226, 28, 342, 1558].includes(m.Id);
  });

  const mainMarkets = markets?.reduce((cur, prev) => {
    const marketName = prev.Name.toLowerCase();

    if (prev?.Bets?.length === 0) return cur;

    if (marketName.includes("1x2") || marketName.includes("12")) {
      cur.push(prev);
    }

    if (marketName.includes("under/over") || marketName.includes("handicap")) {
      if (!prev?.MainLine) return cur;

      const mainLine = Number(prev?.MainLine).toFixed(2);
      const underOver = {
        ...prev,
        Bets: prev.Bets.filter((b) => b.BaseLine === prev.MainLine),
      };
      if (!underOver) return;
      if (!mainLine) return;
      cur?.push(underOver);
    }

    return cur;
  }, []);

  const handleShowDetailFixutre = (fixture) => {
    dispatch(setFixtureSelected(fixture));
    dispatch(setLayoutState(LAYOUT_VIEW_STATE.DETAIL_FIXTURE));
  };
  const FixtureChange = fixtureKoData?.find(
    (element) => element?.FixtureId == item?.FixtureId
  );

  return (
    <div
      className={`relative p-[2px] shrink-0 overflow-hidden rounded-[10px]  ${
        item.FixtureId === fixtureSelected.FixtureId &&
        'before:absolute before:content-[""] before:w-[200%] before:h-2/3 before:top-2/4 before:left-2/4 before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-30 before:bg-white before:animate-[rotateAni_4s_linear_infinite_forwards]'
      } `}
    >
      <div className="bg-black relative rounded-[9px]">
        <div
          className={` ${SPORT.className} p-[12px] rounded-[8px] relative z-20`}
          style={{
            ...(item.FixtureId === fixtureSelected.FixtureId && {
              boxShadow: "2px 4px 8px 0px rgba(96, 170, 99, 0.16)",
            }),
            // borderColor: `${
            //   item.FixtureId === fixtureSelected.FixtureId
            //     ? "rgba(255, 255, 255, 0.5)"
            //     : "rgba(255, 255, 255, 0.1)"
            // } `,
          }}
          key={item.FixtureId}
          // onClick={() => handleShowDetailFixutre(item)}
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-[16px]">
              <img src={SPORT.icon} alt="icon sport" />
              <div className="flex flex-row items-center">
                <p className="text-[14px] font-bold text-white uppercase">
                  {userInfo.timezone &&
                    setUTCSumTimeZone(StartDate, userInfo.timezone, "HH:mm a")}
                </p>
                <Dot style={{ margin: "0 8px" }} />
                <p className="text-[14px] font-normal text-white">
                  {setUTCSumTimeZone(
                    StartDate,
                    userInfo.timezone,
                    currentLang === LANGUAGE_VALUES.KO
                      ? "YYYY-MM-DD"
                      : "DD-MM-YYYY"
                  )}
                </p>
              </div>
            </div>

            <CommonButton
              bgColor="#FFFFFF3D"
              shape="round"
              rightComponent={() => (
                <img src={IconsList.ic_arrow_right} alt="ic arrow right" />
              )}
              style={{
                padding: "4px 8px",
              }}
              onClick={() => handleShowDetailFixutre(item)}
            >
              +{Markets?.length}
            </CommonButton>
          </div>

          {Participants?.length && (
            <div className="flex flex-row items-center justify-center gap-[16px] mt-[8px]">
              <div className="flex flex-row gap-[8px] items-center w-[45%] justify-end">
                <p className="text-[14px] font-semibold text-white text-center">
                  {Participants[0]?.Nameko || Participants[0]?.Name}
                </p>
                <Avatar
                  size={42}
                  src={firstIcon || IconsList.ic_mu}
                  className="bg-white"
                />
              </div>
              <img src={IconsList.ic_vs} alt="" className="flex-1" />
              <div className="flex flex-row gap-[8px] items-center w-[45%]">
                <Avatar
                  size={42}
                  src={secondIcon || IconsList.ic_mu}
                  className="bg-white"
                />
                <p className="text-[14px] font-semibold text-white text-center">
                  {Participants[1]?.Nameko || Participants[1]?.Name}
                </p>
              </div>
            </div>
          )}

          <Divider
            className=" my-[12px]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.24)",
            }}
          />
          <div
            className={
              checkStatus(item.Fixture) && "opacity-50 cursor-not-allowed "
            }
          >
            <div className={checkStatus(item.Fixture) && "pointer-events-none"}>
              {mainMarkets.map((market, index) => {
                return (
                  <div key={index}>
                    {renderMarket({
                      fixture: item,
                      market: market,
                      type: TYPE_BETTING_CARD.FIXTURE_ZONE,
                      isDisplayName: false,
                      isLockFixture:
                        FixtureChange &&
                        FixtureChange?.Fixture?.Status !== 1 &&
                        FixtureChange?.Fixture?.Status !== 9 &&
                        true,
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* {FixtureChange &&
        FixtureChange?.Fixture?.Status !== 1 &&
        FixtureChange?.Fixture?.Status !== 9 && (
          <p className="text-[16px] text-[red] text-center">Không được cược</p>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default FixtureItem;

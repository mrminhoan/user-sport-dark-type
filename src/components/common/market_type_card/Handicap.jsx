import React from "react";
import { groupBy, orderBy } from "lodash";
import {
  handleCheckBettingCardExists,
  removeStringBaseLine,
  sortHandicap,
} from "@/lib/functions";
import MarketCardWrapper from "../market_cards_wrapper";
import MarketBettingCards from "../market_betting_cards";
import {
  HOME_AWAY_POSITION_NAME_KOR,
  LANGUAGE_VALUES,
  TYPE_BETTING_CARD,
} from "@/lib/constants";
import { useSelector } from "react-redux";
import useExchange from "@/hooks/useExchange";
import { useTranslation } from "react-i18next";

function Handicap({
  fixture,
  market,
  isDisplayName = true,
  betIdSelected,
  type,
  isLockFixture,
  disable,
}) {
  const { marketState, originMarket, shadowPrice, isDisabled } = useExchange({
    fixture,
    market,
  });
  const { t } = useTranslation();
  const slips = useSelector((state) => state.betSlipV2.slips);
  const currentLang = useSelector((state) => state.webState.currentLang);
  if (!marketState) return;
  let Bets = marketState?.Bets;
  Bets = marketState.Bets?.map((item) => ({
    ...item,
    LineSplit: removeStringBaseLine(item?.Line),
    BaseLineSplit: removeStringBaseLine(item?.BaseLine),
  }));
  const sortOriginBaseLine = Bets.sort(
    (a, b) => parseFloat(a?.BaseLineSplit) - parseFloat(b?.BaseLineSplit)
  );

  const originBets = originMarket?.Bets;
  const BetsGroupBy = groupBy(Bets, "BaseLine");

  const originBetGroupBy = groupBy(originBets, "BaseLine");
  const ListMarketsSortByBaseLine = orderBy(BetsGroupBy, ["BaseLine"], "asc");
  const originListmarketSort = orderBy(originBetGroupBy, ["BaseLine"], "asc");

  const MarketName =currentLang == LANGUAGE_VALUES?.KO ?  marketState?.Nameko : marketState?.Name;

  const removeString = marketState?.Bets?.map((item) => ({
    ...item,
    LineSplit: removeStringBaseLine(item?.Line),
    BaseLineSplit: removeStringBaseLine(item?.BaseLine),
  }));
  const groupByOriginHandicap = groupBy(removeString, "BaseLineSplit");

  // const sortOriginBaseLine = orderBy(
  //   groupByOriginHandicap,
  //   ["BaseLineSplit"],
  //   "asc"
  // );
  // console.log({ ListMarketsSortByBaseLine });

  const MarketFilterForSlipAndDetails = ListMarketsSortByBaseLine.reduce(
    (prev, cur) => {
      if (cur?.length < 2) {
        return prev;
      }
      if (betIdSelected) {
        const find = cur?.some((element) => element?.Id === betIdSelected);
        if (find) {
          prev.push(cur);
        }
      } else [prev.push(cur)];
      return prev;
    },
    []
  );

  return (
    <>
      <MarketCardWrapper marketName={MarketName} isDisplayName={isDisplayName}>
        {MarketFilterForSlipAndDetails?.map((group, index) => {
          const groupSortByName = sortHandicap(group);
          const BetHome = groupSortByName?.find(
            (element) => element?.Name == "1"
          );
          const BetAway = groupSortByName?.find(
            (element) => element?.Name == "2"
          );
          const BaseLine = BetHome?.BaseLineSplit;

          const originBetHome = originListmarketSort?.find((element) => {
            return element.some((g) => g?.BaseLine === BetHome?.BaseLine);
          });
          const originBetAway = originListmarketSort?.find((element) => {
            return element.some((g) => g?.BaseLine === BetAway?.BaseLine);
          });
          const originItemBetHome = originBetHome?.find(
            (o) => o.Id === BetHome.Id
          );
          const originItemBetAway = originBetAway?.find(
            (o) => o.Id === BetAway.Id
          );
          return (
            <div
              key={index}
              className="flex justify-between gap-[16px] mb-[16px]"
            >
              <MarketBettingCards
                fixture={fixture}
                bet={BetHome}
                market={marketState}
                title={t("position.home")}
                value={BetHome?.Price}
                actived={
                  handleCheckBettingCardExists(
                    marketState?.Id,
                    fixture?.FixtureId,
                    BetHome?.Id,
                    slips
                  ) || BetHome?.Id == betIdSelected
                }
                disabled={isDisabled(BetHome) || disable}
                type={type}
                renderCompare={shadowPrice(originItemBetHome, BetHome)}
              />
              <MarketBettingCards
                fixture={fixture}
                title={"H"}
                value={BaseLine}
                disabled
                type={type}
              />
              <MarketBettingCards
                fixture={fixture}
                market={marketState}
                bet={BetAway}
                title={t("position.away")}
                value={BetAway?.Price}
                swap={true}
                disabled={isDisabled(BetAway) || disable}
                actived={
                  handleCheckBettingCardExists(
                    marketState?.Id,
                    fixture?.FixtureId,
                    BetAway?.Id,
                    slips
                  ) || BetAway?.Id == betIdSelected
                }
                type={type}
                renderCompare={shadowPrice(originItemBetAway, BetAway)}
              />
            </div>
          );
        })}
      </MarketCardWrapper>
    </>
  );
}

export default Handicap;

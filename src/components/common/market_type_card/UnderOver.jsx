import React from "react";
import { groupBy, orderBy } from "lodash";
import MarketCardWrapper from "../market_cards_wrapper";
import { LANGUAGE_VALUES, OVER_UNDER_TYPE } from "@/lib/constants";
import MarketBettingCards from "../market_betting_cards";
import { handleCheckBettingCardExists, sortUnderOver } from "@/lib/functions";
import { useSelector } from "react-redux";
import useExchange from "@/hooks/useExchange";
import { useTranslation } from "react-i18next";

function UnderOver({
  fixture,
  market,
  isDisplayName = true,
  betIdSelected,
  type,
  isLockFixture,
  disable,
}) {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.webState.currentLang);
  const { marketState, originMarket, shadowPrice, isDisabled } = useExchange({
    fixture,
    market,
  });
  const slips = useSelector((state) => state.betSlipV2.slips);
  if (!marketState) return;
  const Bets = marketState?.Bets;
  const originBets = originMarket?.Bets;
  const originBetGroupBy = groupBy(originBets, "BaseLine");

  const ListMarketsSortByBaseLine = orderBy(Bets, ["BaseLine"], "asc");
  const BetsGroupBy = Object.values(
    groupBy(ListMarketsSortByBaseLine, "BaseLine")
  );

  const originListmarketSort = orderBy(originBetGroupBy, ["BaseLine"], "asc");

  // const MarketName = marketState?.Nameko || marketState?.Name || "";
  const MarketName =
    currentLang === LANGUAGE_VALUES?.KO
      ? marketState?.Nameko
      : marketState?.Name;

  const MarketFilterForSlipAndDetails = BetsGroupBy.reduce((prev, cur) => {
    if (betIdSelected) {
      const find = cur?.some((element) => element?.Id === betIdSelected);
      if (find) {
        prev.push(cur);
      }
    } else [prev.push(cur)];
    return prev;
  }, []);

  return (
    <>
      <MarketCardWrapper marketName={MarketName} isDisplayName={isDisplayName}>
        {MarketFilterForSlipAndDetails?.map((group, index) => {
          const BetOver = group?.find(
            (element) => element?.Name?.toLowerCase() == OVER_UNDER_TYPE.OVER
          );
          const BetUnder = group?.find(
            (element) => element?.Name?.toLowerCase() == OVER_UNDER_TYPE.UNDER
          );

          const originBetOver = originListmarketSort?.find((group) =>
            group.some((g) => g.BaseLine === BetOver?.BaseLine)
          );

          const originBetUnder = originListmarketSort?.find((group) =>
            group.some((g) => g.BaseLine === BetUnder?.BaseLine)
          );

          if (!originBetOver || !originBetUnder) return;

          const originItemOver = originBetOver.find((o) => o.Id === BetOver.Id);
          const originItemUnder = originBetUnder.find(
            (o) => o.Id === BetUnder.Id
          );

          return (
            <div
              key={index}
              className={`flex justify-between gap-[16px] ${"mb-[16px]"}`}
            >
              <MarketBettingCards
                fixture={fixture}
                bet={BetOver}
                market={marketState}
                title={t("position.over")}
                value={BetOver?.Price}
                actived={handleCheckBettingCardExists(
                  market?.Id,
                  fixture?.FixtureId,
                  BetOver?.Id,
                  slips
                )}
                disabled={isDisabled(BetOver) || disable}
                type={type}
                renderCompare={shadowPrice(originItemOver, BetOver)}
              />
              <MarketBettingCards
                fixture={fixture}
                bet={BetOver}
                market={marketState}
                title={"O/U"}
                value={BetOver?.BaseLine}
                type={type}
                disabled
              />
              <MarketBettingCards
                fixture={fixture}
                bet={BetUnder}
                market={marketState}
                title={t("position.under")}
                value={BetUnder?.Price}
                swap={true}
                actived={handleCheckBettingCardExists(
                  market?.Id,
                  fixture?.FixtureId,
                  BetUnder?.Id,
                  slips
                )}
                disabled={isDisabled(BetUnder) || disable}
                type={type}
                renderCompare={shadowPrice(originItemUnder, BetUnder)}
              />
            </div>
          );
        })}
      </MarketCardWrapper>
    </>
  );
}

export default UnderOver;

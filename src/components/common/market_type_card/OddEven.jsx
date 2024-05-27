import { LANGUAGE_VALUES, ODD_EVENT_POSITION_NAME_KOR } from "@/lib/constants";
import { handleCheckBettingCardExists, sortOddEven } from "@/lib/functions";
import React from "react";
import MarketCardWrapper from "../market_cards_wrapper";
import MarketBettingCards from "../market_betting_cards";
import { useSelector } from "react-redux";
import useExchange from "@/hooks/useExchange";
import { useTranslation } from "react-i18next";

function OddEven({ fixture, market, betIdSelected, type, disable }) {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.webState.currentLang);
  const { marketState, originMarket, shadowPrice, isDisabled } = useExchange({
    fixture,
    market,
  });
  // const MarketName = marketState?.Name || marketState?.Nameko || "";
  const MarketName =
    currentLang === LANGUAGE_VALUES?.KO
      ? marketState?.Nameko
      : marketState?.Name;
  const Bets = marketState?.Bets;
  const originBets = originMarket?.Bets;

  //   const Bets = market?.Bets;
  const ListMarketsSortByName = sortOddEven(Bets);
  const slips = useSelector((state) => state.betSlipV2.slips);
  return (
    <>
      <MarketCardWrapper marketName={MarketName}>
        <div className="flex justify-between gap-[16px] mb-[16px]">
          {ListMarketsSortByName &&
            ListMarketsSortByName?.length &&
            ListMarketsSortByName.map((element, index) => {
              const originBetOdd = originBets?.find(
                (_element) => _element?.Name?.toLowerCase() == "odd"
              );
              const originBetEven = originBets?.find(
                (_element) => _element?.Name?.toLowerCase() == "even"
              );

              return (
                <MarketBettingCards
                  fixture={fixture}
                  bet={element}
                  market={marketState}
                  title={element?.Name?.toLowerCase() == "odd" ? t("position.odd") : t("position.even")}
                  value={element?.Price}
                  key={index}
                  swap={index == ListMarketsSortByName?.length - 1}
                  actived={
                    handleCheckBettingCardExists(
                      market?.Id,
                      fixture?.FixtureId,
                      element?.Id,
                      slips
                    ) || element?.Id == betIdSelected
                  }
                  disabled={isDisabled(element) || disable}
                  type={type}
                  renderCompare={shadowPrice(
                    element?.Name?.toLowerCase() == "even"
                      ? originBetEven
                      : originBetOdd,
                    element
                  )}
                />
              );
            })}
        </div>
      </MarketCardWrapper>
    </>
  );
}

export default OddEven;

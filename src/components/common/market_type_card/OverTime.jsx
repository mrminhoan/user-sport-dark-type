import {
  handleCheckBettingCardExists,
  sortIncudingTime,
} from "@/lib/functions";
import React from "react";
import MarketCardWrapper from "../market_cards_wrapper";
import MarketBettingCards from "../market_betting_cards";
import { HOME_AWAY_POSITION_NAME_KOR, LANGUAGE_VALUES } from "@/lib/constants";
import { useSelector } from "react-redux";
import useExchange from "@/hooks/useExchange";
import { useTranslation } from "react-i18next";

function OverTime({
  fixture,
  market,
  betIdSelected,
  type,
  isDisplayName,
  isLockFixture,
  disable,
}) {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.webState.currentLang);
  const slips = useSelector((state) => state.betSlipV2.slips);
  const { marketState, originMarket, shadowPrice, isDisabled } = useExchange({
    fixture,
    market,
  });

  if (!marketState) return;
  // const MarketName = marketState?.Name || marketState?.Nameko || "";
  const MarketName =
    currentLang === LANGUAGE_VALUES?.KO ? marketState?.Nameko : marketState?.Name;
  const Bets = marketState?.Bets;
  const originBets = originMarket?.Bets;
  const ListMarketsSortByName = sortIncudingTime(Bets);

  if (!ListMarketsSortByName) return;

  return (
    <>
      <MarketCardWrapper marketName={MarketName} isDisplayName={isDisplayName}>
        <div className="flex justify-between gap-[16px] mb-[16px]">
          {ListMarketsSortByName &&
            ListMarketsSortByName?.length &&
            ListMarketsSortByName.map((element, index) => {
              const originBet = originBets?.find(
                (o) => o.Name === element.Name && o.Id === element.Id
              );

              return (
                <MarketBettingCards
                  fixture={fixture}
                  bet={element}
                  market={marketState}
                  title={
                    element?.Name == "1"
                      ? t("position.home-win")
                      : t("position.away-lose")
                  }
                  value={element?.Price}
                  key={index}
                  swap={index == ListMarketsSortByName?.length - 1}
                  actived={
                    handleCheckBettingCardExists(
                      marketState?.Id,
                      fixture?.FixtureId,
                      element?.Id,
                      slips
                    ) || element?.Id == betIdSelected
                  }
                  disabled={isDisabled(element) || disable}
                  type={type}
                  renderCompare={shadowPrice(originBet, element)}
                />
              );
            })}
        </div>
      </MarketCardWrapper>
    </>
  );
}

export default OverTime;

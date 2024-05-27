import React from "react";
import MarketCardWrapper from "../market_cards_wrapper";
import MarketBettingCards from "../market_betting_cards";
import { useSelector } from "react-redux";
import { handleCheckBettingCardExists } from "@/lib/functions";
import useExchange from "@/hooks/useExchange";
import { LANGUAGE_VALUES } from "@/lib/constants";
import { useTranslation } from "react-i18next";

function WinOrLose({
  fixture,
  market,
  betIdSelected,
  isDisplayName,
  type,
  disable,
}) {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.webState.currentLang);
  const { marketState, originMarket, shadowPrice, isDisabled } = useExchange({
    fixture,
    market,
  });

  const slips = useSelector((state) => state.betSlipV2.slips);

  // const MarketName = marketState?.Name || marketState?.Nameko || "";
  const MarketName =
    currentLang === LANGUAGE_VALUES?.KO
      ? marketState?.Nameko
      : marketState?.Name;
  const Bets = marketState?.Bets;
  const originBets = originMarket?.Bets;

  const BetHome = Bets?.find((bet) => bet?.Name == "1");
  const BetDraw = Bets?.find((bet) => bet?.Name?.toLowerCase() == "x");
  const BetAway = Bets?.find((bet) => bet?.Name == "2");

  const originBetHome = originBets?.find((bet) => bet?.Name == "1");
  const originBetDraw = originBets?.find(
    (bet) => bet?.Name?.toLowerCase() == "x"
  );
  const originBetAway = originBets?.find((bet) => bet?.Name == "2");

  return (
    <MarketCardWrapper marketName={MarketName} isDisplayName={isDisplayName}>
      <div className="flex justify-between gap-[16px] mb-[16px]">
        <MarketBettingCards
          fixture={fixture}
          bet={BetHome}
          market={marketState}
          title={t("position.home-win")}
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
          renderCompare={shadowPrice(originBetHome, BetHome)}
        />
        <MarketBettingCards
          fixture={fixture}
          bet={BetDraw}
          market={marketState}
          title={t("position.draw")}
          value={BetDraw?.Price}
          actived={
            handleCheckBettingCardExists(
              marketState?.Id,
              fixture?.FixtureId,
              BetDraw?.Id,
              slips
            ) || BetDraw?.Id == betIdSelected
          }
          disabled={isDisabled(BetDraw) || disable}
          type={type}
          renderCompare={shadowPrice(originBetDraw, BetDraw)}
        />
        <MarketBettingCards
          fixture={fixture}
          bet={BetAway}
          market={marketState}
          title={t("position.away-lose")}
          value={BetAway?.Price}
          swap={true}
          actived={
            handleCheckBettingCardExists(
              marketState?.Id,
              fixture?.FixtureId,
              BetAway?.Id,
              slips
            ) || BetAway?.Id == betIdSelected
          }
          disabled={isDisabled(BetAway) || disable}
          type={type}
          renderCompare={shadowPrice(originBetAway, BetAway)}
        />
      </div>
    </MarketCardWrapper>
  );
}

export default WinOrLose;

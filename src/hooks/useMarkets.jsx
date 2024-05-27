import Handicap from "@/components/common/market_type_card/Handicap";
import OddEven from "@/components/common/market_type_card/OddEven";
import OverTime from "@/components/common/market_type_card/OverTime";
import UnderOver from "@/components/common/market_type_card/UnderOver";
import WinOrLose from "@/components/common/market_type_card/WinOrLose";
import { MARKET_TYPE, TYPE_BETTING_CARD } from "@/lib/constants";
import { useCallback } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

function useMarkets() {
  const renderMarket = useCallback(
    ({
      fixture,
      market,
      betIdSelected,
      isDisplayName,
      type,
      isLockFixture = false,
      disable = false,
    }) => {
      const marketName = market?.Name?.toLowerCase();
      const marketNameKo = market?.Nameko;
      const marketNameToCompair = `${marketName} ${marketNameKo}`;

      // 1x2
      if (
        marketName.includes(MARKET_TYPE["1X2"]) ||
        marketName.includes(MARKET_TYPE.Winner) ||
        marketName.includes(MARKET_TYPE["승무패"])
      ) {
        return (
          <WinOrLose
            fixture={fixture}
            market={market}
            type={type}
            isDisplayName={isDisplayName}
            betIdSelected={betIdSelected}
            isLockFixture={isLockFixture}
            disable={disable}
          />
        );
      }

      // Under Over
      if (
        marketNameToCompair.includes(MARKET_TYPE["Under/Over"]) ||
        marketNameToCompair.includes(MARKET_TYPE["오버언더"]) ||
        marketNameToCompair.includes(MARKET_TYPE["언더오버"])
      ) {
        return (
          <UnderOver
            fixture={fixture}
            market={market}
            type={type}
            isDisplayName={isDisplayName}
            betIdSelected={betIdSelected}
            isLockFixture={isLockFixture}
            disable={disable}
          />
        );
      }

      // Handicap
      if (
        marketNameToCompair.includes(MARKET_TYPE.Handicap) ||
        marketNameToCompair.includes(MARKET_TYPE["핸디캡"])
      ) {
        return (
          <Handicap
            fixture={fixture}
            market={market}
            type={type}
            isDisplayName={isDisplayName}
            betIdSelected={betIdSelected}
            isLockFixture={isLockFixture}
            disable={disable}
          />
        );
      }

      // Odd/Even
      if (
        marketName.includes(MARKET_TYPE["Odd/Even"]) ||
        marketName.includes(MARKET_TYPE["홀짝"])
      ) {
        return (
          <OddEven
            market={market}
            fixture={fixture}
            type={type}
            isDisplayName={isDisplayName}
            betIdSelected={betIdSelected}
            isLockFixture={isLockFixture}
            disable={disable}
          />
        );
      }

      // 12
      if (
        marketName.includes(MARKET_TYPE["12"]) ||
        marketName.includes(MARKET_TYPE["승패"])
      ) {
        return (
          <OverTime
            market={market}
            fixture={fixture}
            type={type}
            isDisplayName={isDisplayName}
            betIdSelected={betIdSelected}
            isLockFixture={isLockFixture}
            disable={disable}
          />
        );
      }
    }
  );

  return {
    renderMarket,
  };
}

export default useMarkets;

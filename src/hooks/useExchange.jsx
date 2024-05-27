import { IconsList } from "@/components/common/Icons";
import { setChangePrice } from "@/lib/functions";
import { addBet } from "@/store/BetSlipV2Reducer";
import {
  deleteItemExchangeFixtures,
  setBetFixture,
} from "@/store/MarketReducer";
import { isArray } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function useExchange({ fixture, market }) {
  const dispatch = useDispatch();
  const [marketState, setMarketState] = useState(market);
  const fixtures = useSelector((state) => state.markets.fixtures);
  const realFixtures = useSelector((state) => state.markets.exchangeFixtures);
  const priceChanges = useSelector((state) => state.markets.priceChanges);
  const priceChange =
    fixture.Fixture.Sport &&
    priceChanges.find((item) => item.SportId == fixture.Fixture.Sport.Id);
  const slips = useSelector((state) => state.betSlipV2.slips);

  useEffect(() => {
    if (market) {
      setMarketState(market);
    }
  }, [JSON.stringify(market)]);

  const originFixture = fixtures.data?.documents.find(
    (i) => i.value.FixtureId === fixture.FixtureId
  );

  const mappingMarket =
    originFixture &&
    originFixture.value.Markets.find((i) => i.Id === market.Id);

  const originMarket = priceChange &&
    mappingMarket && {
      ...mappingMarket,
      Bets: setChangePrice(mappingMarket?.Bets, priceChange),
    };

  const exChangeFixture = useMemo(
    () => realFixtures.find((r) => r.FixtureId === fixture.FixtureId),
    [realFixtures]
  );

  const exChangeMarket = useMemo(
    () =>
      exChangeFixture
        ? exChangeFixture.Markets?.find((m) => market.Id === m.Id)
        : [],
    [exChangeFixture]
  );

  useEffect(() => {
    if (exChangeMarket && marketState) {
      const cloneMarket = { ...marketState };

      const newBets = cloneMarket.Bets.reduce((acc, curr) => {
        const betItemExchange = exChangeMarket.Bets?.find(
          (exMarket) => exMarket.Id === curr.Id
        );
        acc.push(betItemExchange ? betItemExchange : curr);
        return acc;
      }, []);
      cloneMarket.Bets = newBets;

      if (exChangeMarket.Bets) {
        exChangeMarket.Bets.forEach((exbet, _, arr) => {
          if (
            exChangeMarket.Name.includes("Handicap") ||
            exChangeMarket.Name.includes("Under/Over")
          ) {
            const isCouple = arr.filter((i) => i.BaseLine === exbet.BaseLine);

            if (isArray(isCouple) && isCouple.length === 2) return;
            if (marketState.Bets.some((c) => c.Id === exbet.Id)) return;
            cloneMarket.Bets.push(exbet);
          }
        });
      }

      if (priceChange) {
        cloneMarket.Bets = setChangePrice(cloneMarket.Bets, priceChange);
      }

      setMarketState(cloneMarket);
    }
  }, [exChangeMarket]);

  useEffect(() => {
    if (exChangeFixture) {
      setTimeout(() => {
        exChangeMarket?.Bets.forEach((exBet) => {
          const marketIntoOrigin = originMarket.Bets.find(
            (originBet) => originBet.Id === exBet.Id
          );

          if (marketIntoOrigin) {
            dispatch(
              setBetFixture({
                bet: exBet,
                betId: marketIntoOrigin.Id,
                marketId: exChangeMarket.Id,
                fixtureId: exChangeFixture.FixtureId,
              })
            );
          }

          if (!originMarket.Bets.some((c) => c.Id === exBet.Id)) {
            dispatch(
              setBetFixture({
                bet: exBet,
                betId: 0,
                marketId: exChangeMarket.Id,
                fixtureId: exChangeFixture.FixtureId,
              })
            );
          }
        });

        dispatch(deleteItemExchangeFixtures(exChangeFixture.FixtureId));
      }, 2000);
    }
  }, [exChangeFixture]);

  useEffect(() => {
    slips.forEach((s) => {
      const newMarket = {
        ...originMarket,
      };
      const item = newMarket.Bets?.find((b) => b.Id === s.bet.Id);
      if (item) {
        dispatch(addBet({ ...s, bet: item }));
      }
    });
  }, [fixtures]);

  const shadowPrice = (start, end) => {
    if (!start || !end || start === end) return;

    if (typeof start === "object" && typeof end === "object") {
      const startNumb = Number(start.changePrice || start.Price);
      const endNumb = Number(end.changePrice || end.Price);

      if (startNumb === endNumb) return;
      return startNumb > endNumb ? (
        <img
          src={IconsList.ic_arrow_cool_down}
          className="animate-[fade-in_2s_forwards]"
        />
      ) : (
        <img
          src={IconsList.ic_arrow_warm_up}
          className="animate-[fade-in_2s_forwards]"
        />
      );
    }

    return Number(start) > Number(end) ? (
      <img
        src={IconsList.ic_arrow_cool_down}
        className="animate-[fade-in_2s_forwards]"
      />
    ) : (
      <img
        src={IconsList.ic_arrow_warm_up}
        className="animate-[fade-in_2s_forwards]"
      />
    );
  };

  const isDisabled = (bet) => {
    if (!bet || !bet.Status) return;

    return ![1, 9].includes(bet.Status);
  };

  return {
    marketState,
    exChangeFixture,
    exChangeMarket,
    originFixture,
    originMarket,
    shadowPrice,
    isDisabled,
  };
}

export default useExchange;

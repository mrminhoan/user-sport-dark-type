import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const BetRow = ({ market, bets, selectedBetId, baseLine }) => {
  const [tabs, setTabs] = useState([]);

  const TabTrigger = (key, title, price) => {
    return (
      <TabsTrigger
        key={key}
        value={key}
        className={clsx(
          "flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white cursor-text",
        )}
      >
        <span className="text-xs">{title}</span>
        <span className="text-xs">{price}</span>
      </TabsTrigger>
    );
  };

  useEffect(() => {
    const arr = [];
    const marketName = market?.toLowerCase();

    const marketTypes = {
      "odd/even": { home: "Odd", away: "Even" },
      "under/over": { home: "Under", away: "Over" },
      "1x2": { home: "1", draw: "X", away: "2" },
      winner: { home: "1", draw: "X", away: "2" },
      handicap: { home: "1", away: "2" },
      12: { home: "1", away: "2" },
      "홀짝": { home: "Odd", away: "Even" },
      "오버언더": { home: "Under", away: "Over" },
      "승무패": { home: "1", draw: "X", away: "2" },
      "핸디캡": { home: "1", away: "2" },
      "승패": { home: "1", away: "2" },
    };

    const marketInfo = Object.entries(marketTypes)
      .filter(([key]) => marketName.includes(key))
      .map(([, value]) => value)[0];

    if (marketInfo) {
      const { home, draw, away } = marketInfo;
      const homeBet = bets?.find((bet) => bet.Name === home);
      const drawBet = bets?.find((bet) => bet.Name === draw);
      const awayBet = bets?.find((bet) => bet.Name === away);

      if (homeBet)
        arr.push(
          TabTrigger(homeBet.Id, home === "1" ? "홈" : home, homeBet.Price),
        );
      if (!drawBet && baseLine) {
        arr.push(
          <div
            key={homeBet.Id + awayBet.Id}
            className="flex justify-between items-center text-xs text-white w-[30%]"
          >
            <span>{home === "Under" ? "U/O" : "H"}</span>
            <span>{baseLine}</span>
          </div>,
        );
      }

      if (drawBet)
        arr.push(
          TabTrigger(drawBet.Id, draw === "X" ? "X" : draw, drawBet.Price),
        );

      if (awayBet)
        arr.push(
          TabTrigger(awayBet.Id, away === "2" ? "원정" : away, awayBet.Price),
        );
    }

    setTabs(arr);
  }, [selectedBetId]);

  return (
    <>
      <Tabs className="w-full" value={selectedBetId}>
        <TabsList className="flex flex-row justify-between bg-transparent">
          {tabs?.map((tab) => tab)}
        </TabsList>
      </Tabs>
    </>
  );
};

export default BetRow;

import { TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

const HandiCap = ({ market, isMainCard, handleBetChange }) => {
  const [tabList, setTabList] = useState([]);

  const TabTrigger = (betId, title, price, baseLine) => {
    return (
      <TabsTrigger
        key={betId + market.Name}
        value={betId}
        className={clsx(
          "flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white",
        )}
        onClick={() => onTabSelect(betId, baseLine)}
      >
        {(title==="홈")&&
        <>
          <span className="text-xs">{title}</span>
          <span className="text-xs">{Number(price).toFixed(2)}</span>
        </>
        }
        {title==="원정"&&
        <>
        <span className="text-xs">{Number(price).toFixed(2)}</span>
        <span className="text-xs">{title}</span>
        </>
        }
      </TabsTrigger>
    );
  };

  const onTabSelect = (selectedBetId, baseLine) => {
    const group = market?.Bets?.reduce((groupBy, bet) => {
      const { BaseLine, ...rest } = bet;
      if (!groupBy[BaseLine]) {
        groupBy[BaseLine] = [];
      }
      groupBy[BaseLine].push(rest);
      return groupBy;
    }, {});
    handleBetChange({
      selectedBetId,
      allBets: group,
      market: market?.Name,
      marketId: market?.Id,
      MainLine: market.MainLine, 
      baseLine,
    });
  };

  useMemo(() => {
    const group = market?.Bets?.reduce((groupBy, bet) => {
      const { BaseLine, ...rest } = bet;
      if (!groupBy[BaseLine]) {
        groupBy[BaseLine] = [];
      }
      groupBy[BaseLine].push(rest);
      return groupBy;
    }, {});

    if (group) {
      const { MainLine } = market;
      const tabList = [];
      Object.entries(group).forEach(([BaseLine, bets]) => {
        if(bets.length<2) return;
        
        const arr = [];
        const home = bets?.find((b) => b.Name === "1");
        const away = bets?.find((b) => b.Name === "2");
        if (isMainCard && BaseLine === MainLine) {
          if (home) {
            arr.push(TabTrigger(home.Id, "홈", home.Price, BaseLine.split(' ')[0]));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between text-xs text-white w-[30%]"
              >
                <span>H</span>
                <span>{MainLine.split(' ')[0]}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "원정", away.Price, BaseLine.split(' ')[0]));
          }
        } else if (!isMainCard) {
          if (home) {
            arr.push(TabTrigger(home.Id, "홈", home.Price, BaseLine.split(' ')[0]));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between text-xs text-white w-[30%]"
              >
                <span>H</span>
                <span>{BaseLine.split(' ')[0]}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "원정", away.Price, BaseLine.split(' ')[0]));
          }
        }
        if (arr.length > 0) {
          tabList.push(arr);
        }
      });
      setTabList(tabList);
    }
  }, []);

  return (
    <>
      {tabList?.length !== 0
        ? tabList?.map((tab, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-between w-full bg-transparent"
              >
                {tab?.map((tab) => tab)}
              </div>
            );
          })
        : ""}
    </>
  );
};

export default HandiCap;

import { LANGUAGE_VALUES, MARKET_TYPE } from "@/lib/constants";
import { setUTCSumTimeZone } from "@/lib/functions";
import { Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const BettingDetailTable = ({ record }) => {
  const { userInfo } = useSelector((state) => state.userInfos);
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.webState.currentLang);

  const columns = [
    {
      title: t("betting-history.column-title.game-time"),
      dataIndex: "StartDate",
      key: "StartDate",
      width: "10%",
      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Fixture = BetItemInfo.Fixture;
        return (
          <p className="text-white">
            {setUTCSumTimeZone(
              Fixture.StartDate,
              userInfo.timezone,
              "YY.MM.DD HH:mm"
            )}
          </p>
        );
      },
    },
    {
      title: t("betting-history.column-title.event"),
      dataIndex: "sportName",
      key: "sportName",
      width: "10%",
      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Fixture = BetItemInfo.Fixture;
        return (
          <p className="text-white">
            {currentLang === LANGUAGE_VALUES?.KO
              ? Fixture.Sport.Nameko
              : Fixture.Sport.Name}
          </p>
        );
      },
    },
    {
      title: t("betting-history.column-title.league"),
      key: "leagueName",
      width: "10%",

      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Fixture = BetItemInfo.Fixture;
        return (
          <p className="text-white">
            {currentLang == LANGUAGE_VALUES?.KO
              ? Fixture.League.Nameko
              : Fixture.League.Name}
          </p>
        );
      },
    },
    {
      title: t("betting-history.column-title.type"),
      dataIndex: "marketName",
      key: "marketName",
      // align: "center",
      width: "10%",

      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Markets = BetItemInfo.Markets;
        return (
          <p className="py-[2px] bg-[#D1D5DB] text-center rounded w-max px-1">
            {currentLang == LANGUAGE_VALUES?.KO ? Markets.Nameko : Markets.Name}
          </p>
        );
      },
    },
    {
      title: t("betting-history.column-title.home-vs-away"),
      key: "homeTeamName",
      width: "15%",
      render: (_, row) => {
        let flag = false;
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Fixture = BetItemInfo.Fixture;
        const hometeam = Fixture.Participants.find(
          (item) => item.Position == 1
        );
        const awayteam = Fixture.Participants.find(
          (item) => item.Position == 2
        );

        const Markets = BetItemInfo.Markets;

        const bets = Markets.Bet;
        const home = bets.find(
          (bet) => bet.Name === "1" || bet.Name === "Odd" || bet.Name === "Over"
        );
        const away = bets.find(
          (bet) =>
            bet.Name === "2" || bet.Name === "Even" || bet.Name === "Under"
        );

        const marketNameToCompair = `${Markets?.Name} ${Markets?.Nameko}`;
        if (
          marketNameToCompair.includes(MARKET_TYPE["1X2"]) ||
          marketNameToCompair.includes(MARKET_TYPE.Winner) ||
          marketNameToCompair.includes(MARKET_TYPE["승무패"]) ||
          marketNameToCompair.includes(MARKET_TYPE["12"]) ||
          marketNameToCompair.includes(MARKET_TYPE["승패"])
        )
          flag = true;

        return (
          <div className="flex flex-col gap-1 justify-end">
            <div className="flex flex-row items-center gap-1">
              <div className="bg-[#ADFFD0] px-[12px] rounded">
                {t(flag === true ? "position.home-win" : "position.home")}
              </div>
              <p className="text-white">{hometeam.Nameko || hometeam.Name}</p>
              <p className="text-white">{home.Price}</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="bg-[#FFADAD] px-[12px] rounded">
                {t(flag === true ? "position.away-lose" : "position.away")}
              </div>
              <p className="text-white">{awayteam.Nameko || awayteam.Name}</p>
              <p className="text-white">{away.Price}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "draw_line",
      key: "draw_line",
      width: "10%",

      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Markets = BetItemInfo.Markets;
        const bets = Markets.Bet;
        const draw = bets.find((bet) => bet.Name === "X");
        const baseLine = Markets.BaseLine;

        return (
          <p className="text-white">
            {draw
              ? "X " + draw.Price
              : baseLine
              ? t("betting-history.column-title.benchmark") +
                baseLine.split(" ")[0]
              : ""}
          </p>
        );
      },
    },
    {
      title: t("betting-history.column-title.select"),
      dataIndex: "choiceName",
      key: "choiceName",
      width: "10%",

      render: (_, row) => {
        const BetItemInfo = JSON.parse(row.BetItemInfo);
        const Markets = BetItemInfo.Markets;

        const bets = Markets.Bet;

        const home = bets.find(
          (bet) => bet.Name === "1" || bet.Name === "Odd" || bet.Name === "Over"
        );
        const away = bets.find(
          (bet) =>
            bet.Name === "2" || bet.Name === "Even" || bet.Name === "Under"
        );
        const draw = bets.find((bet) => bet.Name === "X");
        const choice =
          home.Id == row.BetGroupBetID
            ? home
            : away.Id == row.BetGroupBetID
            ? away
            : draw;

        const marketNameToCompair = `${Markets?.Name} ${Markets?.Nameko}`;
        if (
          marketNameToCompair.includes(MARKET_TYPE["1X2"]) ||
          marketNameToCompair.includes(MARKET_TYPE.Winner) ||
          marketNameToCompair.includes(MARKET_TYPE["승무패"]) ||
          marketNameToCompair.includes(MARKET_TYPE["12"]) ||
          marketNameToCompair.includes(MARKET_TYPE["승패"])
        ) {
          return (
            <p className="text-white">
              {choice?.Name === "1"
                ? t("position.home-win")
                : t("position.away-lose")}
              &nbsp;{choice.Price}
            </p>
          );
        } else {
          return (
            <p className="text-white">
              {t(`position.${choice?.Name?.toLowerCase()}`)}&nbsp;{choice.Price}
            </p>
          );
        }
      },
    },
    {
      title: t("betting-history.column-title.progress"),
      dataIndex: "status",
      key: "status",
      width: "10%",

      render: (_, row) => {
        let text,
          bgColor = "";
        switch (row.Status) {
          case -1:
            text = t("betting-history.column-title.cancellation");
            bgColor = "#D45348";
            break;
          case 0:
            text = t("betting-history.column-title.proceeding");
            bgColor = "#689CF8";
            break;
          case 1:
            text = t("betting-history.column-title.lose");
            bgColor = "#D45348";
            break;
          case 2:
            text = t("betting-history.column-title.win");
            bgColor = "#019326";
            break;

          default:
            text = t("betting-history.column-title.enemy");
            bgColor = "#E8AA3B";
            break;
        }
        return (
          <p
            className={`text-[14px] text-white rounded text-center  w-max px-2 flex flex-row justify-center items-center`}
            style={{ background: bgColor }}
          >
            {text}
          </p>
        );
      },
    },
  ];

  return (
    <div className="mx-0 sub-table-detail-betting-history">
      <Table
        columns={columns}
        dataSource={JSON.parse(record.BetItems)?.map((item, index) => ({
          ...item,
          key: index + 1,
        }))}
        pagination={false}
      />
    </div>
  );
};

export default BettingDetailTable;

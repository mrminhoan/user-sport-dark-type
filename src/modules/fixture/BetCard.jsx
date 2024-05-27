import React, { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import BetRow from "./BetRow";
import { Separator } from "@/components/ui/separator";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteBet } from "@/store/BetSlipReducer";
import clsx from "clsx";
import { cardBG } from "@/lib/constants";

function BetCard({
  market,
  bets,
  fixture,
  fixtureId,
  selectedBetId,
  baseLine,
}) {
  const dispatch = useDispatch();
  const { bets: betsState } = useSelector((state) => state.betSlip);
  const [leagueName, setLeagueName] = useState();
  const [location, setLocation] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [time, setTime] = useState();

  useMemo(() => {
    setLeagueName(fixture?.League?.Name);
    setLocation(fixture?.Location?.Name);
    setTime(fixture?.StartDate.replace("T", " "));
    if (fixture?.Participants.length !== 0) {
      const team1 = fixture?.Participants?.find((p) => p.Position === "1");
      if (team1) setTeam1(team1.Name);
      const team2 = fixture?.Participants?.find((p) => p.Position === "2");
      if (team2) setTeam2(team2.Name);
    }
  }, []);

  const handleDeleteBet = () => {
    dispatch(deleteBet({ fixtureId, bets: betsState }));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-400 ml-1">
        {location}&nbsp;&gt;&nbsp;{leagueName}
      </span>
      <Card
        className={clsx(
          `flex flex-col gap-2 ${
            fixture?.Sport?.Id
              ? cardBG[fixture?.Sport?.Id]
              : "bg-gradient-to-r from-amber-900 to-pink-900"
          } p-2`,
        )}
      >
        <div className="flex justify-end h-5 items-center space-x-2">
          <div className="font-bold leading-none text-sm truncate">
            {market}
          </div>
          <Separator className="w-[2px] bg-gray-400" orientation="vertical" />
          <span className="text-sm truncate">{time}</span>
          <IoCloseCircleOutline
            className="text-white h-6 w-6 cursor-pointer"
            onClick={() => handleDeleteBet()}
          />
        </div>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 text-sm p-0 px-1">
          <span className="w-[30%] text-center">{team1}</span>
          <span className="w-[20%] text-center">VS</span>
          <span className="w-[30%] text-center">{team2}</span>
        </CardHeader>
        <BetRow
          market={market}
          bets={bets}
          selectedBetId={selectedBetId}
          baseLine={baseLine}
        />
      </Card>
    </div>
  );
}

export default BetCard;

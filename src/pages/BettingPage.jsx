import { IconsList } from "@/components/common/Icons";
import BetSlips from "@/new_modules/bet_slips/BetSlips";
import DetailFixure from "@/new_modules/detail_fixture/DetailFixure";
import Fixture from "@/new_modules/fixture/Fixture";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import SideBarMenu from "@/new_modules/sidebar/SideBarMenu.jsx";
import httpClient from "@/service/index.js";
import { useQuery } from "@tanstack/react-query";
import BettingPageMobile from "./BettingPageMobile";
import BettingPageDesktop from "./BettingPageDesktop";
import Sidebar from "@/components/layout/sidebar";

const Pane = ({ children }) => {
  return <>{children}</>;
};
function BettingPage() {
  const { data: sportsList, isSuccess } = useQuery({
    queryKey: ["sports-list"],
    queryFn: async () => {
      let res = await httpClient.post("", { gameStatus: "BET" });
      return res?.data;
    },
  });
  const [headerTab, setHeaderTab] = useState(["주요경기", "오늘의 경기"]);

  const isMediumScreen = useMediaQuery({ query: "(max-width: 1200px)" });

  return (
    <div className="flex gap-[var(--genDis)] h-full overflow-hidden ">
      <Sidebar />
      {isMediumScreen ? <BettingPageMobile /> : <BettingPageDesktop />}
    </div>
  );
}

export default BettingPage;

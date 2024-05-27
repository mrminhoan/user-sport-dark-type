import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Fixtures from "../fixture";
import FixtureMarket from "../fixture/FixtureMarket";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "@/store/LoaderReducer";
import BetSlip from "../fixture/BetSlip";
import { BiFootball } from "react-icons/bi";
import { FaBaseball } from "react-icons/fa6";
import { IoMdFootball } from "react-icons/io";
import { IoIosBasketball } from "react-icons/io";
import { CgGames } from "react-icons/cg";
import { GiHockey } from "react-icons/gi";
import { FaVolleyball } from "react-icons/fa6";
import { DialogClose } from "@radix-ui/react-dialog";
import { FaAngleLeft } from "react-icons/fa6";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const icons = {
  "131506": (
    <BiFootball style={{ height: "1.5rem", width: "1.5rem" }} />
  ),
  "154914": <FaBaseball style={{ height: "1.25rem", width: "1.25rem" }} />,
  "48242": <IoIosBasketball style={{ height: "1.5rem", width: "1.5rem" }} />,
  "154830": <FaVolleyball style={{ height: "1.25rem", width: "1.25rem" }} />,
  "35232": <GiHockey style={{ height: "1.5rem", width: "1.5rem" }} />,
  "687890": <CgGames style={{ height: "1.5rem", width: "1.5rem" }} />,
  "6046": <IoMdFootball style={{ height: "1.5rem", width: "1.5rem" }} />,
};

const Sports = () => {
  const dispatch = useDispatch();
  const { isBetSlip, isMarkets } = useSelector((state) => state.mobileView);
  const { currentSlip, bets } = useSelector((state) => state.betSlip);
  const [sportId, setSportId] = useState();
  const {
    data: sportsList,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["sports-list"],
    queryFn: () => {
      return fetch(`${BACKEND_URL}/sports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameStatus: "BET",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    },
  });

  return (
    <div className="flex flex-col h-full">
      {/* Sprots List */}
      {isSuccess && !isFetching && sportsList?.data?.length !== 0 && (
        <Tabs
          className="w-full px-4 pt-4"
          defaultValue="all-sports"
          onValueChange={(value) => {
            dispatch(setLoader(true));
            setSportId(value === "all-sports" ? "" : value);
          }}
        >
          <TabsList className="grid grid-cols-8 w-full h-auto">
            <TabsTrigger
              className="py-2 justify-evenly text-primary text-xs truncate uppercase select-none"
              value="all-sports"
            >
              <span className="opacity-0">H</span>
              전체
              <span>{sportsList?.totalCount}</span>
            </TabsTrigger>
            {sportsList?.data?.map((s) => (
              <TabsTrigger
                key={s.Id + s.Name}
                value={s.Id}
                className="relative h-8 px-0 justify-evenly text-primary text-xs truncate uppercase select-none"
              >
                <span className="relative left-0 xl:absolute xl:left-4">
                  {icons[s.Id]}
                </span>
                <span className="hidden xl:block pl-10">{s.Name}</span>
                <span className="font-bold">{s.count}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {isFetching && (
        <div className="animate-pulse px-4 pt-4">
          <div className="h-10 bg-gray-800 rounded"></div>
        </div>
      )}
      {/* Sprots List */}

      {/* Desktop View */}
      <div
        className="grid grid-cols-1 xl:grid-cols-3 space-x-3 h-full p-4"
        style={{ maxHeight: "calc(100% - 4rem)" }}
      >
        {!isMarkets && !isBetSlip && (
          <div className="relative h-full w-full mx-auto lg:w-[90%] xl:w-full overflow-hidden border-2 rounded-lg">
            <Fixtures sportId={sportId} />
          </div>
        )}

        <div className="hidden xl:block relative h-full overflow-y-auto border-2 rounded-lg">
          <FixtureMarket />
        </div>

        <div className="hidden xl:block relative h-full overflow-y-auto border-2 rounded-lg">
          <BetSlip />
        </div>
      </div>
      {/* Desktop View */}

      {/* Mobile Views */}
      <Dialog className="dark" open={isMarkets}>
        <DialogContent className="dark bg-background sm:rounded-none border-0 p-0 h-screen w-screen min-w-screen max-w-screen z-[1000] overflow-y-auto">
          <FixtureMarket />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="xl:hidden fixed left-6 bottom-10 flex justify-center items-center z-[990] bg-folder bg-no-repeat h-16 w-16 text-white p-2 pt-4 rounded text-md font-bold">
          {currentSlip === 1 ? "One" : currentSlip}
          <div className="absolute top-3 right-0 -mt-4 -mr-2 px-2 bg-red-500 rounded-md">
            {bets[currentSlip] ? Object.keys(bets[currentSlip]).length : 0}
          </div>
        </DialogTrigger>
        <DialogContent className="dark flex flex-col gap-0 sm:rounded-none border-0 p-0 h-screen w-screen z-[1000] min-w-screen max-w-screen overflow-y-auto">
          <DialogHeader className="flex items-center p-5 text-white font-bold bg-muted">
            <DialogClose asChild className="flex items-center cursor-pointer">
              <h3 className="uppercase leading-none">
                <FaAngleLeft className=" text-white" />
                <span className="ml-2">Bet Slip</span>
              </h3>
            </DialogClose>
          </DialogHeader>
          <BetSlip />
        </DialogContent>
      </Dialog>
      {/* Mobile Views */}
    </div>
  );
};

export default Sports;

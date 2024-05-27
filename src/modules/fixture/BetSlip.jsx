import { deleteSlip, setCurrentSlip, setSlips } from "@/store/BetSlipReducer";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BetCard from "./BetCard";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { formatcurrency } from '../../lib/functions';

const BetSlip = () => {
  const dispatch = useDispatch();
  const { slips, currentSlip, bets, oddsInfo, GameInfo } = useSelector((state) => state.betSlip);
  const { userInfo } = useSelector((state) => state.userInfos);
  const [ bettingAmount, setBettingAmount ] = useState(0);
  const [ totalRate, setTotalRate ] = useState(0);

  useEffect(()=>{
    if (oddsInfo["rate"] === 0) {
      setBettingAmount(0);
    }
    else setTotalRate(parseFloat((parseInt(parseFloat(oddsInfo["rate"]*(oddsInfo?.bonusInfo?.BonusRate||1)) * 100) / 100).toFixed(2)*1))
  }, [oddsInfo]);

  const setOnlyNum = (v) => {
    const onlyNums = String(v).replace(/[^0-9]/g, '');
    if (onlyNums === "0") {
      setBettingAmount(0);
    } else {
      setBettingAmount(parseInt(onlyNums)+parseInt(bettingAmount));
    }
  }

  const createSlip = (e, number) => {
    if (!slips.includes(number)) {
      dispatch(setSlips(number));
      dispatch(setCurrentSlip(number));
    } else {
      dispatch(setCurrentSlip(number));
    }
  };

  const slipComponents = [1, 2, 3].map((number) => (
    <div
      key={number}
      className={clsx(
        "relative text-white h-12 w-12 flex items-center justify-center rounded-md cursor-pointer select-none",
        {
          "bg-gray-800": !slips.includes(parseInt(number)),
          "bg-amber-800": slips.includes(parseInt(number)),
        },
      )}
    >
      <label
        htmlFor={`folder-${number}`}
        className="relative flex items-center justify-center w-full h-full has-[:checked]:text-white cursor-pointer select-none"
      >
        <input
          type="checkbox"
          id={`folder-${number}`}
          className="hidden"
          onClick={(e) => createSlip(e, number)}
        />
        {currentSlip === number ? (
          <FaCheck />
        ) : slips.includes(number) ? (
          number
        ) : (
          "+"
        )}
      </label>
    </div>
  ));

  const deleteBetSlip = () => {
    setBettingAmount(0);
    dispatch(deleteSlip(currentSlip));
  };

  const sendBetting = () => {
    if (Object.keys(bets?.["1"]).length === 0) {
      alert("게임을 선택해 주세요");
      return;
    }
    if (bettingAmount <= 0) {
      alert("베팅금액을 입력해 주세요");
      return;
    }
    dispatch({ 
      type: 'SEND_WEBSOCKET_MESSAGE' ,
      payload: {
        msgtype: "reqbet",
        BetMoney: bettingAmount,
        GameInfo: {
          betInfo: GameInfo,
          bonusInfo: oddsInfo.bonusInfo
        }
      }
    })
  };

  return (
    <div className="flex flex-col gap-3 p-6 xl:p-4">
      <div className="uppercase font-semibold leading-none">베팅 슬립</div>
      {/* <div className="flex flex-row gap-2">{slipComponents}</div> */}
      <Button
        className={clsx("w-auto ml-auto", {
          "opacity-40 pointer-events-none select-none truncate":
            slips.length === 0,
        })}
        onClick={() => deleteBetSlip()}
      >
        <FaTrash className="mr-2 h-4 w-4" />
        Delete Slip
      </Button>
      {Object.keys(bets).length !== 0 &&
      bets[currentSlip] &&
      Object.keys(bets[currentSlip])?.length !== 0
        ? Object.entries(bets[currentSlip]).map(([key, data]) => {
            return (
              <BetCard
                key={key}
                market={data?.market}
                bets={data?.bets}
                fixture={data?.fixture}
                fixtureId={data?.fixtureId}
                selectedBetId={data?.selectedBetId}
                baseLine={data?.baseLine}
              />
            );
          })
        : ""}
      <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>보유금액: {formatcurrency(userInfo?.balance||0)}</div>
      {oddsInfo?.bonusInfo?.BonusRate > 1 && <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>보너스배당: {oddsInfo?.bonusInfo?.BonusRate}</div>}
      <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>배당율: {oddsInfo?.rate||0}</div>
      <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>총 배당율: {totalRate}</div>
      <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>예상당첨금액: {formatcurrency(parseFloat((parseInt(parseFloat(totalRate*bettingAmount) * 100) / 100).toFixed(2)*1))}</div>
      <div className="uppercase font-semibold leading-none" style={{textAlign: "right"}}>
        베팅금액: {formatcurrency(bettingAmount)}
      </div>
      <label
        htmlFor={`folder`}
        className="relative flex items-center justify-center w-full h-full has-[:checked]:text-white cursor-pointer select-none"
      >
        <Button
          className={clsx("w-auto ml-auto", {
            "opacity-40 pointer-events-none select-none truncate":
              slips.length === 0,
          })}
          onClick={() => setOnlyNum(1000)}
        >1,000</Button>
        <Button
          className={clsx("w-auto ml-auto", {
            "opacity-40 pointer-events-none select-none truncate":
              slips.length === 0,
          })}
          onClick={() => setOnlyNum(5000)}
        >5,000</Button>
        <Button
          className={clsx("w-auto ml-auto", {
            "opacity-40 pointer-events-none select-none truncate":
              slips.length === 0,
          })}
          onClick={() => setOnlyNum(10000)}
        >10,000</Button>
        <Button
          className={clsx("w-auto ml-auto", {
            "opacity-40 pointer-events-none select-none truncate":
              slips.length === 0,
          })}
          onClick={() => setOnlyNum(50000)}
        >50,000</Button>
        <Button
          className={clsx("w-auto ml-auto", {
            "opacity-40 pointer-events-none select-none truncate":
              slips.length === 0,
          })}
          onClick={() => setOnlyNum(0)}
        >초기화</Button>
      </label>
      <Button
        className={clsx("w-auto ml-auto", {
          "opacity-40 pointer-events-none select-none truncate":
            slips.length === 0,
        })}
        onClick={() => sendBetting()}
      >Betting</Button>
    </div>
  );
};

export default BetSlip;

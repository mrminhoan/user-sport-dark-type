import React from "react";
import BetSlips from "@/new_modules/bet_slips/BetSlips";
import DetailFixure from "@/new_modules/detail_fixture/DetailFixure";
import Fixture from "@/new_modules/fixture/Fixture";
import { IconsList } from "@/components/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutState } from "@/store/LayoutStateReducer";
import { LAYOUT_VIEW_STATE } from "@/lib/constants";
function BettingPageMobile() {
  const betSlipView = useSelector((state) => state.layoutState.betSlipView);
  const fixtureDetailView = useSelector(
    (state) => state.layoutState.fixtureDetailView
  );
  const fixtureView = useSelector((state) => state.layoutState.fixtureView);

  const dispatch = useDispatch();
  return (
    <div className="w-full mt-[50px] max-[1200px]:relative">
      <div
        className={`w-full [transition:transform_.7s_ease-in-out] max-[1200px]:absolute max-[1200px]:top-0 max-[1200px]:left-0 max-[1200px]:right-0 bottom-0 ${
          fixtureView ? "transform-none" : "transform translate-x-[-2000px]"
        }`}
      >
        <div className="relative flex flex-col h-full">
          <div className="absolute w-full h-full">
            <Fixture />
          </div>
        </div>
      </div>

      <div
        className={`w-full [transition:transform_.7s_ease-in-out] max-[1200px]:absolute max-[1200px]:top-0 max-[1200px]:left-0 max-[1200px]:right-0 bottom-0 ${
          fixtureDetailView
            ? "transform-none"
            : "transform translate-x-[-2000px]"
        }`}
      >
        <div className="relative flex flex-col h-full">
          <div className="absolute w-full h-full">
            <DetailFixure />
          </div>
        </div>
      </div>

      <div
        className={`w-full [transition:transform_.7s_ease-in-out] max-[1200px]:absolute max-[1200px]:top-0 max-[1200px]:left-0 max-[1200px]:right-0 bottom-0 ${
          betSlipView ? "transform-none" : "transform translate-x-[-2000px]"
        }`}
      >
        <div className="relative flex flex-col h-full">
          <div className="absolute w-full h-full">
            <BetSlips />
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-[50px] right-[24px] cursor-pointer z-[900]  bg-green/green-50 rounded-[50%] p-[12px]"
        onClick={() =>
          dispatch(
            setLayoutState(
              betSlipView === false
                ? LAYOUT_VIEW_STATE.BETTING_SLIP
                : LAYOUT_VIEW_STATE.FIXTURE
            )
          )
        }
      >
        <img src={IconsList.ic_casino_chip} alt="ic_casino_chip" />

        <p className="text-[12px] absolute top-0 right-0 bg-[#E8AA3B] min-w-[18px] h-[18px] rounded-[18px] flex items-center justify-center text-white [box-shadow:0px_4px_2px_0px_rgba(0,_0,_0,_0.25)] px-[4px]">
          10
        </p>
      </div>
    </div>
  );
}

export default BettingPageMobile;

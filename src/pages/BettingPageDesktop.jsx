import BetSlips from "@/new_modules/bet_slips/BetSlips";
import DetailFixure from "@/new_modules/detail_fixture/DetailFixure";
import Fixture from "@/new_modules/fixture/Fixture";
import React from 'react'
import { useSelector } from 'react-redux';

function BettingPageDesktop() {
    const fixtureSelected = useSelector((state) => state.markets.fixtureSelected);

    return (
        <div className="flex-1 flex  mx-[-12px]">
            <div className="flex-1 px-[12px]">
                <div className="relative">
                    <div className="absolute w-full h-full">
                        <Fixture />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-[12px]  max-[768px]:hidden">
                <div className="relative">
                    <div className="absolute w-full h-full">
                        <DetailFixure fixture={fixtureSelected} />
                    </div>
                </div>
            </div>

            <div className="w-[25%] px-[12px] min-w-[410px]">
                <div className="relative h-full">
                    <div className="absolute w-full h-full">
                        <BetSlips />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BettingPageDesktop

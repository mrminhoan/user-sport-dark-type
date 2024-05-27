import { IconsList } from "@/components/common/Icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FixtureItem from "./FixtureItem";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { isArray, isEmpty } from "lodash";
import { LIST_MAIN_MENU, STATUS_FETCHING_DATA } from "@/lib/constants";
import {
  removeItemFixtureKoData,
  setStatusFetchingFixtures,
  updatedFixtureItem,
} from "@/store/MarketReducer";
import { updateBetSlip } from "@/store/BetSlipV2Reducer";
import { useTranslation } from "react-i18next";
function Fixture() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentAmount, setCurrentAmount] = useState(10);
  const sportSelected = useSelector((state) => state.webState.sportSelected);
  const fixtureKoData = useSelector((state) => state.markets.fixtureKoData);
  const { data } = useSelector((state) => state.markets.fixtures);
  const tabSelected = useSelector((state) => state.webState.tabSelected);
  const isFetchingFixture = useSelector(
    (state) => state.markets.isFetchingFixture
  );

  const handleShowMore = () => {
    dispatch({
      type: "SEND_WEBSOCKET_FIXTURES",
      payload: {
        msgtype: "reqFixtures",
        gameStatus: "BET",
        start: 0,
        count: currentAmount,
        sportIds: [sportSelected],
      },
    });
    setCurrentAmount((prev) => prev + 10);
  };

  useEffect(() => {
    if (fixtureKoData && isArray(fixtureKoData) && !isEmpty(fixtureKoData)) {
      fixtureKoData.forEach((f) => {
        dispatch(updateBetSlip({ fixtureId: f.FixtureId, fixture: f }));
        dispatch(updatedFixtureItem({ fixtureId: f.FixtureId, fixture: f }));
      });
    }
  }, [fixtureKoData]);

  const handleRefreshFixtures = () => {
    dispatch(setStatusFetchingFixtures(STATUS_FETCHING_DATA.LOADING));
    dispatch({
      type: "SEND_WEBSOCKET_FIXTURES",
      payload: {
        msgtype: "reqFixtures",
        gameStatus: "BET",
        start: 0,
        count: 10,
        sportIds: [sportSelected || 0],
      },
    });
    setTimeout(() => {
      dispatch(setStatusFetchingFixtures(STATUS_FETCHING_DATA.SUCCESS));
    }, 500);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-[#1B1F24] px-[12px] py-[10px] rounded-t-lg mb-[8px]">
        <div className="flex flex-row items-center gap-[4px]">
          <img
            src={tabSelected?.icon || IconsList.ic_all}
            alt="ic_slip"
            className="w-[16px]"
          />
          <p className="text-[14px] font-normal text-white ml-[4px]">
            {tabSelected?.title || t("fixture_zone.all")}
          </p>
        </div>
        <div
          className="flex flex-row gap-[4px] cursor-pointer"
          onClick={handleRefreshFixtures}
        >
          <img src={IconsList.ic_replay} alt="" />
          <p className="text-[14px] font-normal text-white">
            {t("fixture_zone.refresh")}
          </p>
        </div>
      </div>
      <div
        className="flex flex-col gap-[16px] overflow-auto"
        style={{
          height: "calc(100vh - 178px)",
        }}
      >
        {!isEmpty(data?.documents) ? (
          <>
            {data?.documents?.map((item) => (
              <FixtureItem key={item.value} item={item.value} />
            ))}

            {data?.total > 10 && (
              <div className="w-full flex justify-center">
                <Button
                  className={clsx("group h-[48px] px-[20px] hover:opacity-80")}
                  onClick={() => handleShowMore()}
                >
                  <span className="flex items-center justify-center w-full h-[48px] rounded-[8px]">
                    Show More
                  </span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <div className="flex flex-col justify-center py-[24px] gap-[16px] items-center">
              <img src={IconsList.ic_empty} width={"150px"} />
              <p className="text-[14px] text-center text-neutral/400">
                No any selection is added in Fixture
              </p>
            </div>
          </div>
        )}
      </div>
      {isFetchingFixture && (
        <div className="fixed w-screen h-screen top-0 bot-0 right-0 left-0 bg-[rgb(0,0,0,0.6)] z-[1000]">
          <div
            role="status"
            className="flex h-screen justify-center items-center"
          >
            <svg
              aria-hidden="true"
              className="w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fixture;

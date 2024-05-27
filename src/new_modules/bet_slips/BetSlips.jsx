import CommonButton from "@/components/common/Button";
import Dot from "@/components/common/Dot";
import { IconsList } from "@/components/common/Icons";
import { formatcurrency } from "@/lib/functions";
import { Divider, Input, Modal, Spin, Tooltip } from "antd";
import React, { Fragment, useEffect, useMemo, useRef } from "react";
import BetSlipItem from "./BetSlipItem";
import { HeightIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTotalPrice,
  clearAllBet,
  setBonusInfo,
  setLoading,
} from "@/store/BetSlipV2Reducer";
import openNotification from "@/components/common/ToastifyNoti";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { setLayoutState } from "@/store/LayoutStateReducer";
import { LAYOUT_VIEW_STATE, STATUS_FETCHING_DATA } from "@/lib/constants";
import { isArray, isEmpty, orderBy } from "lodash";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  setStatusBetting,
  setStatusFetchingFixtures,
} from "@/store/MarketReducer";
import HelpModal from "./HelpModal";
import { useTranslation } from "react-i18next";

const PRICES = [10000, 50000, 100000, 500000];

function BetSlips() {
  const { t, i18n } = useTranslation();
  const fixtureView = useSelector((state) => state.layoutState.betSlipView);
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const bonusFolder = useSelector((state) => state.markets.bonusFolder);

  const refBetSlipItemZone = useRef(null);
  const { slips, totalPrice, bonusInfo, isLoading } = useSelector(
    (state) => state.betSlipV2
  );

  const filterStatus = useMemo(
    () =>
      slips && isArray(slips) && !isEmpty(slips)
        ? slips.filter(
            (s) =>
              s.bet.Status === 1 &&
              (s.fixture.Fixture.Status === 1 || s.fixture.Fixture.Status === 9)
          )
        : [],
    [slips]
  );

  const { userInfo } = useSelector((state) => state.userInfos);

  const dispatch = useDispatch();

  const handleDefaultPrice = () => {
    dispatch(addTotalPrice(0));
  };

  const handleMaxPrice = () => {
    dispatch(addTotalPrice(Number(userInfo.balance)));
  };

  const validate = (evt) => {
    var theEvent = evt || window.event;

    if (theEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const handleSmartPrice = (value) => {
    dispatch(addTotalPrice(totalPrice + value));
  };

  const handleBetSum = () => {
    let totalrate = 1;
    if (!filterStatus || filterStatus.length === 0) {
      totalrate = 0;
    } else {
      for (const item of filterStatus) {
        totalrate *= item.bet.changePrice || item.bet.Price;
      }
    }

    return (
      Math.floor(Number((Number(totalrate) * 100).toFixed(5) / 100) * 100) / 100
    );
  };

  const handleSavePrice = (e) => {
    if (Number(e.target.value) < 0) {
      return;
    }
    dispatch(addTotalPrice(e.target.value));
  };

  const sendBetting = () => {
    const { maxwin } = userInfo?.limit?.prematch;

    if (filterStatus?.length === 0) {
      openNotification({
        type: "open",
        message: t("notification.warning"),
        description: t("notification.pls-select-the-game"),
      });

      dispatch(setLoading(false));
      return;
    }
    if (totalPrice <= 0) {
      openNotification({
        type: "open",
        message: t("notification.warning"),
        description: t("notification.pls-enter-your-bet-amount"),
      });

      dispatch(setLoading(false));
      return;
    }

    if (handleBetSum() * totalPrice > maxwin) {
      openNotification({
        type: "open",
        message: t("notification.warning"),
        description: t("notification.maximum-winnings",{amount:formatcurrency(maxwin) }),
      });
      return;
    }

    let betInfo = [];
    for (const selbet of filterStatus) {
      betInfo.push(selbet.resetSelBet);
    }

    let payload = {
      msgtype: "reqbet",
      BetMoney: totalPrice,
      GameInfo: {
        betInfo: betInfo,
        bonusInfo: bonusInfo,
      },
    };

    dispatch({
      type: "SEND_WEBSOCKET_MESSAGE",
      payload,
    });
    dispatch(setStatusBetting(STATUS_FETCHING_DATA.LOADING));
  };

  useEffect(() => {
    const SlipFilterBelowStatus = slips?.filter((slip) => {
      return (
        (slip?.bet?.Status == 9 || slip?.bet?.Status == 1) &&
        (slip?.fixture?.Fixture?.Status == 1 ||
          slip?.fixture?.Fixture?.Status == 9)
      );
    });
    let foundBonusInfo = bonusFolder.filter(
      (item) =>
        item.BonusFolder <= SlipFilterBelowStatus.length ||
        (item.BonusFolder > SlipFilterBelowStatus.length && item.IsUp == 1)
    );
    if (foundBonusInfo.length > 0) {
      const sortfoundBonusInfo = orderBy(
        foundBonusInfo,
        ["BonusFolder"],
        "desc"
      );
      for (const bonusItem of sortfoundBonusInfo) {
        let minrateFound = SlipFilterBelowStatus.filter(
          (item) => item.bet.Price >= bonusItem.BonusMinRate
        );
        if (minrateFound.length >= bonusItem.BonusFolder) {
          dispatch(setBonusInfo(bonusItem));
          return;
        }
      }
    }
    dispatch(
      setBonusInfo({
        BonusFolder: 1,
        BonusRate: 1,
        BonusMinRate: 1,
      })
    );
    if (refBetSlipItemZone.current) {
      refBetSlipItemZone.current.scroll({
        top: refBetSlipItemZone.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [slips]);

  return (
    <>
      <div className="w-full flex flex-col h-full pb-[24px]">
        <HelpModal />
        <div className="flex flex-row justify-between  items-center  lg:bg-[#1B1F24] px-[12px] py-[10px] rounded-t-lg mb-[8px]">
          <div className="flex flex-row">
            <img
              src={
                fixtureView && isMediumScreen
                  ? IconsList.ic_arrow_back
                  : IconsList.ic_slip
              }
              alt="ic_slip"
              onClick={() =>
                fixtureView &&
                isMediumScreen &&
                dispatch(setLayoutState(LAYOUT_VIEW_STATE.FIXTURE))
              }
            />
            <div className="flex flex-row  items-center">
              <p className="text-[14px] font-bold lg:font-normal text-white ml-[4px]">
                {t("bet-slip-infor.bet-slips")}
              </p>
              <Dot style={{ margin: "0 8px" }} />
              <CommonButton
                textColor="white"
                bgColor="#60AA63"
                shape="round"
                style={{
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                height={"20px"}
              >
                <p className="text-[12px] font-medium">
                  {filterStatus?.length}
                </p>
              </CommonButton>
            </div>
          </div>
          <div
            className="flex flex-row items-center gap-[4px] cursor-pointer"
            onClick={() => {
              if (!slips.length) {
                return;
              }
              dispatch(addTotalPrice(0));
              dispatch(clearAllBet());
            }}
          >
            {!!slips.length && (
              <Fragment>
                <img src={IconsList.ic_delete} alt="ic delete" />
                <p className="text-[14px] text-[#A53F2D]">Delete all</p>
              </Fragment>
            )}
          </div>
        </div>
        <div
          ref={refBetSlipItemZone}
          className={`mb-[24px] relative flex flex-col gap-[16px] overflow-auto`}
        >
          <div className=" w-full flex flex-col gap-[16px]">
            {slips.length ? (
              slips.map((item, index) => (
                <div key={item.key}>
                  <BetSlipItem key={item.key} item={item} index={index} />
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center py-[24px] gap-[16px] items-center bg-[#1B1F24] rounded-[8px] h-full">
                <img src={IconsList.ic_empty} width={"64px"} />
                <p className="text-[14px] text-center text-[#6F6F6F]">
                  {t("bet-slip-infor.empty-bet-slips")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="p-[12px] bg-[#1B2024] rounded-lg mb-[24px]">
          {bonusInfo && bonusInfo.BonusRate > 1 && (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-[4px]">
                <p className="text-white text-[14px] font-normal">
                  {t("bet-slip-infor.bonus-dividend")}
                </p>
                <img src={IconsList.ic_info} />
              </div>
              <p className="text-white text-[14px] font-normal">
                {bonusInfo.BonusRate}
              </p>
            </div>
          )}
          <Divider className="bg-[#323437] my-[12px]" />

          <div className="flex flex-row justify-between items-center">
            <p className="text-white text-[14px] font-normal">
              {t("bet-slip-infor.amount-held")}
            </p>
            <p className="text-white text-[14px] font-normal">
              {formatcurrency(userInfo.balance)}
            </p>
          </div>
          {/* <div className="flex flex-row justify-between items-center">
          <p className="text-white text-[14px] font-normal">배당율:</p>
          <p className="text-white text-[14px] font-normal">0</p>
        </div> */}
          {/* {bonusInfo && bonusInfo.BonusRate > 1 && (
          <>
            <Divider className="bg-[#323437] my-[12px]" />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-[4px]">
                <p className="text-white text-[14px] font-normal">
                  보너스배당:
                </p>
                <img src={IconsList.ic_info} />
              </div>
              <p className="text-white text-[14px] font-normal">
                {bonusInfo.BonusRate}
              </p>
            </div>
          </>
        )} */}
          <Divider className="bg-[#323437] my-[12px]" />
          <div className="flex flex-row justify-between items-center">
            <p className="text-white text-[14px] font-normal">
              {t("bet-slip-infor.total-odds")}
            </p>
            <p className="text-white text-[14px] font-normal">
              {handleBetSum()}
            </p>
          </div>
          <Divider className="bg-[#323437] my-[12px]" />
          <div className="flex flex-row justify-between items-center">
            <p className="text-white text-[14px] font-normal">
              {t("bet-slip-infor.expected-win-amount")}
            </p>
            <p className="text-white text-[14px] font-normal">
              {formatcurrency(
                Number((100 * (handleBetSum() * totalPrice).toFixed(3)) / 100)
              )}
            </p>
          </div>
          <Divider className="bg-[#323437] my-[12px]" />
          <div className="flex flex-row justify-between items-center">
            <p className="text-white text-[14px] font-normal">
              {t("bet-slip-infor.bet-amount")}
            </p>
            <p className="text-white text-[14px] font-normal">
              {formatcurrency(totalPrice)}
            </p>
          </div>
          <div className="bg-[#0A0E14] rounded-[4px] flex flex-row justify-between items-center p-[1px] pr-[4px] mt-[8px] dark:bg-neutral/800">
            <Input
              placeholder="Price"
              variant="borderless"
              type="text"
              onChange={handleSavePrice}
              min={0}
              value={totalPrice}
              className="flex-1 text-end text-white"
              onKeyPress={(event) => validate(event)}
            />
            <img
              src={IconsList.ic_close}
              className="cursor-pointer dark:filter dark:brightness-0 dark:invert dark:grayscale"
              onClick={handleDefaultPrice}
            />
            <div className="h-[16px] w-[2px] bg-neutral/200 mx-[8px]" />
            <CommonButton
              bgColor="#FFFFFF14"
              textColor="white"
              style={{
                boxShadow: "unset",
                height: "100%",
                borderRadius: "2px",
              }}
              onClick={handleMaxPrice}
              classname="dark:bg-neutral/900 dark:!text-white dark:lg:hover:!text-neutral/900"
            >
              {t("bet-slip-infor.max")}
            </CommonButton>
          </div>
          <div className="flex flex-row gap-[8px] flex-wrap mt-[8px]">
            {PRICES.map((price, index) => (
              <CommonButton
                bgColor="#0A0E14"
                textColor="white"
                key={index + "price"}
                onClick={() => handleSmartPrice(price)}
                classname="dark:bg-neutral/800 dark:!text-white dark:hover:!text-neutral/800"
              >
                {formatcurrency(price)}
              </CommonButton>
            ))}
          </div>
        </div>
        <Button
          className={clsx("w-full ml-auto group h-[48px]")}
          disabled={isLoading}
          onClick={sendBetting}
        >
          <span className="flex items-center justify-center w-full h-[48px] gap-2 rounded-[8px] [transition:all_0.5s,_color_0.3s_0.3s,_transform_0.3s] group-hover:[box-shadow:16em_0_0_0_#0A0E14_inset,_-16em_0_0_0_#0A0E14_inset]">
            {isLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 14, color: "white" }}
                    spin
                  />
                }
              />
            ) : (
              <span>{t("bet-slip-infor.place-a-bet")}</span>
            )}

            {/* {isLoading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 14, color: "white" }}
                  spin
                />
              }
            />
          ) : (
            베팅하기
          )} */}
          </span>
        </Button>
      </div>
    </>
  );
}

export default BetSlips;

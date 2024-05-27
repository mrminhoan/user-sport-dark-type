import CommonButton from "@/components/common/Button";
import { IconsList } from "@/components/common/Icons";
import { Popconfirm } from "antd";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ButtonActionBetting = ({ row }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfos);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const BetItems = JSON.parse(row.BetItems);
  const BetItemInfo = BetItems?.length
    ? JSON.parse(BetItems[0].BetItemInfo)
    : {};

  const { Fixture } = BetItemInfo;
  const { afterbet, beforestart } = userInfo.limit;
  const currentDate = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  const createDate = moment(row?.CreateDate.replace("Z", "")).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const beforeStart10Minute = moment(
    Fixture?.StartDate.replace("Z", "")
  ).subtract(beforestart, "minutes");
  const currentDistanceWithCreateDate = moment(currentDate).diff(
    moment(createDate),
    "minutes"
  );
  const currentDistanceWithBeforeStart =
    moment(currentDate).isSameOrAfter(beforeStart10Minute);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleActionBettingHistory = (type, BetID) => {
    setConfirmLoading(true);
    let payload = {};
    switch (type) {
      case TYPE.delete:
        payload = {
          msgtype: "reqbetdel",
          BetID: BetID,
        };
        break;

      case TYPE.cancel:
        payload = {
          msgtype: "reqbetcancel",
          BetID: BetID,
        };
        break;
      default:
        return;
    }

    dispatch({
      type: "SEND_WEBSOCKET_MESSAGE",
      payload,
    });

    setConfirmLoading(false);
    setOpen(false);
  };

  const TYPE = {
    cancel: t("betting-history.column-title.cancellation"),
    delete: t("betting-history.column-title.delete"),
  };

  return (
    <Fragment>
      {(currentDistanceWithCreateDate >= afterbet ||
        currentDistanceWithBeforeStart) &&
      !row.BetResult ? null : (
        <Popconfirm
          title={
            <div className="flex flex-row items-center mr-[16px] mb-[16px]">
              <img
                src={IconsList.ic_warning_circle}
                className="mr-[5px] h-[16px] w-[16px]"
              />
              <p className="text-[14px] text-white whitespace-nowrap">
                {!row.BetResult ? t("betting-history.column-title.are-you-sure-to-cancel") : t("betting-history.column-title.are-you-sure-to-delete")}
              </p>
            </div>
          }
          icon={null}
          open={open}
          onConfirm={() =>
            handleActionBettingHistory(
              !row.BetResult ? TYPE.cancel : TYPE.delete,
              row.BetID
            )
          }
          okButtonProps={{
            loading: confirmLoading,
            className: "text-[12px] font-semibold bg-[#689CF8]  ",
            size: "medium",
          }}
          onCancel={handleCancel}
          cancelButtonProps={{
            className: "text-[12px] font-semibold bg-[#F3F4F6] ",
            size: "medium",
          }}
          placement="right"
        >
          <CommonButton
            bgColor={
              !row.BetResult
                ? "linear-gradient(267.99deg, #9F72FF 0%, #4DB8FF 100%)"
                : "#d45348"
            }
            textColor="white"
            size={"medium"}
            onClick={() => showPopconfirm()}
          >
            {!row.BetResult ? TYPE.cancel : TYPE.delete}
          </CommonButton>
        </Popconfirm>
      )}
    </Fragment>
  );
};

export default ButtonActionBetting;

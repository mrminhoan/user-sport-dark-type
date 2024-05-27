import { IconsList } from "@/components/common/Icons";
import { message, Modal, Table, Tabs } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { formatcurrency, setUTCSumTimeZone } from "@/lib/functions";
import CommonButton from "@/components/common/Button";
// import TrendingFlatIcon from "@/components/Icons/TrendingFlatIcon";
import BettingDetailTable from "./BettingDetailTable";
import ButtonActionBetting from "./ButtonActionBetting";
import TrendingFlatIcon from "@/components/Icons/TrendingFlatIcon";
import { useTranslation } from "react-i18next";

const BettingHistoryModal = () => {
  const { t, i18n } = useTranslation();

  const LIST_SELECT_RANGE_DATE = [
    {
      label: <p className="text-white">{t("betting-history.a-month-ago")}</p>,
      key: 1,
      Children: <p>한달 전</p>,
    },
    {
      label: <p className="text-white">{t("betting-history.a-week-ago")}</p>,
      key: 2,
      Children: <p>일주일 전</p>,
    },
    {
      label: <p className="text-white">{t("betting-history.yesterday")}</p>,
      key: 3,
      Children: <p>어제</p>,
    },

    {
      label: <p className="text-white">{t("betting-history.today")}</p>,
      key: 4,
      Children: <p>오늘</p>,
    },
  ];

  const { betList, userInfo, betListRefreash } = useSelector(
    (state) => state.userInfos
  );

  const [page, setPage] = useState(1);
  const [currentTabKey, setCurrentTabKey] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchDate, setSearchDate] = useState({
    searchDateFrom: moment().utc().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    searchDateTo: moment().utc().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
  });

  const isMobileScreen = useMediaQuery({ query: "(max-width: 590px" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (openModal) handleChangeSearchTabs(currentTabKey);
  }, [betListRefreash]);

  const columns = [
    {
      title: "TxnID",
      dataIndex: "TxnId",
      key: "TxnId",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 text-white">TxnID:</p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {text}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.combination"),
      dataIndex: "BetItems",
      key: "BetItems",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
            {t("betting-history.column-title.combination")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {JSON.parse(text).length}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.betting-time"),
      dataIndex: "CreateDate",
      key: "CreateDate",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 text-white">
            {t("betting-history.column-title.betting-time")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {setUTCSumTimeZone(text, userInfo.timezone, "YY.MM.DD HH:mm:ss")}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.betting-amount"),
      dataIndex: "BetMoney",
      key: "BetMoney",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 text-white">
            {t("betting-history.column-title.betting-amount")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {formatcurrency(text)}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.expected-winning-amount"),
      dataIndex: "ExHitMoney",
      key: "ExHitMoney",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
            {t("betting-history.column-title.expected-winning-amount")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {`${formatcurrency(text)}`}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.winning-dividend"),
      dataIndex: "HitRate",
      key: "HitRate",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
            {t("betting-history.column-title.winning-dividend")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {Number(text).toFixed(2)}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.bonus-dividend"),
      dataIndex: "BonusInfo",
      key: "BonusInfo",
      align: "center",
      render: (text) => {
        let BonusRate = JSON.parse(text)?.BonusInfo?.BonusRate;

        return (
          <div>
            <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
              {t("betting-history.column-title.bonus-dividend")}:
            </p>
            <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
              {BonusRate && BonusRate > 1 ? Number(BonusRate).toFixed(2) : 0}
            </p>
          </div>
        );
      },
    },
    {
      title: t("betting-history.column-title.total-winning-odds"),
      dataIndex: "TotalRate",
      key: "TotalRate",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
            {t("betting-history.column-title.total-winning-odds")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {Number(text).toFixed(2)}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.winning-amount"),
      dataIndex: "HitMoney",
      key: "HitMoney",
      align: "center",
      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
            {t("betting-history.column-title.winning-amount")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-dark-yellow/dark-yellow text-[#60AA63]">
            {`${formatcurrency(text)}`}

          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.betting-result"),
      dataIndex: "BetResult",
      key: "BetResult",
      align: "center",
      render: (text) => {
        let disText = "";
        let bgColor = "";
        if (text == 0) {
          disText = t("betting-history.column-title.proceeding");
          bgColor = "#689CF8";
        } else if (text == 1) {
          disText = t("betting-history.column-title.win");
          bgColor = "#019326";
        } else if (text == 2) {
          disText = t("betting-history.column-title.lose");
          bgColor = "#D45348";
        } else if (text == 3) {
          disText = t("betting-history.column-title.enemy");
          bgColor = "#E8AA3B";
        } else if (text == 4) {
          disText = t("betting-history.column-title.cancellation");
          bgColor = "#D45348";
        }
        return (
          <div>
            <p className="text-[10px] text-neutral/500 whitespace-nowrap text-white">
              {t("betting-history.column-title.betting-result")}:
            </p>
            <p
              className={`sm:text-[14px] text-[12px] text-white rounded  text-center px-[2px] whitespace-nowrap`}
              style={{ background: bgColor }}
            >
              {disText}
            </p>
          </div>
        );
      },
    },
    {
      title: t("betting-history.column-title.processing-time"),
      dataIndex: "CalculateDate",
      key: "CalculateDate",
      align: "center",

      render: (text) => (
        <div>
          <p className="text-[10px] text-neutral/500 text-white">
            {t("betting-history.column-title.processing-time")}:
          </p>
          <p className="sm:text-[14px] text-[12px] text-neutral/700 text-white ">
            {!text
              ? "-"
              : setUTCSumTimeZone(text, userInfo.timezone, "YY.MM.DD HH:mm:ss")}
          </p>
        </div>
      ),
    },
    {
      title: t("betting-history.column-title.action"),
      dataIndex: "action",
      key: "action",
      align: "center",

      render: (_, row) => <ButtonActionBetting row={row} />,
    },
  ];

  const handleChangeSearchTabs = (key) => {
    const searchDateFrom = moment()
      .utc()
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    const searchDateTo = moment()
      .utc()
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    let searchDate = {};

    if (key == 1) {
      // 한달 전
      searchDate = {
        searchDateFrom: moment()
          .subtract(1, "months")
          .utc()
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        searchDateTo,
      };
    } else if (key == 2) {
      // 일주일 전
      searchDate = {
        searchDateFrom: moment()
          .subtract(7, "days")
          .utc()
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        searchDateTo,
      };
    } else if (key == 3) {
      // 어제
      searchDate = {
        searchDateFrom: moment()
          .subtract(1, "days")
          .utc()
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        searchDateTo,
      };
    } else if (key == 4) {
      searchDate = {
        searchDateFrom,
        searchDateTo,
      };
    }

    setPage(1);
    setSearchDate({
      ...searchDate,
    });
    setCurrentTabKey(key);
    dispatch({
      type: "SEND_WEBSOCKET_MESSAGE",
      payload: {
        msgtype: "reqbethistory",
        pageNo: 1,
        PageSize: 10,
        BetResult: -1,
        searchDateFrom: searchDate.searchDateFrom,
        searchDateTo: searchDate.searchDateTo,
      },
    });
  };

  const handleChangePage = (page) => {
    setPage(page);
    dispatch({
      type: "SEND_WEBSOCKET_MESSAGE",
      payload: {
        msgtype: "reqbethistory",
        pageNo: page,
        PageSize: 10,
        BetResult: -1,
        searchDateFrom: searchDate.searchDateFrom,
        searchDateTo: searchDate.searchDateTo,
      },
    });
  };

  const handleToggle = () => {
    if (!openModal) {
      dispatch({
        type: "SEND_WEBSOCKET_MESSAGE",
        payload: {
          msgtype: "reqbethistory",
          pageNo: page,
          PageSize: 10,
          BetResult: -1,
          searchDateFrom: searchDate.searchDateFrom,
          searchDateTo: searchDate.searchDateTo,
        },
      });
    }
    setOpenModal((prev) => !prev);
  };

  const handleSelect = (record, selected) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.BetID]);
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.BetID);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const handleSelectAll = () => {
    setSelectedRowKeys(() => betList?.data?.map((r) => r.BetID));
  };

  const handleDeselectAll = () => {
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    type: "checkbox",
    fixed: true,
    onSelect: handleSelect,
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <TrendingFlatIcon className="mt-1 rotate-180" />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <TrendingFlatIcon className="mt-1" />
        </a>
      );
    }
    return originalElement;
  };

  return (
    <Fragment>
      <div
        className="flex flex-row items-center gap-[4px] cursor-pointer"
        onClick={handleToggle}
      >
        <p className="text-[14px] max-sm:text-[12px] text-white">
          {t("header.betting-details")}
        </p>
      </div>
      <Modal
        centered
        title={
          <p className="text-[24px] text-center bg-transparent pb-[32px] text-white">
            {t("betting-history.column-title.betting-details")}
          </p>
        }
        className="modalBetting bg-[#1B2024] dark:bg-neutral/900 rounded-[16px]"
        open={openModal}
        onOk={handleToggle}
        onCancel={handleToggle}
        footer={false}
        width={isMobileScreen ? "100vw" : "100%"}
        styles={{
          content: {
            backgroundColor: "transparent",
            height: "90vh",
            width: isMobileScreen ? "unset" : "100%",
            display: "flex",
            flexDirection: "column",
            ...(isMobileScreen && {
              padding: "10px",
            }),
          },
        }}
      >
        <div className="modal-betting-history bg-[#23272D] p-[16px]  rounded-[8px] h-full flex-1 flex flex-col dark:bg-neutral/800">
          <Tabs
            defaultActiveKey={4}
            items={LIST_SELECT_RANGE_DATE}
            onChange={handleChangeSearchTabs}
          />
          <div className="flex flex-row justify-between items-center mb-[16px]">
            <CommonButton
              bgColor="linear-gradient(89.35deg, #41AC5A 0.03%, #00858C 99.97%)"
              textColor="white"
              size={"medium"}
              style={{ padding: "0 10px" }}
              onClick={handleSelectAll}
            >
              {t("betting-history.column-title.select-all")}
            </CommonButton>

            <div className="flex flex-row gap-6 items-center">
              <CommonButton
                textColor={selectedRowKeys?.length ? "white" : "#D1D5DB"}
                size={"medium"}
                classname={`text-neutral/300 !border-none ${
                  selectedRowKeys?.length
                    ? "linear-gradient(89.35deg, #41AC5A 0.03%, #00858C 99.97%)] dark:hover:!text-black"
                    : "bg-white dark:bg-neutral/600 pointer-events-none"
                }
                `}
                style={{
                  border: "1px solid #D1D5DB",
                  padding: "0 10px",
                }}
                onClick={handleDeselectAll}
              >
                {t("betting-history.column-title.cancel-selection")}
              </CommonButton>
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            showHeader={false}
            dataSource={betList?.data?.map((item, index) => ({
              ...item,
              key: index + 1,
            }))}
            rowKey={(record) => record.BetID}
            pagination={{
              pageSize: 10,
              total: betList?.totalRowCount || 0,
              current: page,
              onChange: handleChangePage,
              position: ["bottomCenter"],
              showSizeChanger: false,
              itemRender,
            }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <BettingDetailTable record={record} />
              ),
            }}
            className="overflow-auto"
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default BettingHistoryModal;

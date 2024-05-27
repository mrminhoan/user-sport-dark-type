import CommonButton from "@/components/common/Button";
import { IconsList } from "@/components/common/Icons";
import { formatcurrency } from "@/lib/functions";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Select, Space } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfor from "./UserInfor";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import BettingHistoryModal from "../betting_history/BettingHistoryModal";
import { Trans, Translation, useTranslation } from "react-i18next";
import { setCurrentLang } from "@/store/WebStateReducer";
const MENU_LIST_LANGUAGE = [
  {
    value: "ko",
    label: <img src={IconsList.ic_koFlag} />,
  },
  {
    value: "en",
    label: <img src={IconsList.ic_ukFlag} />,
  },
];

function Header() {
  const defaultLang = localStorage.getItem("lang");
  const { t, i18n } = useTranslation();
  const refModalUserInfor = useRef();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userInfos);
  const sportId = useSelector((state) => state.markets.sportId);

  const [searchValue, setSearchValue] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refModalUserInfor.current &&
        !refModalUserInfor.current.contains(event.target)
      ) {
        setIsOpenDropdownUser(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchValue("");
  }, [sportId]);

  const handleOpenDropdown = () => {
    setIsOpenDropdownUser((prev) => !prev);
  };

  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setToggleSearch(false);
    }
  };

  const handleSearchName = () => {
    let payload = {
      msgtype: "reqFixtures",
      gameStatus: "BET",
      searchValue: searchValue,
      start: 0,
      count: 10,
      sportIds: [sportId],
    };
    dispatch({
      type: "SEND_WEBSOCKET_MESSAGE",
      payload,
    });
  };

  const handleKeyUp = () => {
    if (event.keyCode === 13) {
      handleSearchName();
    }
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    dispatch(setCurrentLang(lang));
  };

  const translatedString = t("header.user-infor.betting-cannot-cancel-after", {
    amount: 30,
  });

  const processedString = translatedString.replace(
    "30",
    '<span style="background: green">30</span>'
  );

  return (
    <div className="header fixed z-[100] mx-[40px] top-[20px] left-0 right-0 bg-[#0A0E1466] rounded-[8px] [box-shadow:0px_0px_8px_7px_rgba(96,_170,_99,_0.16)] lg:[box-shadow:2px_4px_8px_0px_rgba(96,_170,_99,_0.16)] dark:bg-neutral/900 max-[1200px]:mx-[16px]">
      {/* <div classname="minhtoan"
      dangerouslySetInnerHTML={{
        __html: `<span>${processedString}</span>`,
      }}
    /> */}

      <div className="container">
        <div className="w-full flex flex-row items-center py-[12px] justify-between select-none max-lg:py-[8px] ">
          <div className="mr-[12px] max-md:mr-[6px] flex-1 relative" ref={ref}>
            <Fragment>
              <div
                className="w-[36px] h-[36px] rounded-full bg-white lg:hidden flex justify-center items-center [box-shadow:0px_1px_12px_0px_rgba(0,_0,_0,_0.05)] cursor-pointer dark:bg-neutral/800"
                onClick={() => setToggleSearch(!toggleSearch)}
              >
                <SearchOutlined />
              </div>

              <div
                className={` pl-[12px] pr-[6px] py-[6px] bg-[#23272D] flex flex-row rounded-[30px] h-[44px] max-w-[640px] max-lg:w-[calc(100vw-100px)] [transition:all_0.3s_ease-in-out] max-lg:absolute top-[calc(100%+10px)] max-lg:-translate-x-1/2 max-lg:opacity-0 max-lg:[box-shadow:0px_1px_12px_0px_rgba(0,_0,_0,_0.05)] 
                dark:bg-neutral/800
                  
                  ${
                    toggleSearch && "max-lg:transform-none max-lg:opacity-100 "
                  } `}
              >
                <SearchOutlined style={{ color: "white" }} />
                <Input
                  placeholder={t("header.input-search.placeholder")}
                  variant="borderless"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onKeyUp={handleKeyUp}
                  className="text-white dark:placeholder:text-neutral-400 dark:text-neutral-50 dark:placeholder:leading-none placeholder:text-white"
                />
                <CommonButton
                  textColor="white"
                  bgColor="#15191F"
                  style={{ height: "100%", borderRadius: "30px" }}
                  onClick={handleSearchName}
                  classname="overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:top-[0] before:left-[0] before:bg-[#374151] before:[transition:transform_0.4s_ease-in-out] before:scale-x-0 before:origin-right min-[1200px]:hover:before:scale-x-100 min-[1200px]:hover:before:origin-left group dark:bg-neutral/900 dark:before:bg-[linear-gradient(267.99deg,_#9F72FF_0%,_#4DB8FF_100%)] dark:hover:!bg-neutral/900 min-w-[90px]"
                >
                  <span className="font-bold relative lg:group-hover:text-white [transition:all_0.3s_ease-in-out] dark:text-white">
                    {t("header.input-search.btn-search")}
                  </span>
                </CommonButton>
              </div>
            </Fragment>
          </div>
          <div className="mr-[10px] max-sm:mr-[6px]">
            {/* <SwitchTheme /> */}
          </div>
          <div className="w-[2px] h-[16px] bg-[#E5E7EB] mx-[16px] max-[1400px]:mx-[8px] max-md:mx-[4px]  max-lg:hidden" />
          <div className="flex flex-row items-center">
            <BettingHistoryModal />

            <div className="w-[2px] h-[16px] bg-[#E5E7EB] mx-[16px] max-[1400px]:mx-[8px] max-md:mx-[4px]  max-lg:hidden" />
            {userInfo.viewtype === "popup" && (
              <>
                <div className="flex flex-row items-center gap-[4px] max-lg:hidden">
                  <Select
                    variant="borderless"
                    defaultValue={defaultLang || "ko"}
                    onChange={(e) => handleChangeLanguage(e)}
                    options={MENU_LIST_LANGUAGE}
                    suffixIcon={
                      <img
                        src={IconsList.ic_expand_more}
                        className="filter brightness-0 invert"
                      />
                    }
                  />
                </div>
                <div className="w-[2px] h-[16px] bg-[#E5E7EB] mr-[16px] max-[1400px]:mx-[8px] max-lg:hidden" />
              </>
            )}
            <Clock timezone={userInfo.timezone} />
            <div className="w-[2px] h-[16px] bg-[#E5E7EB] mx-[16px] max-[1400px]:mx-[8px] max-md:mx-[4px]  max-lg:hidden" />
            <div className="flex flex-row items-center gap-[4px] max-lg:hidden">
              <img
                src={IconsList.ic_clock}
                className="w-[20px] object-contain"
              />
              <p className="text-[14px] text-white">{`GMT ${
                (userInfo.timezone > 0
                  ? "+"
                  : userInfo.timezone < 0
                  ? "-"
                  : "") + userInfo.timezone
              }:00`}</p>
            </div>

            {userInfo.viewtype === "popup" && (
              <>
                <div className="w-[2px] h-[16px] bg-[#E5E7EB] mx-[16px] max-[1400px]:mx-[8px] max-md:mx-[4px] " />
                <div
                  className="flex flex-row items-center gap-[16px] max-md:gap-[8px]"
                  ref={refModalUserInfor}
                >
                  {/* <img src={IconsList.ic_notification} />
                <img src={IconsList.ic_mail} /> */}
                  <div className="flex flex-row gap-[4px]">
                    <p className="text-[18px] font-bold max-md:text-[14px] max-sm:text-[12px] text-white">
                      {formatcurrency(userInfo.balance || 0)}
                    </p>
                    <img
                      src={IconsList.ic_member}
                      className="max-sm:w-[14px]"
                      width={18}
                      height={18}
                    />
                  </div>
                  <UserInfor />
                  <Dropdown
                    trigger={["click"]}
                    className="cursor-pointer"
                    placement="bottomRight"
                    dropdownRender={() => {
                      const { afterbet, beforestart } = userInfo.limit;
                      const {
                        maxbet,
                        minbet,
                        maxwin,
                        minfolder,
                        maxfolder,
                        maxrate,
                      } = userInfo.limit.prematch;

                      return (
                        <div className="flex flex-col items-center gap-[4px] px-[24px] pt-[12px] pb-[24px] bg-[#1B1F24] [box-shadow:2px_4px_8px_0px_rgba(96,_170,_99,_0.16)] lg:w-[350px] rounded mt-[10px] dark:bg-[#142035] dark:[box-shadow:0px_4px_10px_9px_rgba(0,_0,_0,_0.33)]">
                          <div className="flex flex-row justify-between items-center w-full mb-[12px]">
                            <p className="text-[16px] font-bold text-white">
                              {t("header.user-infor.free-match")}
                            </p>
                            <img
                              src={IconsList.ic_close_circle}
                              className="cursor-pointer"
                              onClick={handleOpenDropdown}
                            />
                          </div>
                          <div className="flex flex-col gap-[8px] w-full mb-[16px]">
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.minimum-bet-amount")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(minbet)}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.maximum-bet-amount")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(maxbet)}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.maximun-win-amount")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(maxwin)}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.minimum-folder")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(minfolder)}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.maximum-folder")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(maxfolder)}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white  py-[8px] rounded-[4px] text-[#9CA3AF]">
                              <p className="text-[14px] font-normal">
                                {t("header.user-infor.maximum-dividend")}
                              </p>
                              <p className="text-[14px] font-bold text-white">
                                {formatcurrency(maxrate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-[8px] w-full">
                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white py-[8px] rounded-[4px] text-white">
                              <p className="text-[14px] font-normal">
                                {/* 베팅{" "}
                                <span className="font-bold text-dark-yellow/dark-yellow text-[#60AA63]">
                                  {afterbet}분
                                </span>{" "}
                                이후 취소불가 */}
                                {t(
                                  "header.user-infor.betting-cannot-cancel-after",
                                  { amount: afterbet }
                                )}
                              </p>
                            </div>

                            <div className="flex flex-row justify-between items-center w-full  dark:bg-neutral/700 dark:text-white py-[8px] rounded-[4px] text-white">
                              <p className="text-[14px] font-normal">
                                {/* 게임시작{" "}
                                <span className="font-bold text-dark-yellow/dark-yellow text-[#60AA63]">
                                  {beforestart}분
                                </span>{" "}
                                전 취소불가 */}

                                {t(
                                  "header.user-infor.cancellation-is-not-possible-before-the-game-starts",
                                  { amount: beforestart }
                                )}
                              </p>
                              {/* <p className="text-[14px] font-bold text-dark-yellow/dark-yellow">
                              {beforestart}분
                            </p> */}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                    open={isOpenDropdownUser}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenDropdown();
                      }}
                    >
                      <Space>
                        <p className="text-[14px] font-medium max-sm:text-[12px] text-white">
                          {userInfo.username}
                        </p>
                        <img
                          src={IconsList.ic_expand_more}
                          className="filter brightness-0 invert"
                        />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}

export default Header;

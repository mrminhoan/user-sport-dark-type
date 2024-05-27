import { IconsList } from "@/components/common/Icons";
import React, { useEffect, useRef, useState } from "react";
import { LIST_MAIN_MENU } from "@/lib/constants";
import SubMenu from "./SubMenu";
import SlideToggle from "@/components/ui/slideToggle";
import { useTranslation } from "react-i18next";

function SidebarPC({ sports, handleSelectSport }) {
  const subMenuRef = useRef(null);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [idSportSelected, setIdSportSelected] = useState(null);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const SportListDataMap = sports?.map((sport) => {
    return {
      title: t(`sport-list.${sport?.Name}`),
      icon: LIST_MAIN_MENU?.find((element) => element?.Id == sport?.Id)?.icon,
      count: sport?.count,
      id: sport?.Id,
      subItems: [
        {
          title: "International",
          icon: IconsList.ic_international,
          count: 78,
        },
        {
          title: "England",
          icon: IconsList.ic_flag_england,
          count: 28,
        },
      ],
    };
  });

  const onBtnSport = (id, sport) => {
    if (idSportSelected == id) return setIdSportSelected(null);

    setIdSportSelected(id);
    handleSelectSport(id, sport);
  };

  useEffect(() => {
    onBtnSport(0);
  }, []);

  return (
    <div className="relative w-[48px]">
      <div
        className={`${
          isOpenSideBar ? "w-[240px]" : "w-[64px] "
        } fixed bg-[rgba(9,_14,_21,_0.64)] backdrop-filter backdrop-blur-md py-[16px] z-[99] h-full [transition:width_.2s]`}
      >
        <button
          className={`p-[6px] bg-bg2 w-[fit-content] rounded-[50%] absolute -right-[-5px] -top-[-4px] `}
          onClick={() => setIsOpenSideBar(!isOpenSideBar)}
        >
          {!isOpenSideBar ? (
            <img src={IconsList.ic_open_side_bar} alt="ic" />
          ) : (
            <img src={IconsList.ic_close_side_bar} alt="ic" />
          )}
        </button>

        {/* Content SideBar */}
        <div
          className="[filter:drop-shadow(0_10px_10px_rgba(0,_0,_0,_0.2))] mt-3"
          style={{
            height: "max-content",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "scroll",
            overscrollBehavior: "smooth",
          }}
        >
          <ul className="flex flex-col gap-[16px] py-[16px] text-white">
            {SportListDataMap?.map((sport, index) => {
              return (
                <li key={index} className="">
                  <SlideToggle
                    title={
                      <button
                        className={`flex w-full items-center p-[8px] border-l-[4px]  border-[transparent] relative ${
                          idSportSelected == sport?.id
                            ? " !border-green/green"
                            : ""
                        } `}
                        onClick={() => onBtnSport(sport?.id, sport)}
                      >
                        <img
                          src={sport.icon}
                          alt="ic"
                          className="w-[24px] block"
                        />
                        {isOpenSideBar && (
                          <div className="flex flex-1 justify-between ml-[8px]">
                            <p>{sport.title}</p>
                            <div className="flex">
                              <p>({sport?.count}+)</p>
                            </div>
                          </div>
                        )}
                        {!isOpenSideBar && !!sport?.count && (
                          <div className="absolute rounded-[9px] bg-[#60AA63] px-[5px] top-1 right-[-5px]">
                            <p className="text-[8px]">
                              {sport?.count > 99 ? "99" : sport?.count}+
                            </p>
                          </div>
                        )}
                      </button>
                    }
                    close={true}
                    index={index}
                    selected={selected}
                    setSelected={setSelected}
                    icon={
                      sport?.subItems &&
                      sport?.subItems?.length && (
                        <img src={IconsList.ic_arrow_drop_down} alt="ic" />
                      )
                    }
                  >
                    {sport?.subItems && (
                      <div className="px-[8px] pt-[16px]">
                        <SubMenu
                          subItems={sport?.subItems}
                          isOpenSideBar={isOpenSideBar}
                          ref={subMenuRef}
                        />
                      </div>
                    )}
                  </SlideToggle>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarPC;

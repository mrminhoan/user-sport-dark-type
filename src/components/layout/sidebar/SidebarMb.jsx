import { IconsList } from "@/components/common/Icons";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "@/components/SwtichButton/index.jsx";
import { LIST_MAIN_MENU, SportDataMock } from "@/lib/constants";
import SubMenu from "./SubMenu";
import SlideToggle from "@/components/ui/slideToggle";
import { useTranslation } from "react-i18next";

function SidebarMb({ sports, handleSelectSport }) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [idSubMenu, setIdSubMenu] = useState([]);
  const [idSportSelected, setIdSportSelected] = useState(null);
  const [selected, setSelected] = useState(null);
  const subMenuRef = useRef(null);
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

  const handleOpenSubMenu = (id, subItems) => {
    if (!subItems || !subItems?.length) return;
    let cloneListIdSubMenu = [...idSubMenu];
    if (cloneListIdSubMenu.includes(id)) {
      cloneListIdSubMenu = cloneListIdSubMenu.filter((item) => item !== id);
    } else {
      cloneListIdSubMenu.push(id);
    }
    setIdSubMenu(cloneListIdSubMenu);
  };

  const onBtnSport = (id, sport) => {
    if (idSportSelected == id) return setIdSportSelected(null);

    setIdSportSelected(id);
    handleSelectSport(id, sport);
  };

  useEffect(() => {
    onBtnSport(0);
  }, []);

  return (
    <>
      <button
        className={`w-[35px] h-[35px] p-[6px] bg-bg2  rounded-[50%] absolute -right-[10px] bottom-[20px] left-[20px] z-[100]`}
        onClick={() => setIsOpenSideBar(!isOpenSideBar)}
      >
        <img src={IconsList.ic_open_side_bar} alt="ic" className="w-full" />
      </button>

      <div
        className={`[transition:transform_.4s] ${
          isOpenSideBar ? "transform-none" : "transform translate-x-[-100px]"
        } z-[99]`}
      >
        <div
          className={`${
            isOpenSideBar ? "w-[240px]" : "w-[48px] "
          } fixed bg-[rgba(9,_14,_21,_0.64)] backdrop-filter backdrop-blur-md  py-[16px]  h-screen max-h-full overflow-scroll [transition:width_.2s]`}
        >
          {/* <div className="px-[8px]">
            <ToggleButton collapsed={isOpenSideBar} headerTab={"주요경기"} />
          </div> */}

          {/* Content SideBar */}
          <div className="">
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
    </>
  );
}

export default SidebarMb;

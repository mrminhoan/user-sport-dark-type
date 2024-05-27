import { setSportSelected, setTabSelected } from "@/store/WebStateReducer";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import SidebarMb from "./SidebarMb";
import SidebarPC from "./SidebarPc";
import { useTranslation } from "react-i18next";

function SideBar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const SportReducer = useSelector((state) => state.markets.sportsList);
  const MenuSports = useMemo(() => {
    let cloneMenu = SportReducer.data;
    if (cloneMenu)
      cloneMenu = [
        {
          Id: "0",
          Name: "All",
          count: SportReducer?.totalCount,
        },
        ...cloneMenu,
      ];
    return cloneMenu;
  }, [SportReducer.data]);

  const handleSelectSport = (id, sport) => {
    dispatch(setTabSelected(sport));
    dispatch(setSportSelected(id));
    dispatch({
      type: "SEND_WEBSOCKET_FIXTURES",
      payload: {
        msgtype: "reqFixtures",
        gameStatus: "BET",
        start: 0,
        count: 10,
        sportIds: [id],
      },
    });
  };

  return (
    <>
      {SportReducer?.data ? (
        <>
          {isMediumScreen ? (
            <SidebarMb
              sports={MenuSports}
              handleSelectSport={handleSelectSport}
            />
          ) : (
            <SidebarPC
              sports={MenuSports}
              handleSelectSport={handleSelectSport}
            />
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default SideBar;

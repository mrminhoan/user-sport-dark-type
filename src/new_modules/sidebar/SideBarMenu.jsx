import React, { useState } from "react";
// import "swiper/swiper-bundle.css";
import { LIST_MAIN_MENU } from "@/lib/constants";
import { ArrowRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Tabs } from "antd";
import ToggleButton from "@/components/SwtichButton/_index.jsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import "./style.css";
import { sportListMock, sportDetailMock } from "./dataMock.js";

function SideBarMenu({
  sportsList = [],
  handleSelectSport,
  currentSport = "0",
  headerTab,
}) {
  // const [sportSelected, setSportSelected] = useState("0");
  // const onSelectSport = (id) => {
  // setSportSelected(id);
  // handleSelectSport(id);
  // };
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const dataCollapsed = [...sportsList]?.map((element, index) => {
    return {
      key: element.Id + index,
      icon:
        element.Name !== "All" ? (
          <Badge
            count={element?.count}
            size="small"
            style={{ backgroundColor: "#52c41a" }}
          >
            <img
              src={
                LIST_MAIN_MENU?.find((item) => item?.Id === element?.Id)?.icon
              }
              className="w-[22px]"
              alt={""}
            />
          </Badge>
        ) : (
          <img
            src={LIST_MAIN_MENU?.find((item) => item?.Id === element.Id)?.icon}
            className="w-[22px] h-[22px]"
            alt={""}
          />
        ),
    };
  });
  const subMenu = [...sportDetailMock]?.map((element, index) => {
    return {
      key: element.Id + index,
      icon: (
        <img
          src={LIST_MAIN_MENU?.find((item) => item?.Id === element?.Id)?.icon}
          className="w-[28px]"
          alt={""}
        />
      ),
      label: (
        <span className={"flex justify-between w-full text-white"}>
          <p>{element.Name}</p> <p>({element.count})</p>
        </span>
      ),
    };
  });
  const dataExpand = [...sportsList]?.map((element, index) => {
    return {
      key: element.Id + index,
      icon: (
        <img
          src={LIST_MAIN_MENU?.find((item) => item?.Id === element?.Id)?.icon}
          className="w-[28px]"
          alt={""}
        />
      ),
      label: (
        <span
          className={`flex justify-between ${
            element.Name === "All" ? "w-[70%]" : "w-[60%]"
          } text-white`}
        >
          <p>{element.Name}</p> <p>({element.count})</p>
        </span>
      ),
      children: element.Name !== "All" ? subMenu : "",
    };
  });
  return (
    <div
      className={`side-bar-menu opacity-90 ${
        !collapsed ? "w-12" : "w-[240px]"
      } z-10 absolute bg-[#001529] shadow-md rounded-[20px] h-full`}
    >
      <ToggleButton collapsed={collapsed} headerTab={headerTab} />
      <Button
        size={"small"}
        type={"primary"}
        className={`absolute bg-[#001529] z-20 rounded-full mt-[-6px] ${
          !collapsed ? "ml-[36px]" : "ml-[226px]"
        }`}
        icon={collapsed ? <ArrowLeftIcon /> : <ArrowRightOutlined />}
        onClick={() => toggleCollapsed()}
      ></Button>
      <Menu
        theme={"dark"}
        defaultActiveKey={["1"]}
        mode={"inline"}
        items={collapsed ? dataExpand : dataCollapsed}
        style={{ paddingInline: "None" }}
        className={`mt-4 ${!collapsed ? "w-12" : "w-[240px]"} h-fit ${
          collapsed ? "collapsed" : "expand"
        }`}
      ></Menu>
    </div>
  );
}

export default SideBarMenu;

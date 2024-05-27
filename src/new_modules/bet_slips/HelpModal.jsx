import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "antd";
import CommonButton from "@/components/common/Button";
import { IconsList } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";
const data = [
  {
    name: "축구",
    icon: IconsList.ic_soccer,
    descriptions: [
      "승무패 x 핸디캡 조합 불가",
      "승무패 x 오버언더 조합 불가",
      "핸디캡 x 오버언더 조합 불가",
    ],
  },
  {
    name: "야구",
    icon: IconsList.ic_baseball,
    descriptions: [
      "승패 x 핸디캡 조합 불가",
      "   승패 x 오버언더 조합 불가",
      "핸디캡 x 오버언더 조합 불가",
    ],
  },
  {
    name: "농구",
    icon: IconsList.ic_basketball,
    descriptions: [
      "승패 x 핸디캡 조합 불가",
      "승패 x 오버언더 조합 불가",
      "핸디캡 x 오버언더 조합 불가",
    ],
  },
];
function HelpModal() {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <div
        className="flex flex-row justify-end items-center gap-[4px] cursor-pointer mb-[1rem]"
        onClick={handleToggle}
      >
        <img src={IconsList.ic_help} alt="ic help" />
        <p className="text-[14px] text-color/sign/blue">{t("help")}</p>
      </div>

      <Modal
        centered
        title={
          <p className="text-[24px] text-center bg-transparent pb-[32px] text-white">
            {t("help-modal.help")}
          </p>
        }
        open={openModal}
        className="modalBetting bg-neutral/1000  rounded-[16px]"
        onCancel={handleToggle}
        footer={
          <div className="flex flex-row justify-center items-center gap-2 mt-[24px]">
            <CommonButton
              bgColor="#08838A"
              size={"large"}
              height={44}
              classname="[transition:all_0.5s,_color_0.3s_0.3s,_transform_0.3s] group-hover:[box-shadow:16em_0_0_0_#0A0E14_inset,_-16em_0_0_0_#0A0E14_inset]"
              style={{ padding: "0 80px" }}
              onClick={handleToggle}
            >
              <span className="relative">{t("help-modal.close")}</span>
            </CommonButton>

            {/* <Button
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
                  <span>베팅하기</span>
                )}
              </span>
            </Button> */}
          </div>
        }
        styles={{
          content: { backgroundColor: "transparent" },
        }}
      >
        <div className="modal-betting-history p-[16px]  rounded-[8px] h-[400px] flex flex-col gap-[16px] bg-neutral/900">
          <p className="text-[16px] font-bold text-white">조합 제한</p>
          <div className="flex flex-col gap-[16px] max-h-[350px] overflow-scroll">
            {data?.map((item, index) => (
              <div className="flex flex-col gap-[4px]" key={index}>
                <div className="flex flex-row gap-[4px]">
                  <img
                    src={item.icon}
                    alt={item.name}
                    width={"16px"}
                    height={"16px"}
                  />
                  <p className="text-[14px] font-semibold text-white">
                    {item.name}
                  </p>
                </div>
                <div>
                  {item.descriptions?.map((description) => (
                    <p
                      className="text-[14px] font-normal text-neutral/700 text-white"
                      key={description}
                    >
                      {description}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HelpModal;

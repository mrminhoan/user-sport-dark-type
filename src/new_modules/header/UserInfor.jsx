import CommonButton from "@/components/common/Button";
import { IconsList } from "@/components/common/Icons";
import { Modal } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";

const UserInfor = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <Fragment>
      <div
        className="w-[40px] h-[40px] rounded-full overflow-hidden max-md:w-[32px] max-md:h-[32px] max-sm:w-[24px] max-sm:h-[24px] cursor-pointer"
      //onClick={handleToggle}
      >
        <img src={IconsList.ic_avatar} className="w-full h-full object-cover" />
      </div>

      <Modal
        centered
        title={
          <p className="text-[24px] text-center bg-[#E5E7EB] mb-[32px]">
            User Information
          </p>
        }
        open={openModal}
        onOk={handleToggle}
        onCancel={handleToggle}
        footer={
          <div className="flex flex-row justify-center items-center gap-2 mt-[24px]">
            <CommonButton
              bgColor="white"
              textColor="black"
              size={"large"}
              height={44}
              classname="overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:top-[0] before:left-[0] before:bg-[#374151] before:[transition:transform_0.9s_ease-in-out] before:scale-x-0 before:origin-right min-[1200px]:hover:before:scale-x-100 min-[1200px]:hover:before:origin-left"
              style={{ padding: "0 80px" }}
            >
              <span className="relative">Cancel</span>
            </CommonButton>
            <CommonButton
              bgColor="linear-gradient(267.99deg, #9F72FF 0%, #4DB8FF 100%)"
              size={"large"}
              height={44}
              classname="overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:top-[0] before:left-[0] before:bg-[#374151] before:[transition:transform_0.9s_ease-in-out] before:scale-x-0 before:origin-right min-[1200px]:hover:before:scale-x-100 min-[1200px]:hover:before:origin-left"
              style={{ padding: "0 80px" }}
            >
              <span className="relative">Save</span>
            </CommonButton>
          </div>
        }
        width={"70%"}
        styles={{
          content: { backgroundColor: "#E5E7EB" },
        }}
      >
        <div className="modal-betting-history bg-white p-[16px]  rounded-[8px] h-[400px]"></div>
      </Modal>
    </Fragment>
  );
};

export default UserInfor;

import CommonButton from "@/components/common/Button";
import { IconsList } from "@/components/common/Icons";
import { useSelector } from "react-redux";

function Error() {
  // const { pageView } = useSelector((state) => state.webState);
  return (
    <div className="relative overflow-hidden">
      <img
        src="/images/background.png"
        className="w-screen h-screen object-cover"
      />
      <div
        className="absolute  top-[50%] left-[50%] text-white"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="flex flex-col lg:flex-row items-center">
          <img src="/assets/images/error.png" style={{ margin: "0 auto" }} />
          <div>
            <p className="text-[40px] text-center">오류가 발생했습니다</p>
            <div
              className="px-[24px] py-[12px] my-[24px] rounded-[8px]"
              style={{
                background: "rgba(107, 182, 249, 0.16)",
              }}
            >
              <p className="text-center text-[24px] text-white font-bold">
                ERROR CODE:
              </p>
            </div>
            <p className="text-center text-neutral/400 mb-[64px]">
              요청한 페이지를 처리하는 중 오류가 발생하였습니다.
              <br />
              이용에 불편을 드려 죄송합니다.
              <br />
              입력하신 주소를 다시 확인하신 후 재시도해 주세요.
              <br />
              <br />
              서비스 재개 시간은 점검상황에 따라 변경될 수 있습니다.
            </p>

            <CommonButton
              bgColor="linear-gradient(89.35deg, #41AC5A 0.03%, #00858C 99.97%)"
              textColor="white"
              size={"large"}
              style={{ margin: "0 auto", width: "100%" }}
              rightComponent={() => <img src={IconsList.ic_arrow_right} />}
              onClick={() => {
                window.location.reload();
              }}
            >
              메인으로
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;

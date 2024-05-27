import { Progress } from "antd";
import { useSelector } from "react-redux";

function Initload() {
  // const { progress } = useSelector((state) => state.webState);

  return (
    <div className="relative overflow-hidden">
      <img
        src="/assets/images/LoadingPage.png"
        className="w-screen h-screen object-cover"
      />
      <div className="relative max-w-[1230px] w-full px-[15px] mx-auto">
        <div className="relative">
          <Progress
            percent={100}
            status="active"
            strokeColor={{ from: "#60AA63", to: "#08838A" }}
            className="absolute w-full bottom-[140px] left-0 right-0 text-center h-[24px] rounded-[16px]"
            showInfo={true}
          />
        </div>
        <p className="absolute bottom-[100px] left-0 right-0 text-center text-[30px] font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Initload;

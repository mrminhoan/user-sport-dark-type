import Dot from "@/components/common/Dot";
import { IconsList } from "@/components/common/Icons";
import useMarkets from "@/hooks/useMarkets";
import { LIST_MAIN_MENU, TYPE_BETTING_CARD } from "@/lib/constants";
import { checkStatus } from "@/lib/functions";
import { deleteBet } from "@/store/BetSlipV2Reducer";
import { Divider } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const BetSlipItem = ({ item, key, index }) => {
  const fixtureKoData = useSelector((state) => state.markets.fixtureKoData);
  const { renderMarket } = useMarkets();
  const dispatch = useDispatch();

  const { fixture, market, bet } = item;
  const { StartDate, Participants } = fixture?.Fixture;
  const SportId = fixture?.Fixture?.Sport?.Id;
  const SPORT = LIST_MAIN_MENU.find((element) => element.Id == SportId);
  const marketName = market?.Name?.toLowerCase();
  const marketNameKo = market?.Nameko;
  const marketNameToCompair = `${marketName} ${marketNameKo}`;

  const handleDeleteBet = (betId) => {
    dispatch(deleteBet(betId));
  };

  const checkDisabled =
    (item.fixture && checkStatus(item.fixture.Fixture)) ||
    (bet && checkStatus(bet));

  return (
    <div
      className={`${
        SPORT.className
      } p-[12px] rounded-[8px] border border-solid border-[#ffffff1a] ${
        checkDisabled && "cursor-not-allowed opacity-80"
      }`}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      key={fixture.FixtureId}
    >
      <div className={`flex flex-row items-center justify-between `}>
        <div className="flex flex-row items-center gap-[16px]">
          <img src={SPORT.icon} alt="icon sport" />
          <div className="flex flex-row items-center">
            <p className="text-[14px] font-bold text-white uppercase">
              {moment(StartDate).format("HH:mm a")}
            </p>
            <Dot style={{ margin: "0 8px" }} />
            <p className="text-[14px] font-normal text-white">
              {moment(StartDate).format("DD.MM.YYYY")}
            </p>
          </div>
        </div>
        <img
          src={IconsList.ic_close}
          alt="icon delete"
          className="cursor-pointer"
          onClick={() => handleDeleteBet(bet.Id)}
        />
      </div>

      {Participants?.length && (
        <div className="flex flex-row items-center justify-center gap-[16px] mt-[8px]">
          <div className="flex flex-row gap-[4px] items-center w-[45%] justify-end">
            <p className="text-[14px] font-semibold text-white text-center">
              {Participants[0]?.Nameko || Participants[0]?.Name}
            </p>
            <img src={IconsList.ic_mu} alt="" />
          </div>
          <img src={IconsList.ic_vs} alt="" className="flex-1" />
          <div className="flex flex-row gap-[4px] items-center w-[45%]">
            <img src={IconsList.ic_mu} alt="" />
            <p className="text-[14px] font-semibold text-white text-center">
              {Participants[1]?.Nameko || Participants[1]?.Name}
            </p>
          </div>
        </div>
      )}

      <Divider
        className=" my-[12px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.24)",
        }}
      />
      <div className={`${checkDisabled && "pointer-events-none"}`}>
        {renderMarket({
          fixture: fixture,
          market: market,
          type: TYPE_BETTING_CARD.BETTING_SLIP_ZONE,
          betIdSelected: bet.Id,
          disable: true,
        })}
      </div>

      {checkDisabled && (
        <p className="text-[16px] text-[red] text-center">
          경기가 시작되었습니다.
        </p>
      )}
    </div>
  );
};

export default BetSlipItem;

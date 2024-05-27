import openNotification from "@/components/common/ToastifyNoti";
import { STATUS_FETCHING_DATA } from "@/lib/constants";
import {
  addTotalPrice,
  clearAllBet,
  setLoading,
} from "@/store/BetSlipV2Reducer";
import {
  setBonusFolder,
  setExchangeFixtures,
  setFixturesList,
  setPriceChange,
  setSportsList,
  setCurrentAmountFixtures,
  setStatusFetchingFixtures,
  setExchangeFixturesAll,
  setFixtureKoData,
  setFixtureSelected,
  setStatusBetting,
} from "@/store/MarketReducer";
import {
  deleteBetlist,
  setBetList,
  setBetListRefreash,
  setUserInfo,
  setUserMoney,
  setUserlanguage,
} from "@/store/MemberReducer";
import { setPageView, setProgress } from "@/store/WebStateReducer";
import { isArray, isEmpty } from "lodash";

export const createSocketMiddleware = () => {
  let socket = null;
  let page = 0;
  let progress = 0;
  let updateData = [];

  const onMessage = (store) => (event) => {
    const action = JSON.parse(event.data);

    if (!action.type) {
      if (action.logindata?.login === "success") {
        store.dispatch(setUserInfo(action?.logindata?.userinfo));
        progress += 15;
        store.dispatch(setProgress(progress));
      } else if (action.logindata?.login === "sports_data") {
        store.dispatch(setSportsList(action?.sportsdata));
        progress += 20;
        store.dispatch(setProgress(progress));
      } else if (action.logindata?.login === "fixture_data") {
        if (
          action?.fixturesdata.data &&
          isArray(action?.fixturesdata?.data?.documents) &&
          !isEmpty(action?.fixturesdata?.data?.documents)
        ) {
          store.dispatch(
            setFixtureSelected(action?.fixturesdata.data.documents[0].value)
          );
        }

        store.dispatch(setFixturesList(action?.fixturesdata));
        progress += 20;
        store.dispatch(setProgress(progress));
      } else if (action.logindata?.login === "bonusfolder_data") {
        store.dispatch(setBonusFolder(action?.bonusFolder));
        progress += 20;
        store.dispatch(setProgress(progress));
      } else if (action.logindata?.login === "pricechange_data") {
        store.dispatch(setPriceChange(action?.pricechange));
        progress += 15;
        store.dispatch(setProgress(progress));
        // } else if (action.logindata?.login === "fixture_ko_data") {
        //   store.dispatch(setFixtureKoData(action?.fixtureKoData));
        //   progress += 20;
        //   store.dispatch(setProgress(progress));
      } else if (action.login === "duplicate_login") {
        page = 2;
        store.dispatch(
          setPageView({
            page: 2,
            code: "중복로그인",
          })
        );
      } else if (action.login === "failed") {
        page = 2;
        store.dispatch(
          setPageView({
            page: 2,
            code: "유효하지 않은 TOKEN",
          })
        );
      } else if (action.c) {
        switch (action.c) {
          case "reply_bet":
            if (action.res.status === "ACCEPTED") {
              openNotification({
                type: "open",
                message: "성공",
                description: "베팅되었습니다",
              });

              store.dispatch(clearAllBet());
              store.dispatch(addTotalPrice(0));
              store.dispatch(setUserMoney(action?.res?.balance || 0));
            } else
              openNotification({
                type: "open",
                message: "경고",
                description: "베팅이 실패했습니다.",
              });

            store.dispatch(setLoading(false));
            store.dispatch(setStatusBetting(STATUS_FETCHING_DATA.SUCCESS));

            break;

          case "reply_bethistory":
            store.dispatch(setBetList(action.res));
            store.dispatch(setLoading(false));

            break;
          case "reply_fixtures":
            store.dispatch(setFixturesList(action.res));
            if (
              action?.res.data &&
              isArray(action?.res?.data?.documents) &&
              !isEmpty(action?.res?.data?.documents)
            ) {
              store.dispatch(
                setFixtureSelected(action?.res.data.documents[0].value)
              );
            }
            store.dispatch(
              setStatusFetchingFixtures(STATUS_FETCHING_DATA.SUCCESS)
            );
            break;
          case "reply_betdel":
            if (action?.res?.status === STATUS_FETCHING_DATA.SUCCESS) {
              store.dispatch(deleteBetlist(action?.res?.BetID));
            }
            break;
          case "reply_betcancel":
            if (action?.res?.status === STATUS_FETCHING_DATA.SUCCESS) {
              store.dispatch(setBetListRefreash());
            }
            break;
          case "MESSAGE_BALANCE":
            store.dispatch(setUserMoney(action?.res?.balance || 0));
            break;

          default:
            break;
        }
      } else {
        // 경기 업데이트 정보
        let updateGameInfo = null;
        if (action.Events) {
          updateGameInfo = action.Events;
        } else {
          updateGameInfo = action;
        }

        if (updateGameInfo[0]?.Fixture) {
          store.dispatch(setFixtureKoData(updateGameInfo));
        }

        store.dispatch(setExchangeFixtures(updateGameInfo));
      }
    } else {
      store.dispatch(action);
    }
  };

  const extractTokenFromQuery = () => {
    let strSearch = window.location.search;
    let spos = strSearch.indexOf("token=") + 6;
    let epos = strSearch.indexOf("&");
    epos = epos === -1 ? strSearch.length : epos;
    let token = strSearch.substring(spos, epos);
    return token;
  };

  const getQueryParams = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(param);
    return value;
  };

  return (store) => (next) => (action) => {
    switch (action.type) {
      case "CONNECT_WEBSOCKET":
        if (socket !== null) {
          socket.close();
        }

        // WebSocket 연결
        socket = new WebSocket(import.meta.env.VITE_GAMESERVERIP);

        // 메시지 수신 시 처리
        socket.onopen = () => {
          let token = extractTokenFromQuery();
          let langs = getQueryParams("langs");
          if (langs && langs !== "") {
            store.dispatch(setUserlanguage(langs));
          }
          if (!token || token === "") {
            token = {
              vendor_id: 6,
              vendor_name: "vincent",
              user_idx: 189,
              vendor_user_idx: 1,
              user_id: "vvip11",
              user_name: "vvip11",
              user_ip: "127.0.0.1",
              currency: "KRW",
              lang: "ko",
              impl_type: "S",
              timezone: 9,
              limit: {
                prematch: {
                  minbet: 1000,
                  maxbet: 1000000,
                  maxwin: 10000000,
                  minfolder: 1,
                  maxfolder: 10,
                  maxrate: 100,
                },
                inplay: {
                  minbet: 1000,
                  maxbet: 1000000,
                  maxwin: 10000000,
                },
                afterbet: 30,
                beforestart: 10,
              },
              device: "desktop",
            };
          }

          socket.send(
            JSON.stringify({
              msgtype: "reqlogin",
              data: {
                access: "WEB",
                token: token,
              },
            })
          );

          progress += 10;
          store.dispatch(setProgress(progress));
          const interval = setInterval(() => {
            if (progress < 100) {
              //progress += 1;
              store.dispatch(setProgress(progress));
            } else {
              clearInterval(interval);
              page = 1;
              store.dispatch(
                setPageView({
                  page: 1,
                  code: "main",
                })
              );
            }
          }, 500);

          // const updateInterval = setInterval(() => {
          //   const updateDataClone = [...updateData];
          //   let idx = updateDataClone.length;
          //   store.dispatch(setExchangeFixturesAll(updateDataClone));
          //   updateData = updateData.slice(idx)
          // }, 3000);
        };

        socket.onclose = () => {
          if (page !== 2) {
            page = 2;
            store.dispatch(
              setPageView({
                page: 2,
                code: "통신오류",
              })
            );
          }
        };
        socket.onmessage = onMessage(store);

        break;
      case "DISCONNECT_WEBSOCKET":
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case "SEND_WEBSOCKET_MESSAGE":
        if (socket.readyState === socket.OPEN) {
          store.dispatch(setLoading(true));
          socket.send(JSON.stringify(action.payload));
        } else {
          page = 2;
          store.dispatch(
            setPageView({
              page: 2,
              code: "통신오류",
            })
          );
        }
        break;

      case "SEND_WEBSOCKET_FIXTURES":
        store.dispatch(setStatusFetchingFixtures(STATUS_FETCHING_DATA.LOADING));
        socket.send(JSON.stringify(action.payload));
        break;
      default:
        return next(action);
    }
  };
};

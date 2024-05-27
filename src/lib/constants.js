import { IconsList } from "@/components/common/Icons";

export const cardBG = {
  6046: "bg-gradient-to-r to-indigo-800 from-green-500", // Football
  154914: "bg-gradient-to-r to-indigo-800 from-red-500", // Baseball
  48242: "bg-gradient-to-r to-indigo-800 from-orange-500", // Basketball
  131506: "bg-gradient-to-r to-indigo-800 from-purple-500", // American Football
  687890: "bg-gradient-to-r to-sky-950 to from-green-500", // E-games
  35232: "bg-gradient-to-r to-indigo-800 from-gray-500", // Hockey
  154830: "bg-gradient-to-r to-indigo-800 from-yellow-500 ", // Volleybal
};

export const LIST_MAIN_MENU = [
  {
    Id: "0",
    icon: IconsList.ic_all,
    className: "bg-all",
    name: "All",
  },
  {
    Id: "6046",
    icon: IconsList.ic_soccer,
    className: "bg-soccer",
    name: "Soccer",
  },
  {
    Id: "154914",
    icon: IconsList.ic_baseball,
    className: "bg-baseball",
    name: "Baseball",
  },
  {
    Id: "48242",
    icon: IconsList.ic_basketball,
    className: "bg-basketball",
    name: "Basketball",
  },
  {
    Id: "154830",
    icon: IconsList.ic_volleyball,
    className: "bg-volleyball",
    name: "Volleyball",
  },
  {
    Id: "35232",
    icon: IconsList.ic_icehockey,
    className: "bg-iceHockey",
    name: "Ice Hockey",
  },
  {
    Id: "131506",
    icon: IconsList.ic_acp,
    className: "bg-acp",
    name: "American football",
  },
  {
    Id: "687890",
    icon: IconsList.ic_egame,
    className: "bg-eGame",
    name: "E-Games",
  },
];

export const MARKET_TYPE = {
  "1X2": "1x2",
  "승무패": "승무패",
  "Winner": "winner",
  "Handicap": "handicap",
  "핸디캡": "핸디캡",
  "Odd/Even": "odd/even",
  "홀짝": "홀짝",
  "12": "12",
  "승패": "승패",
  "Under/Over": "under/over",
  "오버언더": "오버언더",
  "언더오버": "언더오버",
};

export const OVER_UNDER_TYPE = {
  "OVER": "over",
  "UNDER": "under"
}

export const WIN_OR_LOSE_POSITION_NAME_KOR = {
  "1": "홈",
  "2": "원정",
  "x": "X",
  "X": "X"
}
export const HOME_AWAY_POSITION_NAME_KOR = {
  "1": "홈",
  "2": "원정",
}

export const ODD_EVENT_POSITION_NAME_KOR = {
  "1": "홈",
  "2": "원정",
}

export const TYPE_BETTING_CARD = {
  FIXTURE_ZONE: 1,
  DETAIL_FIXTURE_ZONE: 2,
  BETTING_SLIP_ZONE: 1
}

export const LAYOUT_VIEW_STATE = {
  FIXTURE: 1,
  DETAIL_FIXTURE: 2,
  BETTING_SLIP: 3
}

export const SportDataMock = [
  {
    "Id": "6046",
    "Name": "축구",
    "count": 149
  },
  {
    "Id": "154914",
    "Name": "야구",
    "count": 7
  },
  {
    "Id": "48242",
    "Name": "농구",
    "count": 82
  },
  {
    "Id": "154830",
    "Name": "배구",
    "count": 13
  },
  {
    "Id": "35232",
    "Name": "아이스 하키",
    "count": 6
  },
  {
    "Id": "131506",
    "Name": "미식축구",
    "count": 0
  },
  {
    "Id": "687890",
    "Name": "E게임",
    "count": 26
  }
]
export const STATUS_FETCHING_DATA = {
  "LOADING": "LOADING",
  "SUCCESS": "SUCCESS",
  "FAILED": "FAILED"
}
export const STATUS_BETTING = {
  "LOADING": "LOADING",
  "SUCCESS": "SUCCESS",
  "FAILED": "FAILED"
}


export const LANGUAGE_VALUES = {
  "KO": "ko",
  "EN": "en"
}
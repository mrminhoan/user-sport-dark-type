import { isArray, isEmpty } from "lodash";
import moment from "moment";

export function formatcurrency(n) {
  if (n === undefined) return "0";

  let splitcurrency = String(n).split(".");
  let dot = "";
  if (splitcurrency[1] !== undefined) {
    dot = "." + splitcurrency[1].padEnd(2, "0").substring(0, 2);
  }
  let newcurrency = parseInt(n)
    .toFixed(0)
    .replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  return newcurrency + dot;
}

export const sortWinOrLost = (markets) => {
  if (!isArray(markets) || isEmpty(markets)) return [];

  const sortBets = [...markets]?.sort((a, b) => {
    const order = { 1: -1, ["X" || "x"]: 0, 2: 1 };
    return order[a.Name] - order[b.Name];
  });
  return sortBets;
};

export const sortUnderOver = (markets) => {
  if (!isArray(markets) || isEmpty(markets)) return [];

  const sortBets = [...markets]?.sort((a, b) => {
    const sort = { Over: -1, Under: 0 };
    return sort[a.Name] - sort[b.Name];
  });

  return sortBets;
};

export const removeStringBaseLine = (str) => {
  if (typeof str !== "string" || !str) return;

  return str.replace(/\s+\(0-0\)/, "");
};

export const sortHandicap = (markets) => {
  if (!isArray(markets) || isEmpty(markets)) return [];

  const sortBets = [...markets]?.sort((a, b) => {
    const sort = { 1: -1, 2: 0 };

    return sort[a.Name] - sort[b.Name];
  });

  return sortBets;
};

export function setChangePrice(Bets, priceChange) {
  let changeBets = [...Bets];
  let betsPrice = 0;
  if (priceChange.ChangeType == 1) {
    let rateUpdateValue = Number(priceChange.ChangeRate);
    for (let bet of changeBets) {
      betsPrice += 100 / Number(bet.Price);
    }
    let obal = Number((100 / betsPrice) * 100);
    let nbal = obal + rateUpdateValue;

    const mappingChangePrice = changeBets.map((b) => ({
      ...b,
      changeBets: getBalanceToPrice(obal, nbal, Number(b.Price)),
    }));

    changeBets = mappingChangePrice;
  }

  return changeBets;
}

function getBalanceToPrice(obal, nbal, price) {
  let percent;
  let newPrice;
  percent = Number(obal / price);
  newPrice = Math.floor(Number(nbal / percent) * 100) / 100;
  return newPrice;
}
export const sortIncudingTime = (markets) => {
  if (!isArray(markets) || isEmpty(markets)) return [];

  const sortBets = [...markets]?.sort((a, b) => {
    const order = { 1: -1, 2: 0 };
    return order[a.Name] - order[b.Name];
  });

  return sortBets;
};

export const sortOddEven = (markets) => {
  if (!isArray(markets) || isEmpty(markets)) return [];

  const sortBets = [...markets]?.sort((a, b) => {
    const sort = { Odd: -1, Even: 0 };
    return sort[a.Name] - sort[b.Name];
  });

  return sortBets;
};

export function currentUTCSumTimeZone(timezone, format) {
  var formattedDate = moment().utc().format(format);

  if (timezone > 0) {
    formattedDate = moment().utc().add(timezone, "hour").format(format);
  } else if (timezone < 0) {
    formattedDate = moment()
      .utc()
      .subtract(timezone * -1, "hour")
      .format(format);
  }

  return formattedDate;
}

export function setUTCSumTimeZone(datetime, timezone, format) {
  var formattedDate = moment(datetime).utc().format(format);

  if (timezone > 0) {
    formattedDate = moment(datetime).utc().add(timezone, "hour").format(format);
  } else if (timezone < 0) {
    formattedDate = moment(datetime)
      .utc()
      .subtract(timezone * -1, "hour")
      .format(format);
  }
  return formattedDate.replace(/(am|pm)$/i, "");
}

export const handleCheckBettingCardExists = (
  marketId,
  fixtureId,
  betId,
  slips
) => {
  try {
    if (!slips || !Array.isArray(slips)) return false;
    const isExits = slips?.some(
      (item) =>
        item.fixture.FixtureId === fixtureId &&
        item.market.Id === marketId &&
        item.bet.Id === betId
    );
    return isExits;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkStatus = (bet) => {
  if (!bet || !bet.Status) return;

  return ![1, 9].includes(bet.Status);
};

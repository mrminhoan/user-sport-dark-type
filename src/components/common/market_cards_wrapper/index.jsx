import React, { Fragment } from "react";
import MarketBettingCards from "../market_betting_cards";

function MarketCardWrapper({ marketName, children, isDisplayName = true }) {
  return (
    <Fragment>
      <div>
        {isDisplayName && <p className="text-white mb-[8px]">{marketName}</p>}
        <div className="mt-[16px]">{children}</div>
      </div>
    </Fragment>
  );
}

export default MarketCardWrapper;

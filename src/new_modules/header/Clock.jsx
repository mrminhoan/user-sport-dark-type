import { IconsList } from "@/components/common/Icons";
import { currentUTCSumTimeZone } from "@/lib/functions";
import React, { useEffect, useState } from "react";

function Clock({ timezone }) {
  const [currentDate, setCurrentDate] = useState(
    currentUTCSumTimeZone(timezone, "YYYY-MM-DD HH:mm:ss")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(currentUTCSumTimeZone(timezone, "YYYY-MM-DD HH:mm:ss"));
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [timezone]);

  return (
    <div className="flex flex-row items-center gap-[4px] max-lg:hidden">
      <img src={IconsList.ic_calendar} className="w-[20px] object-contain" />
      <p className="text-[14px] w-[150px] whitespace-nowrap text-white">
        {currentDate}
      </p>
    </div>
  );
}

export default Clock;

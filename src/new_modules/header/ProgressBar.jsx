import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setPathLength(scrolled);
    };

    scrollHandler();

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <span
      className="absolute overflow-hidden w-0 h-[3px] bottom-[0] left-[0] right-[0] block before:content-[''] before:w-screen before:h-full before:block before:bg-[linear-gradient(267.99deg,_#9F72FF_0%,_#4DB8FF_100%)]"
      style={{ width: pathLength + "%" }}
    />
  );
};

export default ProgressBar;

import React from "react";
import { Card } from "@/components/ui/card";
import Sports from "../sports";
import BettingPage from "@/pages/BettingPage";
import Header from "@/new_modules/header/Header";
import SlideToggle from "@/components/ui/slideToggle";

const MainComponent = () => {
  return (
    <>
      <div
        className="flex flex-col h-full"
        style={{
          backgroundImage: `url("/images/background.png")`,
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <div className="container">
          <Header />
        </div>
        <div className="flex-1 pt-[114px] max-lg:pt-[56px]">
          <div className="container h-full">
            <BettingPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;

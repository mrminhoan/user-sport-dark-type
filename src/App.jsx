import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import MainComponent from "./modules/home";
import { useMediaQuery } from "react-responsive";
import Initload from "./pages/initload";
import Error from "./pages/error";
import { setCurrentLang } from "./store/WebStateReducer";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CONNECT_WEBSOCKET" });
    const defaultLang = localStorage.getItem("lang");
    if (!defaultLang) {
      localStorage.setItem("lang", "ko");
      // dispatch(setCurrentLang("ko"));
    }
  }, []);

  return (
    <div className="h-full">
      {/* <Initload /> */}
      <MainComponent />
      {/* <Error /> */}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Register from "../authentication/Register";
import VerifyJWT from "../../hooks/VerifyJWT";
import VerifyStats from "../../hooks/VerifyStats";
import Logo from "../../images/mainlogo_full.png"; //S3 reference
import reducer from "../../redux/reducer";
import redux from "redux";
import { Provider } from "react-redux";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlerLoggedInState = (
    email: string,
    token: string,
    clientId: string,
    games?: string,
    wins?: string,
    created?: string,
    friends?: string
  ) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("games", games?.toString() || "0");
    localStorage.setItem("wins", wins?.toString() || "0");
    localStorage.setItem("created", created || "0");
    localStorage.setItem("friends", friends || "");
  };

  useEffect(() => {
    setIsLoading(true);
    //avoid double mount
    try {
      // iife to set sessions on reload
      (async () => {
        const email = await localStorage.getItem("email");
        const token = await localStorage.getItem("email");
        const clientId = await localStorage.getItem("email");
        const value = await VerifyJWT(email, token, clientId);
        if (value === true) {
          //cache
          setIsLoggedIn(true);
        }
      })();

      // iife to set stats on reload, since games are updated constantly
      (async () => {
        const clientId = await localStorage.getItem("clientId") || ''
        const data = await VerifyStats(clientId);
      })();
    } catch (error) {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [VerifyJWT, setIsLoggedIn, setIsLoading]);

  return (
    <React.Fragment>
      {!isLoading && !localStorage.getItem("token") && !isLoggedIn && (
        <div className="flex items-center justify-center h-screen">
          <div className="w-100 h-full max-h-screen overflow-y-auto">
            <img className="w-full h-full" src={Logo} />
          </div>
          <div className="w-1/3 max-h-screen overflow-y-auto">
            <Register handler={handlerLoggedInState} />
          </div>
        </div>
      )}
      {!isLoading && isLoggedIn && <Navigation />}
      <Navigation />
    </React.Fragment>
  );
};

export default App;

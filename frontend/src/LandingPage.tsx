import { Fragment, useState, useCallback, useContext, useEffect } from "react";
import Login from "./Login";
import { Routes, Route, Switch, Redirect } from "react-router-dom";
import Contact from "../Misc/Contact";
import Browse from "../Router/Browse";

import "bootstrap/dist/css/bootstrap.css";
import ShareModal from "../Misc/ShareModal";
import SessionContext from "../Context/auth-context";
import NavigationBar from "../Navigation/NavigationBar";
import { isPropertySignature } from "typescript";
const Home = (props) => {
  return (
    <SessionContext.Provider
      value={{ isLoggedIn: localStorage.getItem("isLoggedIn") }}
    >
      {localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("isLoggedIn").toString() == "true" ? (
        <></>
        ) : (
        ""
      )}

      <div
        className="container text-center"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "9em",
          gridGap: "20px",
        }}
      ></div>
    </SessionContext.Provider>
  );
};
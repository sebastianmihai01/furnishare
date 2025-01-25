import { Fragment, useContext, useState } from "react";
import Header from "./Header";
import HeaderButton from "./HeaderButton";
import React from "react";
//import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../Images/dept_logo.png";
import SessionContext from "../Context/auth-context";

const NavigationBar = (props) => {
  const ctx = useContext(SessionContext);
  const [submitState, setSubmitState] = useState(false);

  return (
    <SessionContext.Consumer>
      {(ctx) => {
        return (
          
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ background: "transparent", opacity: "1" }}
          >
                  <button
            type="button"
            onClick={props.signoutHandler}
            class="btn btn-outline-dark"
            style={{
              position: "absolute",
              right: "1em",
              borderWidth: "2px",
            }}
          >
            LOG OUT
          </button>
            <div className="container-fluid" style={{ paddingLeft: "2em" }}>
              <a
                href="https://www.deptagency.com/nl-nl/"
                className="navbar-brand"
              >
                <img
                  src={logo}
                  alt="Dept Agency"
                  style={{ width: "150px", height: "50px", opacity: "1" }}
                ></img>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div
                  className="navbar-nav"
                  style={{
                    marginInline: "8em",
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    opacity: "1",
                  }}
                >
                  <HeaderButton name={"Home"}></HeaderButton>
                  <HeaderButton name={"Browse"}></HeaderButton>
                  <HeaderButton name={"Contact"}></HeaderButton>
                </div>
              </div>
            </div>
            {props.children}
          </nav>
        );
      }}
    </SessionContext.Consumer>
  );
};

export default NavigationBar;

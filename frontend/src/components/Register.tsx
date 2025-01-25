import React, { useState } from "react";
import Login from "./Login";
import Logo from "../../images/logo_sm.png";

const Register = (props: any) => {
  const [successRegister, setSuccessRegister] = useState(false);
  const [failedLogIn, setFailedLogIn] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [registerIssue, setRegisterIssue] = useState(false);
  // if the form is submitted but login button is not clicked => register
  const [registerClicked, setRegisterclicked] = useState(false);

  const handlerSubmitForm = async (e: any) => {
    e.preventDefault();
    setFailedLogIn(false);
    setSuccessRegister(false);
    setRegisterIssue(false);

    try {
      const data = new FormData(e.target);
      const email = data.get("email");
      const password = data.get("password");

      if (password && email) {
        // login (no register button clicked => log button clicked since form was submitted)
        if (!registerClicked) {
          const request = await fetch(
            `${process.env.REST_URL || "https://blackjack-jeco-backend.herokuapp.com"}/api/v1/login`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password, // debatable if passwords really need to be encryped client-side
              }),
            }
          );
          if (request.status === 200) {
            const response = await request.json();
            props.handler(
              email,
              response.token,
              response.clientId,
              response.games,
              response.wins,
              response.created,
              response.friends
            ); //set is logged in to true
          } else {
            setFailedLogIn(true);
          }
          return;
        }
        // register button is clicked
        const request = await fetch(`${process.env.REST_URL|| 'https://blackjack-jeco-backend.herokuapp.com'}/api/v1/users`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password, // debatable if passwords really need to be encryped client-side
          }),
        });

        if (request.status === 200) {
          //@ts-ignore
          document.getElementById("formid")?.reset(); //annoying issue
          setSuccessRegister(true);
          setRegisterclicked(false);
          return;
        } else {
          setRegisterIssue(true);
          setRegisterclicked(false);
        }

        return;
      }
    } catch (error) {
      // how unfortunate, cloudwatch log here
    }
  };

  const handlerRegisterClick = () => {
    setRegisterclicked(true);
  };

  const handlerLoginClicked = () => {
    setRegisterclicked(true);
  };

  return (
    <React.Fragment>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {registerIssue && (
            <h1 className="text-red-400 font-2xl font-bold ">
              {" "}
              An account with this email already exists, please try another one!
            </h1>
          )}
          {successRegister && (
            <h1 className="text-green-400 font-2xl font-bold ">
              {" "}
              Sucessfully Registered! Please Log in!
            </h1>
          )}
          {failedLogIn && (
            <h1 className="text-red-400 font-2xl font-bold ">
              {" "}
              Invalid credentials, please try again!
            </h1>
          )}
          <div>
            <img className="mt-6 h-14 w-auto" src={Logo} alt="BlackJack logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Blackjack Case Assignment
            </h2>

            <h3 className="mt-12 text-xl font-extrabold text-gray-500">
              Please register/login before continuing.
            </h3>
          </div>
          <form
            className="mt-2 space-y-6"
            id="formid"
            onSubmit={handlerSubmitForm}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-teal-200 border-gray-200 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-teal-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-bold text-teal-400 hover:text-teal-00"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handlerRegisterClick}
                className="group relative w-full flex justify-center py-2 px-4
                border border-transparent text-sm font-medium rounded-3xl text-white
                bg-teal-500 hover:bg-teal-300 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 font-bold"
              >
                Sign up
              </button>
              <Login onClick={handlerLoginClicked} />
              <hr className="my-4 border-gray-300" />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;

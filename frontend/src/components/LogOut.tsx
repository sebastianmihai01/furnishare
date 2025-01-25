import React from "react";

const LogOut = () => {
  const handlerLogout = () => {
    localStorage.setItem("token", "");
    window.location.href =
      process.env.SITE || "https://blackjack-jeco-backend.herokuapp.com/"; //error setting up fs module on heroku
  };

  return (
    <React.Fragment>
      <div>
        <button
          onClick={handlerLogout}
          className="border-2 border-gray-200 hover:bg-teal-100 hover:text-teal-400 text-black text-xs font-bold h-8 px-4 mt-2 rounded-full"
        >
          Log Out
        </button>
      </div>
    </React.Fragment>
  );
};

export default LogOut;

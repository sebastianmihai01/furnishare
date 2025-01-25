import React from "react";

const Login = (props: any) => {
  return (
    <React.Fragment>
      <button
        type="submit"
        className="group relative w-full flex justify-center my-1 py-2 px-4
                border border-teal-200 text-sm font-medium rounded-3xl text-teal-500
                bg-white hover:bg-teal-50 focus:outline focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 font-bold"
      >
        Log In
      </button>
    </React.Fragment>
  );
};

export default Login;

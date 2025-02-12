
import React, { useEffect } from "react";
import { logger } from "./utils/logger";
import ErrorBoundary from "./Errors/ErrorBoundary";
import * as Sentry from "sentry"
import {BrowserTracing} from "@sentry/tracing"

const App = () => {

  useEffect(() => {
    logger.info("React App has started.");
  }, []);

  const handleError = () => {
    try {
      throw new Error("Simulated error!");
    } catch (error) {
      logger.error(error.message);
    }
  };

  window.addEventListener("error", (event) => {
  console.error("Uncaught Error:", event.error);
  // Log error to an external monitoring service
});

  return (
    <React.Fragment>
      <ErrorBoundary>
        <LandingPage/>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;

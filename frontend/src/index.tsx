import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root") as HTMLElement;

render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <App />
              </PersistGate>
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
  rootElement
);
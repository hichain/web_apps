import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DebugComponent } from "./client";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/debug" exact component={DebugComponent} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

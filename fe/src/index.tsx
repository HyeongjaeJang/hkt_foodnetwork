import { render } from "preact";
import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/_404.jsx";

import "./translations";

import "./style.css";
import { Login } from "./pages/Auth";
import Registerstep from "./pages/Auth/registerstep.js";
import EventPg from "./pages/Event";
import Profile from "./pages/Profile";
import { useEffect, useState } from "preact/hooks";
import NewEvent from "./pages/NewEvent";
import authChecker from "./utils/checkauth";

export function App() {
  useEffect(() => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");
    authChecker();
  }, []);
  return (
    <LocationProvider>
      <main data-theme={localStorage.getItem("theme") || "light"}>
        <Router>
          <Route path="/" component={Home} />
          {localStorage.getItem("u_type") === "org" && (
            <Route path="/newevent" component={NewEvent} />
          )}
          {!localStorage.getItem("u_type") && (
            <Route path="/register" component={Registerstep} />
          )}
          {!localStorage.getItem("u_type") && (
            <Route path="/login" component={Login} />
          )}
          <Route path="/event/:id" component={EventPg} />
          <Route path="/profile" component={Profile} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));

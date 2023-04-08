import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ReservationRoutes from "../reservations/reservationRoutes";
import TableRoutes from "../tables/tableRoutes";
import Search from "../reservations/search/search";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */


function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <ReservationRoutes />
      </Route>
      <Route path="/tables">
        <TableRoutes />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

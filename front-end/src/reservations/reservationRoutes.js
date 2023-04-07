import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/New";
import Edit from "./edit/Edit";
import NotFound from "../layout/NotFound";

function reservationRoutes() {
    return (
        <main>
            <Switch>
                <Route path={"/reservations/new"}>
                    <New />
                </Route>
                <Route path={"/reservations/:reservation_id/edit"}>
                    <Edit />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </main>
        );
    }

export default reservationRoutes;
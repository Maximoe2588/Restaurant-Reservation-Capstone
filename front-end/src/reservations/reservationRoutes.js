import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/NewForm";
import Edit from "./edit/EditForm";
import Seat from "./seat/SeatReservation";
import NotFound from "../layout/NotFound";

function ReservationRoutes() {
    return (
        <main>
            <Switch>
                <Route path={"/reservations/new"}>
                    <New />
                </Route>
                <Route path={"/reservations/:reservation_id/edit"}>
                    <Edit />
                </Route>
                <Route path={"/reservations/:reservation_id/seat"}>
                    <Seat />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </main> 
    );
}

export default ReservationRoutes;
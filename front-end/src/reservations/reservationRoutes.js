import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./new/newForm";
import Edit from "./edit/editForm";
import Seat from "./seat/seatReservation";
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
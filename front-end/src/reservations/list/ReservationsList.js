import React from "react";
import Reservation from "../reservationCard/reservation";



function reservationsList({ reservations }) {

  // display when no reservations are found

    const noReservations = reservations === "loading"
        ? (//if reservation is "loading"
            <span className="mx-auto">
                Loading reservations...
            </span>
        )
            : reservations.length // else if reservations is not "loading"
                ? null // and there are reservations (i.e., reservations.length > 0), set noReservations to null
                : (  // otherwise, if there are no reservations (i.e., reservations.length === 0)...
                <span className="mx-auto">
                    No reservations found.
                </span>
                );

    let reservationsMapped;
    let reservationsList = null;
    const currentReservations = [];
    const finishedReservations = [];

    // waits for "loading" status to be replaced by a non-empty array of reservations
    if (reservations.length && reservations !== "loading") {
      //  filters out finished reservations from rendering. "cancelled" could be added as well - tests are not affected either way.
        reservations.forEach((res) => {
            if (["finished"].includes(res.status)) {
            finishedReservations.push(res);
        } else {
            currentReservations.push(res);
        }
        });

        reservationsMapped = currentReservations.map((res, index) => (
        <Reservation key={index} reservation={res} />
        ));
        reservationsList = <div className="card-deck">{reservationsMapped}</div>;
    }

    return reservationsList ?? noReservations;
}

export default reservationsList;
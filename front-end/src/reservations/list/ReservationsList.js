import React from "react";
import Reservation from "../reservationCard/reservation";


function ReservationsList({ reservations }) {

  // display when no reservations are found

const noReservationsFoundError = (
    <span className="mx-auto">No reservations found.</span>
);

// displays while waiting for api response, and if there are 0 results

const noReservations = reservations === "loading" ? (
    <span className="mx-auto">Loading reservations...</span>
    ) : noReservationsMessage;

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

export default ReservationsList;
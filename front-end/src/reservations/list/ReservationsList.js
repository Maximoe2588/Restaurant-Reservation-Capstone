import React from "react";
//import Reservation from "../reservation/Reservation";
//import LoadingWheel from "../../widgets/LoadingWheel";

function ReservationsList({ reservations }) {
  const noReservationsMessage = (
    <span className="mx-auto">No reservations found.</span>
  );

  // displays while waiting for api response, and if there are 0 results
  const noReservations =
    reservations === "loading" ? <LoadingWheel /> : noReservationsMessage;

  let reservationsMapped;
  let reservationsList = null;
  const currentReservations = [];
  const finishedReservations = [];

  // waits for "loading" status to be replaced by a non-empty array of reservations
  if (Array.isArray(reservations) && reservations.length) {
    //  filters out finished reservations from rendering. "cancelled" could be added as well - tests are not affected either way.
    reservations.forEach((res) => {
      if (["finished"].includes(res.status)) {
        finishedReservations.push(res);
      } else {
        currentReservations.push(res);
      }
    });

    reservationsMapped = currentReservations.map((res) => (
      <Reservation key={res.id} reservation={res} />
    ));
    reservationsList = <div className="card-deck">{reservationsMapped}</div>;
  }

  return reservationsList ?? noReservations;
}

export default ReservationsList;
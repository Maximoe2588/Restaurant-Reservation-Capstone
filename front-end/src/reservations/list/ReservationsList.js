import React from "react";
import reservation from "../reservations/reservationCard";
//import LoadingWheel from "../../widgets/LoadingWheel";

function ReservationsList({ reservations }) {
  
  // display when no reservations are found

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
    // separate reservations into current and finished based on status
    reservations.forEach((res) => {
      if (["finished"].includes(res.status)) {
        finishedReservations.push(res);
      } else {
        currentReservations.push(res);
      }
    });

    // map current reservations to Reservation components

    reservationsMapped = currentReservations.map((res) => (
      <Reservation key={res.id} reservation={res} />
    ));
    
    // wrap reservations in a card-deck element for styling
    
    reservationsList = <div className="card-deck">{reservationsMapped}</div>;
  }

  return reservationsList ?? noReservations;
}

export default ReservationsList;
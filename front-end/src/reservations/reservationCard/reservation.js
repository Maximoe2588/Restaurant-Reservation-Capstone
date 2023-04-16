import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import ReservedToolbar from "../toolbar/ReservedToolbar";


function Reservation({ reservation }) {
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_time,
        people,
        status,
    } = reservation;

    const history = useHistory();
    const [cancelReservationError, setCancelReservationError] = useState(null);

    const confirmCancel = () => {
        if (window.confirm("Do you want to cancel this reservation?")) {
        const abortController = new AbortController();
        setCancelReservationError(null);

        updateReservationStatus(reservation_id, "cancelled", abortController.signal)
            .then(() => history.go(0))
            .catch(setCancelReservationError);
        return () => abortController.abort();
        }
    };

return (
    <div>
        <div>
            <span>
            <span>{reservation_time}</span>
            </span>
        </div>

        <div>
            <span>
            <span>{people}</span>
                <p>{first_name} {last_name}</p>
                <a href={`tel:${mobile_number}`}>{mobile_number}</a>
            </span>
        </div>

        <div>
            <span>
            {"Status: "}
            <span data-reservation-id-status={reservation_id}>
                {status}
            </span>
                <ErrorAlert error={cancelReservationError} />
            </span>
        </div>

        {status === "booked" ? (
            <div className={"bg-light"}>
                <ReservedToolbar confirmCancel={confirmCancel} id={reservation_id} />
            </div>
    ) : null}
    </div>
    );
}

export default Reservation;
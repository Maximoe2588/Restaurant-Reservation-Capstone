import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../../utils/api";
import reservedToolbar from "../toolbar/reservedToolbar";
import ErrorAlert from "../../layout/ErrorAlert";

//card layout for each reservation

function Reservation({ reservation }) {

// extract reservation data from props

    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_time,
        people,
        status,
    } = reservation;

// set up state and history

const history = useHistory();
const [cancelReservationError, setCancelReservationError] = useState(null);


// handle cancelling a reservation
// abort controller to handles cancelling the request if the user navigates away

const confirmCancel = () => {
    
    if (
        window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
    )
    ) {
    const abortController = new AbortController();
        setCancelReservationError(null);

        updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.signal
        )
        // history.go(0) refreshes the current page (should be /dashboard) so that tables effect hook reloads
        .then(() => history.go(0))
        .catch(setCancelReservationError);
        return () => abortController.abort();
    }
};

let toolbar = null;
if (status === "booked") {
    toolbar = (
        <div className={"bg-light"}>
            <reservedToolbar confirmCancel={confirmCancel} id={reservation_id} />
        </div>
    );
}

return (
    <div>
        <div>
            <span>
                <span>
                    {reservation_time}
                </span>
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
            
    </div>
    );
}

export default Reservation;


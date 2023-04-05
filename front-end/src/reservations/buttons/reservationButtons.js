import React from "react";

//allows user to seat, edit, cancel reservation

function reservationButtons({ confirmCancel, id }) {

return (
    <div
        role="toolbar"
        aria-label="reservation actions"
    >
        <div
            role="group"
            aria-label="Assign to Table Button"
        >
            <a href={`/reservations/${id}/seat`} className="btn btn-primary shadow">
                <span className="oi oi-arrow-circle-bottom mr-2" />
                Seat
            </a>
        </div>
        <div
            role="group"
            aria-label="Toolbar with button groups "
        >
            <a href={`/reservations/${id}/edit`} className="btn btn-sm btn-secondary mr-1">
                <span className="oi oi-pencil mr-2" />
                Edit
            </a>
        <button
            type="button"
            className="btn btn-sm btn-danger ml-1"
            onClick={confirmCancel}
            data-reservation-id-cancel={id}
        >
            <span className="oi oi-ban mr-1" />
                Cancel
        </button>
        </div>
    </div>
    );
}

export default reservationButtons;

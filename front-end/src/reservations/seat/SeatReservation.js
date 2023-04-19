import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { listTables, assignToTable, getReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

//assigns seating to a reservation changing it's status

function SeatReservation () {

    const { reservation_id } = useParams();
    const history = useHistory();

    const [assignTableError, setAssignTableError] = useState(null);

    const [allTables, setAllTables] = useState([]);
    const [allTablesError, setAllTablesError] = useState(null);

    const [formData, setFormData] = useState({ table_id: null });

    const [reservationDetails, setReservationDetails] = useState([]);
    const [reservationError, setReservationError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setAllTablesError(null);
    //fetch details for the current reservation ID
        listTables(abortController.signal)
            .then(setAllTables)
            .catch(setAllTablesError);
    
        return () => abortController.abort();
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        setReservationError(null);
    
        getReservation(reservation_id, abortController.signal)
            .then(setReservationDetails)
            .catch(setReservationError);
    
        return () => abortController.abort();
    }, [reservation_id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        setAssignTableError(null);
    // assign the reservation to the selected table
        assignToTable(reservation_id, formData.table_id, abortController.signal)
            .then(() => history.push(`/dashboard?date=${reservationDetails.reservation_date}`))
            .catch(setAssignTableError);
        return () => abortController.abort();
        };

    const handleCancel = (event) => {
            event.preventDefault();
            history.goBack();
    };

    return (
        <section>
            <h1>Assign Party of {reservationDetails.people} to a Table</h1>
            <ErrorAlert error={allTablesError} />
            <ErrorAlert error={reservationError} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="table_id" className={"sr-only"}>
                    Pick Table:{" "}
                </label>
            <select
                name="table_id"
                onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
                required={true}
            >
                <option defaultValue>Table: # - Capacity: #</option>
                {allTables.map(({ table_id, table_name, capacity, }) => (
                <option key={table_id} value={table_id}>
                    {table_name} - {capacity}
                </option>
            ))}
            </select>
            <button
                type="button"
                value="Cancel"
                className="btn btn-sm btn-secondary mx-2"
                onClick={handleCancel}
            >
                <span className="oi oi-action-undo mr-2" />
                Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
                Submit
                <span className="oi oi-check ml-2" />
            </button>
            </form>
            <ErrorAlert error={assignTableError} />
        </section>
    );
}
    


export default SeatReservation;
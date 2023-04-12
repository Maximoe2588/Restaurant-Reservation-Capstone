import React, { useState } from "react";
import { listReservationsByMobile } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import ReservationsList from "../../reservations/list/ReservationsList";


function Search() {

    //state for mobile number query

    const [mobileNumber, setMobileNumber] = useState([""]);

    //state for search results

    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    //state for search results message

    const initialMessage = "search reservations...";
    const [resultsMessage, setResultsMessage] = useState(initialMessage);

    //changes search query input
    const handleChange = ({ target }) => {
        setMobileNumber(target.value);
    };

    //loads reservations for search query
    function loadReservations() {
        const abortController = new AbortController();
        setReservationsError(null);
        setReservations([]);
        setResultsMessage("...searching now!");

        //call API to list res by mobile
        listReservationsByMobile(mobileNumber, abortController.signal)
            .then(setReservations)
            .then(() => {
                if (reservations.length === 0) {
                setResultsMessage("No reservations found");
            }
        })
        
            .catch(setReservationsError);
        //abort function for cleanup
        return () => abortController.abort();
    }

    // handler for search query
    const handleSubmit = (event) => {
        event.preventDefault();

        loadReservations();
    };

    // handler for search results or message 
    const searchResults = reservations.length ? (
    <>
        <h6 className="mt-5">Search Results:</h6>
        <ReservationsList reservations={reservations} />
    </>
    ) : (
        resultsMessage
);

    // renders search form and results 
    return (
        <main>
        <div className="d-md-flex mb-3 text-center">
            <h1 className="mb-0">Search</h1>
        </div>
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group mb-2">
            <label className="sr-only">mobile_number</label>
            <input
                id="mobile_number"
                name="mobile_number"
                type="phone"
                className="form-control"
                placeholder="Enter a customer's phone number"
                onChange={handleChange}
                value={mobileNumber}
                required={true}
        />
            </div>
            <button type="submit" className="btn btn-primary ml-2 mb-2">
                <span className="oi oi-magnifying-glass mr-2" />
                Find
            </button>
        </form>
        {searchResults}
            <ErrorAlert error={reservationsError} />
        </main>
    );
}

export default Search;
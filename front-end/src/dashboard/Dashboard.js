import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateNavigation from "./DateNavig";
import ReservationsList from "../reservations/list/ReservationsList";
//import TablesList from "../tables/list/TablesList";
//import CurrentTime from "../widgets/CurrentTime";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
/*

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
*/

function Dashboard({ date: initialDate }) {
  const queryDate = useQuery().get("date");
  const [date, setDate] = useState(queryDate || initialDate);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservationsData = await listReservations({ date });
        setReservations(reservationsData);

        const tablesData = await listTables();
        setTables(tablesData);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error);
        setReservationsError({
          message: "An unexpected error occurred while loading reservations.",
        });
        setTablesError({
          message: "An unexpected error occurred while loading tables.",
        });
      }
    }
    fetchData();
  }, [date]);

  const displayDateLong = formatDisplayDate(date, "long");

  return (
    <main>
      <div>
        <div>
          <h2>{displayDateLong}</h2>
          <DateNavigation date={date} setDate={setDate} />
        </div>
      </div>
      <div>
        <div>
          <fieldset>
            <legend>
              <CurrentTime sectionTitle={"Reservations"} />
            </legend>
            <ReservationsList reservations={reservations} />
            <ErrorAlert error={reservationsError} />
          </fieldset>
        </div>
      </div>
      <div>
        <div>
          <fieldset>
            <legend>Tables</legend>
            <TablesList tables={tables} />
            <ErrorAlert error={tablesError} />
          </fieldset>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
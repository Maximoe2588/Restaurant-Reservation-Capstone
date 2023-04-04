// import React, { useEffect, useState } from "react";
// import useQuery from "../utils/useQuery";
// import { listReservations, listTables } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
// import DateNavigation from "./DateNavig";
// import ReservationsList from "../reservations/list/ReservationsList";
// //import TablesList from "../tables/list/TablesList";


// /**
//  * Defines the dashboard page.
//  * @param date
//  *  the date for which the user wants to view reservations.
//  * @returns {JSX.Element}
//  */
// /*

// function Dashboard({ date }) {
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);

//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//     return () => abortController.abort();
//   }

//   return (
//     <main>
//       <h1>Dashboard</h1>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">Reservations for date</h4>
        
//       </div>
//       <ErrorAlert error={reservationsError} />
//       {JSON.stringify(reservations)}
//     </main>
//   );
// }

// export default Dashboard;
// */

// function Dashboard({ date: initialDate }) {

// //extracts query string parameter that renders dashboard view

//   const queryDate = useQuery().get("date");
//   const [date, setDate] = useState(queryDate || initialDate);


// //reservations and error set to empty array and null
// //tables and error set to empty array and null

//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);

//   const [tables, setTables] = useState([]);
//   const [tablesError, setTablesError] = useState(null);

// //utilize utils listReservation to fetch reservations and tables data based on data

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const reservationsData = await listReservations({ date });
//         setReservations(reservationsData);

//         const tablesData = await listTables();
//         setTables(tablesData);
//       } catch (error) {
//         if (error.name === "AbortError") return;
//         console.error(error);

//  // set the error messages for reservations and tables state

//         setReservationsError({
//           message: "An unexpected error occurred while loading reservations.",
//         });
//         setTablesError({
//           message: "An unexpected error occurred while loading tables.",
//         });
//       }
//     }
//     fetchData();
//   }, [date]);



// // render the dashboard view with the state of reservations, tables and errors

//   return (
//     <main>
//       <div>
//         <div>
//           <DateNavigation date={date} setDate={setDate} />
//         </div>
//       </div>
//       <div>
//         <div>
//           <fieldset>
//             <legend>
//             </legend>
//               <ReservationsList reservations={reservations} />
//               <ErrorAlert error={reservationsError} />
//           </fieldset>
//         </div>
//       </div>
//       <div>
//         <div>
//           <fieldset>
//             <legend>Tables</legend>
//               <ErrorAlert error={tablesError} />
//           </fieldset>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Dashboard;
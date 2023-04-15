import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

// render the date navigation with links to previous, today and next dates

function DateNavigation({ date }) {
  return (
    <>
      <h5 className="text-center mt-3 text-monospace">Date Navigation</h5>
      <nav className="nav mb-1 bg-light w-75 mx-auto justify-content-center text-center"
        aria-label="Change date">
        <Link
          className="nav-link border border-left-0 border-secondary bg-white"
          to={`/dashboard?date=${previous(date)}`}
          aria-label="Previous"
        >
        <span aria-hidden="true" className="font-size-12 font-weight-bold">
            &laquo;{" "}
        </span>
          <span> Previous </span>
        </Link>
        <Link
          className="nav-link border border-top-0 border-primary mx-3 px-2 bg-white"
          to={`/dashboard?date=${today()}`}
          aria-label="Today"
        >
          <span> Today </span>
        </Link>
        <Link
          className="nav-link border border-right-0 border-secondary bg-white"
          to={`/dashboard?date=${next(date)}`}
          aria-label="Next"
        >
          <span> Next </span>
          <span aria-hidden="true" className="font-weight-bold">
            {" "}
            &raquo;
          </span>
        </Link>
      </nav>
    </>
  );
}

export default DateNavigation;

//It renders three links: one to view the previous date, one to view the current date, and one to view the next date. 
//The links are created using the Link component from React Router and are passed query parameters that 
//include the date for the previous, current, and next days respectively. 
//The today, previous, and next functions imported from "../utils/date-time" 
//are used to calculate the dates for these links based on the current date state.

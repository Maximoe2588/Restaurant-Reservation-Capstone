import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

// render the date navigation with links to previous, today and next dates

function DateNavigation({ date }) {
  return (
    <>
      <h5 className="text-center mt-3 text-monospace">Date Navigation</h5>
      <nav className="date-navigation">
        <Link
          className="previous-link"
          to={`/dashboard?date=${previous(date)}`}
          aria-label="Previous"
        >
          <span> Previous </span>
        </Link>
        <Link
          className="today-link"
          to={`/dashboard?date=${today()}`}
          aria-label="Today"
        >
          <span> Today </span>
        </Link>
        <Link
          className="next-link"
          to={`/dashboard?date=${next(date)}`}
          aria-label="Next"
        >
          <span> Next </span>
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

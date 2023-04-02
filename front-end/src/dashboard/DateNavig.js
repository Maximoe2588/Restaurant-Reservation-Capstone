import React from "react";
import { Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

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
          &laquo; Previous
        </Link>
        <Link
          className="today-link"
          to={`/dashboard?date=${today()}`}
          aria-label="Today"
        >
          Today
        </Link>
        <Link
          className="next-link"
          to={`/dashboard?date=${next(date)}`}
          aria-label="Next"
        >
          Next &raquo;
        </Link>
      </nav>
    </>
  );
}

export default DateNavigation;

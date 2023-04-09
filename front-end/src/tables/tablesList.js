import React from "react";
import tableLayout from "./tableLayout";
import { Link } from "react-router-dom";

function TablesList({ tables }) {
    const [isLoading, setIsLoading] = useState(true);
    const noTablesMessage = (
        <p>
            There are no tables- create a{" "}
            <Link className="nav-link" to="/tables/new">
                New Table
            </Link>{" "}
            to correct that
        </p>
        );

    useEffect(() => {
        if (tables === "loading") {
            setIsLoading(true);
        } else {
        setIsLoading(false);
        }
        }, [tables]);

    let tablesMapped;
    let tablesList = null;

    // waits for "loading" status to be replaced by a non-empty array of tables
    if (tables.length && !isLoading) {
        tablesMapped = tables.map((table, index) => (
            <tableLayout table={table} key={index} />
        ));
        tablesList = <div className="card-deck">{tablesMapped}</div>;
        }

    // tablesList renders if there is at least 1 table, noTables decides between showing "loading" or "no tables"
    return isLoading ? <p>Loading...</p> : tablesList ?? noTablesMessage;
}

export default TablesList;
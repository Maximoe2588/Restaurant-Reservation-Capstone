import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesLayout({ table }) {
    const { table_name, table_id, capacity, reservation_id } = table;
    const [finishTableError, setFinishTableError] = useState(null);
    const history = useHistory();

    // handle finishing a table
    const confirmFinish = async () => {
        if (
            window.confirm(
                "Is this table ready to seat new guests?"
            )
        ) {
        
            const abortController = new AbortController();
            setFinishTableError(null);

            try {
                 // call the finishTable API to mark the table as free
                await finishTable(table_id, abortController.signal);
                 // refresh the page after finishing the table
                history.go(0);
            } catch (error) {
                setFinishTableError(error);
            } finally {
                abortController.abort();
            }
        }
    };

    // check if the table is occupied
    const occupied = !!reservation_id;

    return (
        <div style={{ minWidth: "200px", maxWidth: "200px" }}>
            <h5 className="card-header p-0 py-2">Table {table_name}</h5>
            <div>
                <div>
                    {`Status: `}
                    <span data-table-id-status={`${table_id}`} className={occupied ? "occupied" : "free"}>
                        {occupied ? "Occupied" : "Free"}
                    </span>
                </div>
                <p>
                    Capacity:{" "}
                    <span>
                        {capacity}
                    </span>
                </p>
                {occupied && (
                    <button
                        data-table-id-finish={`${table_id}`}
                        onClick={confirmFinish}
                    >
                        Finish
                    </button>
                )}
                <ErrorAlert error={finishTableError} />
            </div>
        </div>
    );
}

export default TablesLayout;

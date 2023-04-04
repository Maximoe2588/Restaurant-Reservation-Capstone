import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";

function tableLayout({ table }) {
    const { table_name, table_id, capacity, reservation_id } = table;
    const [finishTableError, setFinishTableError] = useState(null);
    const history = useHistory();

    const confirmFinish = async () => {
        if (
            window.confirm(
                "Is this table ready to seat new guests? This cannot be undone."
            )
        ) {
        
            const abortController = new AbortController();
            setFinishTableError(null);

        try {
            await finishTable(table_id, abortController.signal);
            history.go(0);
        } catch (error) {
            setFinishTableError(error);
        } finally {
            abortController.abort();
        }
    }
    };

    const occupied = !!reservation_id;

    return (
        <div style={{ minWidth: "200px", maxWidth: "200px" }}>
            <h5>Table {table_name}</h5>
        <div>
        <div>
            {`Status: `}
                <span data-table-id-status={`${table_id}`}>
                {occupied ? "occupied" : "free"}
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

export default tableLayout;
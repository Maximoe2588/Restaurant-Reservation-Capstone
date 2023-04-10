import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


//form for creating new table


function NewTable() {
    
    const [tablesError, setTablesError] = useState(null);
    const history = useHistory();


    const initialFormState = {
            table_name: "",
            capacity: "",
        };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
            let value = target.value;
    
            if (target.name === "capacity" && typeof value === "string") {
            value = +value;
            }
    
            setFormData({
            ...formData,
            [target.name]: value,
            });
        };
    
    const handleSubmit = (event) => {
            event.preventDefault();

            // validate form data
            if (!formData.table_name.trim()) {
                setTablesError("Table name cannot be blank.");
                return;
            }

            if (!Number.isInteger(formData.capacity) || formData.capacity < 1) {
                setTablesError("Capacity must be a positive integer.");
                return;
            }
    
            const abortController = new AbortController();
            setTablesError(null);
    
            postTable(formData, abortController.signal)
                .then(() => {
                    //show success message
                    alert("Table created Successfully!");
                history.push(`/dashboard`);
                })
                .catch(setTablesError);
                
            const cleanup = () => abortController.abort();
            return cleanup;
        };
    
    const handleCancel = (event) => {
            event.preventDefault();
        
            history.goBack();
        };

    return (
            <section>
                <div>
                    <h1>New Table</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="table_name">Table Name:</label>
                        <div>
                            <input
                                id="table_name"
                                type="text"
                                name="table_name"
                                onChange={handleChange}
                                value={formData.table_name}
                                required={true}
                            />
                        </div>
                    </div>
                        <div>
                            <label htmlFor="capacity">Capacity:</label>
                        <div>
                            <input
                                id="capacity"
                                type="number"
                                name="capacity"
                                onChange={handleChange}
                                required={true}
                                min="1"
                                value={formData.capacity}
                            />
                        </div>
                        </div>
                    <div role="toolbar" aria-label="Toolbar with form actions buttons">
                        <button
                            type="button"
                            value="Cancel"
                            onClick={handleCancel}
                        >
                    <span />
                            Cancel
                        </button>
                        <button type="submit">
                            Submit
                    <span />
                        </button>
                </div>
            </div>
                </form>
                <ErrorAlert error={tablesError} />
        </section>
        );
    }

export default NewTable;
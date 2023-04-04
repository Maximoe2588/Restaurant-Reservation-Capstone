// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import FormField from "./FormField";
// import FormButton from "./FormButton";
// import ErrorAlert from "../../layout/ErrorAlert";

// function NewTable() {
//     const [tablesError, setTablesError] = useState(null);
//     const history = useHistory();


//     const initialFormState = {
//             table_name: "",
//             capacity: "",
//         };

//         const [formData, setFormData] = useState({ ...initialFormState });

//         const handleChange = ({ target }) => {
//             let value = target.value;
    
//             if (target.name === "capacity" && typeof value === "string") {
//             value = +value;
//             }
    
//             setFormData({
//             ...formData,
//             [target.name]: value,
//             });
//         };
    
//         const handleSubmit = (event) => {
//             event.preventDefault();
    
//             const abortController = new AbortController();
//             setTablesError(null);
    
//             postTable(formData, abortController.signal)
//                 .then(() => history.push(`/dashboard`))
//                 .catch(setTablesError);
//             return () => abortController.abort();
//         };
    
//         const handleCancel = (event) => {
//             event.preventDefault();
        
//             history.goBack();
//         };

// return (
//         <section>
//             <div className="d-md-flex mb-3 text-center">
//                 <h1 className="mb-0">New Table</h1>
//             </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="row">
//                     <div className="col-auto">
//                     <FormField
//                         id="table_name"
//                         label="Table Name"
//                         type="text"
//                         name="table_name"
//                         value={formData.table_name}
//                         onChange={handleChange}
//                         required={true}
//                     />
//                     <FormField
//                         id="capacity"
//                         label="Capacity"
//                         type="number"
//                         name="capacity"
//                         value={formData.capacity}
//                         onChange={handleChange}
//                         required={true}
//                         min="1"
//                     />
//                     <div
//                         className="btn-toolbar mb-5"
//                         role="toolbar"
//                         aria-label="Toolbar with form actions buttons"
//                     >
//                     <FormButton
//                         type="button"
//                         value="Cancel"
//                         className="btn btn-secondary mr-5"
//                         onClick={handleCancel}
//                         icon="oi-action-undo"
//                     >
//                         Cancel
//                     </FormButton>
//                     <FormButton
//                         type="submit"
//                         className="btn btn-primary"
//                         icon="oi-check"
//                     >
//                         Submit
//                     </FormButton>
//                     </div>
//                     </div>
//                 </div>
//                 </form>
//                     <ErrorAlert error={tablesError} />
//             </section>
//         );
    
// }

// export default NewTable;
// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { useParams } from "react-router";
// import ErrorAlert from "../../layout/ErrorAlert";


// function Form({ method }) {

//     const { reservation_id } = useParams();
//     const [reservationsError, setReservationError] = useState(null);
//     const history = useHistory();

//     const initialFormState = {
//         first_name: "",
//         last_name: "",
//         mobile_number: "",
//         reservation_date: today(),
//         reservation_time: formatAsTime(new Date().toTimeString()),
//         people: 1,
//     };

//     const [formData, setFormData] = useState({ ...initialFormState });

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         method === "POST" ? submitNew() : submitEdit();
//         };
    
//     const submitNew = () => {
//         const abortController = new AbortController();
//         setReservationError(null);
    
//         postReservation(formData, abortController.signal)
//             .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
//             .catch(setReservationError);
    
//         return () => abortController.abort();
//     };
    
//     const submitEdit = () => {
//         const abortController = new AbortController();
//         setReservationError(null);

//         const trimmedFormData = {
//             first_name: formData.first_name,
//             last_name: formData.last_name,
//             people: formData.people,
//             mobile_number: formData.mobile_number,
//             reservation_date: formData.reservation_date,
//             reservation_time: formData.reservation_time,
//         };
    
//         updateReservation(reservation_id, trimmedFormData, abortController.signal)
//             .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
//             .catch(setReservationError);
    
//         return () => abortController.abort();
//     };


//     const handleCancel = (event) => {
//         event.preventDefault();
//             // cancelling a new reservation while in progress sends user back to previous page.
//         history.goBack();
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <label>
//             First name:
//             <input
//                 id="first_name"
//                 type="text"
//                 name="first_name"
//                 value={form.first_name}
//                 onChange={handleChange}
//                 value={formData.first_name}
//                 required={true}
//             />
//             </label>
//             <br />
//             <label>
//             Last name:
//             <input
//                 id="last_name"
//                 type="text"
//                 name="last_name"
//                 value={form.last_name}
//                 onChange={handleChange}
//                 required
//             />
//             </label>
//                 <br />
//             <label>
//             Mobile number:
//             <input
//                 type="tel"
//                 name="mobile_number"
//                 value={form.mobile_number}
//                 onChange={handleChange}
//                 required
//             />
//             </label>
//             <br />
//             <label>
//             Date of reservation:
//             <input
//                 type="date"
//                 name="reservation_date"
//                 value={form.reservation_date}
//                 onChange={handleChange}
//                 required
//             />
//             </label>
//             <br />
//             <label>
//             Time of reservation:
//             <input
//                 type="time"
//                 name="reservation_time"
//                 value={form.reservation_time}
//                 onChange={handleChange}
//                 required
//             />
//             </label>
//             <br />
//             <label>
//             Number of people:
//             <input
//                 type="number"
//                 name="people"
//                 value={form.people}
//                 onChange={handleChange}
//                 min="1"
//                 required
//             />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//             <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//     );
// };

// export default Form; 
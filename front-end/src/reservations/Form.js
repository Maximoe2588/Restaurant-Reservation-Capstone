import React, { useState, useEffect } from "react";



function Form({ method }) {

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: today(),
        reservation_time: formatAsTime(new Date().toTimeString()),
        people: 1,
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    return (
        <form onSubmit={handleSubmit}>
        <label>
            First name:
            <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
            />
            </label>
            <br />
            <label>
            Last name:
            <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
            />
            </label>
                <br />
            <label>
            Mobile number:
            <input
                type="tel"
                name="mobile_number"
                value={form.mobile_number}
                onChange={handleChange}
                required
            />
            </label>
            <br />
            <label>
            Date of reservation:
            <input
                type="date"
                name="reservation_date"
                value={form.reservation_date}
                onChange={handleChange}
                required
            />
            </label>
            <br />
            <label>
            Time of reservation:
            <input
                type="time"
                name="reservation_time"
                value={form.reservation_time}
                onChange={handleChange}
                required
            />
          </label>
          <br />
          <label>
            Number of people:
            <input
              type="number"
              name="people"
              value={form.people}
              onChange={handleChange}
              min="1"
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      );
    };

export default Form; 
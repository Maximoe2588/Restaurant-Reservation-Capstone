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

    const handleChange = ({ target }) => {
        let value = target.value;
    
        if (target.name === "people" && typeof value === "string") {
        value = +value;
        }
    
        setFormData({
        ...formData,
        [target.name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        method === "POST" ? submitNew() : submitEdit();
        };
};

export default Form; 
import React from "react";
import Form from "../form/Form";

//renders form component to create new reservation using HTTP POST method

function newForm() {
    return (
        <section>
            <div className="d-md-flex mb-3">
                <h1 className="mb-0 text-center">New Reservation</h1>
            </div>
                <Form method={"POST"} />
        </section>
    );
}

export default newForm;
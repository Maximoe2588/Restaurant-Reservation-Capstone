import React from "react";
import Form from "../form/Form";

//renders form component to edit reservation using HTTP PUT method

function EditForm() {
    return (
        <section>
            <div className="d-md-flex mb-3 text-center">
                <h1 className="mb-0">Edit Reservation</h1>
            </div>
                <Form method={"PUT"} />
        </section>
    );
}

export default EditForm;
import React from "react";

function FormButton({ type, value, className, onClick, icon, children }) {
    return (
        <button type={type} value={value} className={className} onClick={onClick}>
        <span className={`oi ${icon} mr-2`} />
            {children}
        </button>
    );
}

export default FormButton;

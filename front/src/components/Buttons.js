import React from 'react';
import { Button } from 'react-bootstrap';

const CommonButton = ({ handleAdd, handleDelete, buttonText }) => {
    return (
        <button
            onClick={handleAdd}
            style={{
                display:"inline-block",
                float: "right",
                background: "white",
                border: "none",
            }}
            variant="outline-info"
            size="sm"
            className="mr-3"
            >
                {buttonText}
            </button>
    )
}

export default CommonButton;
import React from 'react';
import { Button } from 'react-bootstrap';

const CommonButton = ({ onClick, buttonText, style, variant = 'outline-info' }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                display:"inline-block",
                float: "right",
                background: "white",
                border: "none",
                ...style,
            }}
            variant={variant}
            size="sm"
            className="mr-3"
            >
                {buttonText}
            </Button>
    )
}

export default CommonButton;
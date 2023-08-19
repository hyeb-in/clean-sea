import React, { useEffect, useState } from "react";
import { Form, Toast } from "react-bootstrap";

const InputValidator = ({
  label,
  type,
  value,
  setState,
  onChange,
  autoComplete,
  validate,
  height,
}) => {
  const [error, setError] = useState("");
  const [canValidate, setCanValidate] = useState(false);

  useEffect(() => {
    if (validate) {
      const errorMessage = validate();
      setError(errorMessage);
    }
  }, [value, validate]);
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        size="sm"
        as={type}
        setState={setState}
        autoComplete={autoComplete}
        value={value}
        rows={8}
        onChange={(e) => {
          if (e.target.value) setCanValidate(true);
          setState(e.target.value);
          if (e.target.value === "") {
            setError(`${label}입력을 완성해주세요`);
            setCanValidate(false);
          } else {
            setError("");
          }
          if (onChange) onChange();
        }}
      />
      {canValidate && error && (
        <Toast
          // onClose={}
          text={error}
        />
      )}
    </Form.Group>
  );
};
export default InputValidator;

import React from "react";
import { Form } from "react-bootstrap";
import { InputTypes } from "../../../interfaces/components";
import styles from "./Form.module.css";

// TODO use this
export interface FieldOption {
    id: string;
    label: string;
}

// TODO add option validation for Select input type
const Field = ({
    extraText = "",
    field = null,
    label = "",
    options = [],
    placeHolder = "",
    type = InputTypes.TEXT,
    onChange = (e: any) => {
        console.log(e);
    },
}) => {
    const inputType =
        type === InputTypes.PASSWORD
            ? "password"
            : type === InputTypes.NUMBER
              ? "number"
              : "text";
    return (
        <div className={styles.field}>
            <Form.Group controlId={field}>
                <Form.Label className={styles.fieldLabel}>{label}:</Form.Label>
                {type === InputTypes.SELECT ? (
                    <Form.Select onSelect={onChange} onChange={onChange}>
                        <option>Seleccione un tipo de operación</option>
                        {options.map(({ id, label }) => (
                            <option key={id} value={id}>
                                {label}
                            </option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Control
                        type={inputType}
                        placeholder={placeHolder || ""}
                        onChange={onChange}
                    />
                )}
            </Form.Group>
            {!!extraText && <>{extraText}</>}
        </div>
    );
};

export default Field;

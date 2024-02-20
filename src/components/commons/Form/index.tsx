import React from "react";
import { Button, Form as BSForm } from "react-bootstrap";
import styles from "./Form.module.css";

const Form = ({ children, submitLabel, onSubmit }) => (
    <BSForm onSubmit={onSubmit}>
        {children}
        <Button variant="primary" type="submit" className={styles.submit}>
            {submitLabel}
        </Button>
    </BSForm>
);

export default Form;

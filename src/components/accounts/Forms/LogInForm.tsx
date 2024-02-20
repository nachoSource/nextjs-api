import React, { useState } from "react";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import AccordionElement from "../AccordionElement";
import { checkForNullishValues } from "../../../helpers";
import { InputTypes } from "../../../interfaces/components";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../store/hooks";
import { setCurrentAccount } from "../../../store/accounts/actions";
import { Field, Form } from "../../commons";

const LogInForm = ({ setError }) => {
    const dispatch = useAppDispatch();
    const accounts = useSelector((state: RootState) => state.accounts.accounts);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: null,
        password: null,
    });

    const handleChange = (e) => {
        const field = e.target.id;
        const value = e.target.value;
        let newFormData = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateData(formData)) {
            dispatch(setCurrentAccount(formData.email));
            router.push("TransactionsPage");
        }
    };

    const validateData = (data) => {
        if (checkForNullishValues(data)) {
            setError("Todos los campos son requeridos");
            return false;
        }

        const validCredentials =
            !!accounts.length &&
            !!accounts.find(
                (el) =>
                    el.email === data.email && el.password === data.password,
            );
        if (!validCredentials) {
            setError("Los datos ingresados no son correctos");
            return false;
        }

        setError(null);
        return true;
    };

    return (
        <Accordion.Item eventKey="1">
            <AccordionElement title="Ingreso">
                <Form submitLabel="Ingrese" onSubmit={handleSubmit}>
                    <Field
                        field="email"
                        label="Email"
                        onChange={handleChange}
                    />
                    <Field
                        field="password"
                        label="Contraseña"
                        type={InputTypes.PASSWORD}
                        onChange={handleChange}
                    />
                </Form>
            </AccordionElement>
        </Accordion.Item>
    );
};

export default LogInForm;

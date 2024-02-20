import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { checkForNullishValues } from "../../../helpers";
import { InputTypes } from "../../../interfaces/components";
import { createAccount } from "../../../store/accounts/actions";
import { useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store";
import { Field, Form } from "../../commons";
import AccordionElement from "../AccordionElement";

const RegisterForm = ({ setError, setShowSuccessAlert }) => {
    const accounts = useSelector((state: RootState) => state.accounts.accounts);
    useEffect(() => {
        console.log("Store accounts", accounts);
    }, [accounts]);

    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        balance: null,
        email: null,
        name: null,
        password: null,
        surname: null,
    });

    // TODO adjust this to get the value from the field directly.
    //  This logic is not strong enough
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
            dispatch(createAccount(formData));
            setShowSuccessAlert(true);
        }
    };

    const validateData = (data) => {
        if (checkForNullishValues(data)) {
            setError("Todos los campos son requeridos");
            return false;
        }

        const isEmailRepeated =
            !!accounts.length &&
            !!accounts.find((el) => el.email === data.email);
        if (isEmailRepeated) {
            setError("Ya existe una cuenta con ese email asociado");
            return false;
        }

        setError(null);
        return true;
    };

    return (
        <Accordion.Item eventKey="0" style={{ width: "100%" }}>
            <AccordionElement title="Registro">
                <Form submitLabel="Regístrese " onSubmit={handleSubmit}>
                    <Field
                        field="name"
                        label="Nombre"
                        onChange={handleChange}
                    />
                    <Field
                        field="surname"
                        label="Apellido"
                        onChange={handleChange}
                    />
                    <Field
                        field="email"
                        label="Email"
                        placeHolder="some-cool-email@gmail.com"
                        onChange={handleChange}
                    />
                    <Field
                        field="password"
                        label="Contraseña"
                        extraText="Nunca compartiremos tus datos con nadie"
                        type={InputTypes.PASSWORD}
                        onChange={handleChange}
                    />
                    <Field
                        field="balance"
                        label="Monto inicial"
                        type={InputTypes.NUMBER}
                        onChange={handleChange}
                    />
                </Form>
            </AccordionElement>
        </Accordion.Item>
    );
};

export default RegisterForm;

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Alert } from "react-bootstrap";
import { LogInForm } from "../../components/accounts";
import RegisterForm from "../../components/accounts/Forms/RegisterForm";
import StoreProvider from "../../StoreProvider";
import styles from "./AccountPage.module.css";

const AccountPage = () => {
    const [error, setError] = useState(null);

    // TODO add initial amount

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (!!error) setShowSuccessAlert(false);
    }, [error]);

    return (
        <StoreProvider>
            <div className={styles.container}>
                <h1 className={styles.title}>Ingreso al sistema</h1>
                <p className={styles.description}>
                    Ingrese los datos asociados a su cuenta personal.
                    <br />
                    Si no posee una cuenta, la misma será creada y asociada a su
                    email
                </p>
                <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
                    <RegisterForm
                        setError={setError}
                        setShowSuccessAlert={setShowSuccessAlert}
                    />
                    <LogInForm setError={setError} />
                </Accordion>

                {!!showSuccessAlert && (
                    <Alert
                        dismissible
                        variant="success"
                        onClose={() => setShowSuccessAlert(false)}
                    >
                        La cuenta ha sido creada con éxito
                    </Alert>
                )}
                {!!error && (
                    <Alert variant="warning">
                        Error al ingresar los datos: {error}
                    </Alert>
                )}
            </div>
        </StoreProvider>
    );
};

export default AccountPage;

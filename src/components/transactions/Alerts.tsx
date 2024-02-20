import React from "react";
import { Alert } from "react-bootstrap";
import styles from "../../pages/TransactionsPage/TransactionsPage.module.css";

const Alerts = ({ apiError, error, showSuccess, setShowSuccess }) => (
    <div className={styles.alerts}>
        {!!showSuccess && (
            <Alert
                dismissible
                variant="success"
                onClose={() => setShowSuccess(false)}
            >
                Operación realizada con éxito
            </Alert>
        )}
        {!!error && <Alert variant="warning">Error: {error}</Alert>}
        {!!apiError && (
            <Alert variant="warning">
                Error al realizar la operación: {apiError}
            </Alert>
        )}
    </div>
);

export default Alerts;

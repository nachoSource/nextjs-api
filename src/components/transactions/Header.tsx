import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../../pages/TransactionsPage/TransactionsPage.module.css";

const Header = () => {
    const router = useRouter();

    const handleBackButtonClick = () => {
        router.back();
    };

    return (
        <>
            <div className={styles.backButtonContainer}>
                <Button
                    variant="outline-secondary"
                    onClick={handleBackButtonClick}
                >
                    Volver
                </Button>
            </div>
            <h1>Realice una transacción</h1>
            <p>Elija un tipo de transacción y un monto</p>
        </>
    );
};

export default Header;

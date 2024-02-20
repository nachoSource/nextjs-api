import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Alerts,
    Header,
    TransactionsForm,
} from "../../components/transactions/";
import { checkForNullishValues } from "../../helpers";
import { TransactionTypes } from "../../interfaces/transactions";
import { RootState } from "../../store";
import { setAccountBalance } from "../../store/accounts/actions";
import {
    makeTransactionRequest,
    makeTransactionSuccess,
} from "../../store/transactions/actions";
import styles from "./TransactionsPage.module.css";

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(
        (state: RootState) => state.accounts.currentAccount,
    );
    const {
        success: apiSuccess,
        error: apiError,
        lastTransaction,
    } = useSelector((state: RootState) => state.transactions);
    const [error, setError] = useState<string>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [formData, setFormData] = useState<{
        amount: number;
        type: TransactionTypes;
    }>({ amount: null, type: null });

    useEffect(() => {
        setShowSuccessAlert(false);
    }, [error, apiError]);

    useEffect(() => {
        if (!!apiSuccess) {
            setShowSuccessAlert(true);
        }
    }, [lastTransaction]);

    const handleChange = (e) => {
        const field = e.target.id;
        const value = e.target.value;
        let newFormData = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
    };

    useEffect(() => {
        console.log(currentAccount);
    }, [currentAccount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateData(formData)) {
            dispatch(
                makeTransactionRequest({
                    transaction: {
                        ...formData,
                        accountId: currentAccount.id,
                    },
                }),
            );
            // TODO the following block is meant be used inside a redux callback.
            //  Even though dispatching actions from reducer's inside is
            //  discouraged by redux-toolkit documentation, a clean way to handle
            //  this needs to be found in further refactor.
            //  BTW keep in mind that backend logic is not implemented
            const balance =
                Number(formData.type) === TransactionTypes.DEPOSIT
                    ? Number(currentAccount.balance) + Number(formData.amount)
                    : Number(currentAccount.balance) - Number(formData.amount);
            dispatch(
                setAccountBalance({
                    balance,
                    email: currentAccount.email,
                }),
            );
            dispatch(makeTransactionSuccess());
            // end
        }
    };

    const validateData = (data: { amount: number; type: TransactionTypes }) => {
        if (checkForNullishValues(data)) {
            setError("Todos los campos son requeridos");
            return false;
        }
        if (
            Number(data.type) === Number(TransactionTypes.WITHDRAWAL) &&
            data.amount > currentAccount.balance
        ) {
            setError(
                "No posee fondos suficientes para realizar esta extracción",
            );
            return false;
        } else {
            setError(null);
            return true;
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <TransactionsForm onChange={handleChange} onSubmit={handleSubmit} />
            <Alerts
                apiError={apiError}
                error={error}
                showSuccess={showSuccessAlert}
                setShowSuccess={setShowSuccessAlert}
            />
            <div className={styles.balance}>
                Balance de la cuenta: {currentAccount?.balance}
            </div>
        </div>
    );
};

export default TransactionsPage;

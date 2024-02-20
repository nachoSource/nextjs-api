import React from "react";
import { InputTypes } from "../../interfaces/components";
import { TransactionTypes } from "../../interfaces/transactions";
import { Form } from "../commons";
import Field from "../commons/Form/Field";

const TransactionsForm = ({ onChange, onSubmit }) => {
    const transactionOptions = [
        { id: TransactionTypes.DEPOSIT, label: "Depósito" },
        { id: TransactionTypes.WITHDRAWAL, label: "Extracción" },
    ];

    return (
        <Form submitLabel="Completar transacción" onSubmit={onSubmit}>
            <Field
                field="type"
                label="¿Qué tipo de operación quiere realizar?"
                options={transactionOptions}
                type={InputTypes.SELECT}
                onChange={onChange}
            />
            <Field
                type={InputTypes.NUMBER}
                field="amount"
                label="Monto"
                onChange={onChange}
            />
        </Form>
    );
};

export default TransactionsForm;

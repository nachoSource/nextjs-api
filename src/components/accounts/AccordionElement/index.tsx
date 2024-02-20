import React from "react";
import { Accordion } from "react-bootstrap";

const AccordionElement = ({ title, children }) => (
    <>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
    </>
);

export default AccordionElement;

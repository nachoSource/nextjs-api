import React, { PropsWithChildren, ReactElement } from "react";
import StoreProvider from "../../StoreProvider";

type BaseLayoutProps = PropsWithChildren<{
    children: ReactElement | ReactElement[];
}>;

const BaseLayout = ({ children }: BaseLayoutProps): ReactElement => (
    <StoreProvider>{children}</StoreProvider>
);

export default BaseLayout;

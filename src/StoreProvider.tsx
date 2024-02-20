"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import store, { StoreType } from "./store";

export default function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<StoreType>();
    if (!storeRef.current) {
        storeRef.current = store;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}

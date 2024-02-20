import StoreProvider from "./StoreProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";

const App = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace("AccountPage");
    }, []);
};

export default App;

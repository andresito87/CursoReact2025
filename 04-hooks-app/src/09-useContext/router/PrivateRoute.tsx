// import { type JSX } from "react";
import { use } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
    element: React.ReactNode;
    // element: JSX.Element; // otra forma de tipar al element que también es compatible
}

export const PrivateRoute = ({ element }: Props) => {

    const { authStatus } = use(UserContext);

    if (authStatus === 'checking') {
        return <div>Loading ...</div>;
    }

    if (authStatus === 'authenticated') {
        return element;
    }

    return <Navigate to='/login' replace />; // replace para quitar la dirección del pila de navegación e impedir ir hacia atrás
};

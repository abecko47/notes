import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../ctx/auth/context";

export default function AuthRoute({children}: React.PropsWithChildren<unknown>) {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
import React, {useEffect, useState} from "react";
import {useAuth} from "../../ctx/auth/context";
import {LoginResultDto} from "../../const/dto/login-result.dto";

export default function LoginPage() {
    const auth = useAuth();
    const [loginResult, setLoginResult] = useState<LoginResultDto | null>(null);

    const run = async () => {
        const res = await auth.login({
            username: "admin",
            password: "admin",
        });

        if (res !== null) {
            setLoginResult(res);
        }
    }

    useEffect(() => {
        run()
    }, []);

    return <>{loginResult?.accessToken}</>;
}
import React from "react";

import axios from "axios";
import {API_URL} from "../../const/config";
import {LoginUserDto} from "../../const/dto/login-user.dto";
import {LoginResultDto} from "../../const/dto/login-result.dto";

export type Context = {
    login: (loginUserDto: LoginUserDto) => Promise<LoginResultDto | null>;
};

const context = React.createContext<Context | null>(null);

export const AuthContextProvider = ({children}: React.PropsWithChildren<unknown>) => {
    const login = async (loginUserDto: LoginUserDto) => {
        const {data, status} = await axios.post<LoginResultDto>(
            `${API_URL}auth/login`,
            {
                headers: {
                    Accept: 'application/json',
                },
                ...loginUserDto,
            }
        );

        if (status === 201) {
            return data;
        }

        return null;
    }

    const value: Context = {
        login,
    };

    return <context.Provider value={value}>{children}</context.Provider>;
}

export const useAuth = () => {
    const ctx = React.useContext(context);

    if (!ctx) {
        throw new Error("useAuth may only be called within a context");
    }
    return ctx;
};
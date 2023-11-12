import React from "react";

import axios from "axios";
import {ACCESS_TOKEN, API_URL} from "../../const/config";
import {LoginUserDto} from "../../const/dto/login-user.dto";
import {LoginResultDto} from "../../const/dto/login-result.dto";

export type Context = {
    login: (loginUserDto: LoginUserDto) => Promise<LoginResultDto | null>;
    accessToken: string | null;
    isSignedIn: boolean;
};

const context = React.createContext<Context | null>(null);

export const AuthContextProvider = ({children}: React.PropsWithChildren<unknown>) => {
    const login = async (loginUserDto: LoginUserDto) => {
        try {
            const {data, status} = await axios.post<LoginResultDto>(
                `${API_URL}auth/login`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    ...loginUserDto,
                }

            );

            window.localStorage.setItem(ACCESS_TOKEN, data.accessToken);

            return data;
        } catch (e) {
            return null;
        }
    }

    const value: Context = {
        login,
        accessToken: window.localStorage.getItem(ACCESS_TOKEN),
        isSignedIn: window.localStorage.getItem(ACCESS_TOKEN) !== null,
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
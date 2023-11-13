import React from "react";

import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "../../const/config";
import { LoginUserDto } from "../../const/dto/LoginUser.dto";
import { LoginResultDto } from "../../const/dto/LoginResult.dto";

export type Context = {
  login: (loginUserDto: LoginUserDto) => Promise<LoginResultDto | null>;
  register: (loginUserDto: LoginUserDto) => Promise<LoginResultDto | null>;
  signOut: () => void;
  accessToken: string | null;
  isSignedIn: boolean;
  authorization: string;
};

const context = React.createContext<Context | null>(null);

export const AuthContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const login = async (loginUserDto: LoginUserDto) => {
    try {
      const { data, status } = await axios.post<LoginResultDto>(
        `${API_URL}auth/login`,
        {
          ...loginUserDto,
        },
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      window.localStorage.setItem(ACCESS_TOKEN, data.accessToken);

      return data;
    } catch (e) {
      return null;
    }
  };

  const register = async (loginUserDto: LoginUserDto) => {
    try {
      const { data, status } = await axios.post<LoginResultDto>(
        `${API_URL}auth/register`,
        {
          ...loginUserDto,
        },
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      window.localStorage.setItem(ACCESS_TOKEN, data.accessToken);

      return data;
    } catch (e) {
      return null;
    }
  };

  const signOut = () => {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.location.pathname = "/";
  };

  const value: Context = {
    login,
    accessToken: window.localStorage.getItem(ACCESS_TOKEN),
    isSignedIn: window.localStorage.getItem(ACCESS_TOKEN) !== null,
    authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
    signOut,
    register,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useAuth = () => {
  const ctx = React.useContext(context);

  if (!ctx) {
    throw new Error("useAuth may only be called within a context");
  }
  return ctx;
};

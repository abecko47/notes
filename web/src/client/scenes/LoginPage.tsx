import React, { useEffect, useState } from "react";
import { useAuth } from "../../ctx/auth/context";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (auth.isSignedIn) {
    return <Navigate to={"/home"} />;
  }

  const login = async () => {
    setIsLoading(true);
    const res = await auth.login({
      username,
      password,
    });

    if (res !== null) {
      window.location.replace("/home");
      return;
    }

    alert("Some error happened, please try again later or with different credentials.");
    setIsLoading(false);
  };

    const register = async () => {
        setIsLoading(true);
        const res = await auth.register({
            username,
            password,
        });

        if (res !== null) {
            window.location.replace("/home");
            return;
        }

        alert("Username already exists, please try another one.");
        setIsLoading(false);
    };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        type={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          login();
        }}
      >
        Login
      </Button>
        <Button
            variant="contained"
            onClick={() => {
                register();
            }}
        >
            Register
        </Button>
    </>
  );
}

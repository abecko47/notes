import React, { useState } from "react";
import { useAuth } from "../../ctx/auth/context";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import { Grid } from "@mui/joy";

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
    <RootLayout>
      <Grid direction={"column"} spacing={2} container xs={12}>
        <Grid xs={12}>
          <Grid container xs={12}>
            <h1>Notes App</h1>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid container xs={9}>
          <Grid xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                login();
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                register();
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </RootLayout>
  );
}

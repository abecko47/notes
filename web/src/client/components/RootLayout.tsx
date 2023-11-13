import React from "react";
import { Grid, styled } from "@mui/joy";
import { RootGrid } from "./StyledComponents";

export default function RootLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <RootGrid container spacing={2}>
      {children}
    </RootGrid>
  );
}

"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  // const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // logout();
    localStorage.clear();
    router.replace("/auth/login");
  }, []);

  return (
    <Fragment>
      <Typography>Logut...</Typography>
    </Fragment>
  );
} 

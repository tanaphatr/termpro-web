import { Typography } from "@mui/material";
import { redirect } from "next/navigation";
import React from "react";

export default function LandingPage() {
  // if (process.env.NEXT_PUBLIC_SITE_TYPE == "standalone") {
  redirect("/auth/login");
  // }
  // return <Typography>Please check site code</Typography>;
}

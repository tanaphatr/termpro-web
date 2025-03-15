import type { Metadata } from "next";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./globals.scss";
import { Toolbar } from "@mui/material";

export const metadata: Metadata = {
  title: "PREDICTTIVE",
  description: "แจ้งและติดตาม PREDICTTIVE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
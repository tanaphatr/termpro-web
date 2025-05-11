"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import bcrypt from 'bcryptjs';
import { Snackbar, Alert } from "@mui/material";

interface Login {
  employee_id: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<Login[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      try {
        const response = await axios.get('/Employees');
        setLogin(response.data);
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    const user = login.find((user) => user.email === email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        router.push("/backhouse/dashboard");
      } else {
        setSnackbarMessage("Invalid password. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("User not found. Please check your email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
        maxHeight: '100vh'
      }}>
        <Box
          sx={{
            display: 'flex', justifyContent: 'center', mb: 3, animation: 'logoFloat 3s ease-in-out infinite'
          }}
        >
          <img
            src="/images/logo.png"
            alt="LOM CHA-AM Logo"
            style={{
              maxWidth: '180px',
              height: 'auto',
              animation: 'logoGlow 2s ease-in-out infinite, logoRotate 8s linear infinite, logoScale 4s ease-in-out infinite'
            }}
          />
          <style jsx global>{`
            @keyframes logoFloat {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            @keyframes logoGlow {
              0%, 100% {
                filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
              }
              50% {
                filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(100, 149, 237, 0.6));
              }
            }

            @keyframes logoRotate {
              0% {
                transform: rotate(0deg);
              }
              25% {
                transform: rotate(2deg);
              }
              75% {
                transform: rotate(-2deg);
              }
              100% {
                transform: rotate(0deg);
              }
            }

            @keyframes logoScale {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
          `}</style>
        </Box>

        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxHeight: 'calc(100vh - 220px)',
            overflow: 'hidden'
          }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                alignSelf: "flex-start",
                marginBottom: "16px",
              }}
            >
              Sign In
            </Typography>
            <Typography sx={{ fontSize: "16px", alignSelf: "flex-start" }}>
              User Account
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ height: "45px", marginBottom: "32px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography sx={{ fontSize: "16px", alignSelf: "flex-start" }}>
              Password
            </Typography>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ height: "60px", marginBottom: "24px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{
                height: "55px",
                width: "100%",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              LOGIN
            </Button>
          </Grid>
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

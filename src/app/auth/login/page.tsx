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
} from "@mui/material";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import bcrypt from 'bcryptjs';

interface login {
  employee_id: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<login[]>([]);
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

  const handleLogin = async () => {
    const user = login.find((user) => user.email === email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        alert("Login successful");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        router.push("/backhouse/dashboard");
      } else {
        alert("Invalid password. Please try again.");
      }
    } else {
      alert("User not found. Please check your email.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
            ลงชื่อเข้าใช้
          </Typography>
          <Typography sx={{ fontSize: "16px", alignSelf: "flex-start" }}>
            บัญชีผู้ใช้
          </Typography>
          <TextField
            label="อีเมล"
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ height: "45px", marginBottom: "32px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography sx={{ fontSize: "16px", alignSelf: "flex-start" }}>
            รหัสผ่าน
          </Typography>
          <TextField
            label="รหัสผ่าน"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ height: "60px", marginBottom: "24px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            เข้าสู่ระบบ
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
}

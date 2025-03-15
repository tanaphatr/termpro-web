'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push(`/backhouse/dashboard`);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'flex-start' }}>
          ลงชื่อเข้าใช้
        </Typography>
        <Box mb={2} />
        <Typography sx={{ fontSize: '16px', alignSelf: 'flex-start' }}>
          บัญชีผู้ใช้
        </Typography>
        <TextField
          label="อีเมล"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="รหัสผ่าน"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          fullWidth
          required
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
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          เข้าสู่ระบบ
        </Button>
      </Box>
    </Container>
  );
}

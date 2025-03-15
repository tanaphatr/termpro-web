'use client';

import React, { Fragment, useState } from 'react';
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
    <Fragment>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        minHeight="100vh"
      >
        <Container maxWidth="sm" sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Box>
            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: '16px' }}>
              ลงชื่อเข้าใช้
            </Typography>
            <Typography sx={{ fontSize: '16px', alignSelf: 'flex-start', marginBottom: '8px' }}>
              บัญชีผู้ใช้
            </Typography>
            <TextField
              label="อีเมล"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              sx={{ height: '45px', marginBottom: '16px' }}
            />
            <Typography sx={{ fontSize: '16px', alignSelf: 'flex-start', marginBottom: '8px' }}>
              รหัสผ่าน
            </Typography>
            <TextField
              label="รหัสผ่าน"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              sx={{ height: '60px', marginBottom: '24px' }}
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
            <Button variant="contained"
              color="primary" onClick={handleLogin}
              fullWidth
              sx={{ height: '55px', width: '100%', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}

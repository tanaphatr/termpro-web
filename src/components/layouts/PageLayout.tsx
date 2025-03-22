'use client';

import React, { ReactNode } from 'react';
import { Grid, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  buttons?: ReactNode[];
  onBack?: () => void; // Add the onBack prop
}

const PageLayout = ({ children, title, buttons = [], onBack }: PageLayoutProps) => {
  return (
    <Grid container sx={{
      flexGrow: 1,
      padding: 2,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          {onBack && (
            <IconButton onClick={onBack} sx={{ marginRight: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h4" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
            {title}
          </Typography>
          {buttons.map((button, index) => (
            <Grid item key={index} sx={{ marginLeft: 1 }}>
              {button}
            </Grid>
          ))}
        </Toolbar>
      </AppBar>
      <Grid item sx={{ flexGrow: 1, paddingTop: 2 }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageLayout;


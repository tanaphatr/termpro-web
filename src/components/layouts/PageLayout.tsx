// PageLayout.js
import React from 'react';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{
      flexGrow: 1,
      padding: 2,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </Box>
  );
};

export default PageLayout;

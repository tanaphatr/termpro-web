'use client';

import React from 'react';
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider 
      maxSnack={3} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
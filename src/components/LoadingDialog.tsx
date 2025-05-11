'use client';

import React from 'react';
import { Dialog, DialogContent, DialogContentText, Box, CircularProgress } from '@mui/material';

interface LoadingDialogProps {
    open: boolean;
    text?: string;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open, text }) => {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        minWidth={300}
                        minHeight={350}
                    >
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            style={{ width: '100px', marginBottom: '30px', marginTop: '30px' }}
                        />
                        {text || 'Data Uploading. Please wait...'}
                        <CircularProgress size={40} sx={{ marginTop: 5, marginBottom: 4 }} />
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;
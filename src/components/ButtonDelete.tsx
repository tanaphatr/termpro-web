'use client';

import React from 'react';
import Button from '@mui/material/Button';

interface ButtonDeleteProps {
    label: string;
    onClick: () => void;
}

export default function ButtonDelete({ label, onClick }: ButtonDeleteProps) {
    return (
        <Button
            variant="contained"
            color="error"
            sx={{ height: 45, minWidth: 120 }}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};


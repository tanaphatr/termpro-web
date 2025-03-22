'use client';

import React from 'react';
import Button from '@mui/material/Button';

interface ButtonAddProps {
    label: string;
    onClick: () => void;
}

export default function ButtonAdd({ label, onClick }: ButtonAddProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ height: 45 ,minWidth: 120 }}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};


'use client';

import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type FormProductValues = {
    id: string;
    productCode: string;
    name: string;
    price: string;
    profit: string;
    quantity: string;
};

export const defaultProductValues: FormProductValues = {
    id: "",
    productCode: "",
    name: "",
    price: "",
    profit: "",
    quantity: "",
};

type FormProductProps = {
    onEdit?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    title: string;
    editMode?: boolean;
    mode?: 'create' | 'edit' | 'view';
    loadingValue?: boolean;
};

export default function Formproduct({ editMode, mode, ...props }: FormProductProps) {
    const { register, formState: { errors } } = useFormContext<FormProductValues>();

    return (
        <Card sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6">{props.title}</Typography>
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Product Code"
                        {...register("productCode")}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.productCode}
                        helperText={errors.productCode ? errors.productCode.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Name"
                        {...register("name")}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Price"
                        {...register("price")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Profit"
                        {...register("profit")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.profit}
                        helperText={errors.profit ? errors.profit.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Quantity"
                        {...register("quantity")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.quantity}
                        helperText={errors.quantity ? errors.quantity.message : ""}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}

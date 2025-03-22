'use client';

import { Box, Card, Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type FormProductValues = {
    id: number;
    productCode: string;
    name: string;
    price: string;
    profit: string;
    quantity: string;
};

export const defaultProductValues: FormProductValues = {
    id: 0,
    productCode: "",
    name: "",
    price: "",
    profit: "",
    quantity: "",
};

export default function Formproduct() {
    const { register, formState: { errors } } = useFormContext<FormProductValues>();

    return (
        <Card sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Product Code"
                        {...register("productCode")}
                        fullWidth
                        margin="normal"
                        error={!!errors.productCode}
                        helperText={errors.productCode ? errors.productCode.message : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Name"
                        {...register("name")}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Price"
                        {...register("price")}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Profit"
                        {...register("profit")}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.profit}
                        helperText={errors.profit ? errors.profit.message : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Quantity"
                        {...register("quantity")}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity ? errors.quantity.message : ""}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}

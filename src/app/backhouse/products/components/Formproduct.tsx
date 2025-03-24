'use client';

import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type FormProductValues = {
    product_id: string;
    product_code: string;
    name: string;
    unit_price: number;
    stock_quantity: number;
    category: string;
    min_stock_level: number;
};

export const defaultProductValues: FormProductValues = {
    product_id: '',
    product_code: '',
    name: '',
    unit_price: 0,
    stock_quantity: 0,
    category: '',
    min_stock_level: 0
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
                        {...register("product_code")}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.product_code}
                        helperText={errors.product_code ? errors.product_code.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Category"
                        {...register("category")}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.category}
                        helperText={errors.category ? errors.category.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Price"
                        {...register("unit_price")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.unit_price}
                        helperText={errors.unit_price ? errors.unit_price.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Quantity"
                        {...register("stock_quantity")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.stock_quantity}
                        helperText={errors.stock_quantity ? errors.stock_quantity.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Min Stock Level"
                        {...register("min_stock_level")}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.stock_quantity}
                        helperText={errors.stock_quantity ? errors.stock_quantity.message : ""}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}

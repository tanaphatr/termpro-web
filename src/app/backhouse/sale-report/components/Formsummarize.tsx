"use client";

import {
    Box,
    Card,
    Divider,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Button,
    IconButton,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonAdd from "@/components/ButtonAdd";
import axios from "axios";

export type FormsummarizeValues = {
    id: string;
    total: string;
    date: Date | null;
    products: { product_code: string; sale_quantity: string; price: string }[];
};

export const defaultReportValues: FormsummarizeValues = {
    id: "",
    total: "",
    date: new Date(),
    products: [],
};

interface ProductSale {
    Product_code: string;
    Quantity: number;
    Total_Sale: string;
}

type FormsummarizeProps = {
    onEdit?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    title: string;
    editMode?: boolean;
    mode?: "create" | "edit" | "view";
    loadingValue?: boolean;
    products?: ProductSale[];
};

export default function Formsummarize({ editMode, mode, products = [], ...props }: FormsummarizeProps) {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<FormsummarizeValues>();

    // console.log("Products in Formsummarize:", products);
    useEffect(() => {
        let total = 0;
        products.forEach((sale) => {
            total += parseFloat(sale.Total_Sale);
        });
        setValue("total", total.toFixed(2));
    }, [products, setValue]);

    return (
        <Fragment>
            <Card sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Totol: {watch("total")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Sales Summary | Count: {products.length}</Typography>
                    </Grid>
                    {products.map((product, index) => (
                        <Fragment key={index}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Product Code"
                                    value={product.Product_code}
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Sale Quantity"
                                    value={product.Quantity}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Total Price"
                                    value={product.Total_Sale}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </Card>
        </Fragment>
    );
}

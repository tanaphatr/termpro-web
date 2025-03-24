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

export type FormReportValues = {
    id: string;
    total: string;
    date: Date | null;
    products: { product_code: string; sale_quantity: string; price: string }[];
};

export const defaultReportValues: FormReportValues = {
    id: "",
    total: "",
    date: new Date(),
    products: [],
};

interface Product {
    [x: string]: string;
    product_id: string;
    product_code: string;
    name: string;
    unit_price: string;
}

type FormReportProps = {
    onEdit?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    title: string;
    editMode?: boolean;
    mode?: "create" | "edit" | "view";
    loadingValue?: boolean;
};

export default function FormReport({ editMode, mode, ...props }: FormReportProps) {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<FormReportValues>();

    const [product, setProducts] = useState<Product[]>([]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const response = await axios.get('/Products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const products = watch("products");

    useEffect(() => {
        let total = 0;
        products.forEach((item, index) => {
            const productDetails = product.find(p => p.product_code === item.product_code);
            if (productDetails) {
                const price = parseFloat(productDetails.unit_price) * parseInt(item.sale_quantity || "0");
                setValue(`products.${index}.price`, price.toFixed(2));
                total += price;
            }
        });
        setValue("total", total.toFixed(2));
    }, [products, setValue, product]);

    return (
        <Fragment>
            <Card sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{props.title}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Total"
                            {...register("total")}
                            fullWidth
                            margin="normal"
                            disabled={true}
                            error={!!errors.total}
                            helperText={errors.total ? errors.total.message : ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Date"
                            {...register("date")}
                            value={new Date().toISOString().split('T')[0]}
                            type="date"
                            fullWidth
                            margin="normal"
                            disabled={true}
                            error={!!errors.date}
                            helperText={errors.date ? errors.date.message : ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Divider />
                        <Typography variant="h6" sx={{ marginTop: 2 }}>กรอกยอดขายสินค้า | จำนวน: {fields.length}</Typography>
                    </Grid>
                    {fields.map((item, index) => (
                        <Fragment key={item.id}>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Product Code"
                                    {...register(`products.${index}.product_code`, { required: "Product Code is required" })}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.products?.[index]?.product_code}
                                    helperText={
                                        errors.products?.[index]?.product_code ? errors.products[index].product_code.message : ""
                                    }
                                >
                                    <MenuItem value="">กรุณาเลือก</MenuItem>
                                    {product.map((product) => (
                                        <MenuItem key={product.product_id} value={product.product_code}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Sale_quantity"
                                    {...register(`products.${index}.sale_quantity`, { required: "Quantity is required" })}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.products?.[index]?.sale_quantity}
                                    helperText={errors.products?.[index]?.sale_quantity ? errors.products[index].sale_quantity.message : ""}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Price"
                                    {...register(`products.${index}.price`)}
                                    type="number"
                                    fullWidth
                                    disabled={true}
                                    margin="normal"
                                    error={!!errors.products?.[index]?.price}
                                    helperText={errors.products?.[index]?.price ? errors.products[index].price.message : ""}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => remove(index)} aria-label="delete" sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Fragment>
                    ))}
                    <Grid item xs={12}>
                        <ButtonAdd label="เพิ่มสินค้า" onClick={() => append({ product_code: "", sale_quantity: "", price: "" })} />
                    </Grid>
                </Grid>
            </Card>
        </Fragment>
    );
}

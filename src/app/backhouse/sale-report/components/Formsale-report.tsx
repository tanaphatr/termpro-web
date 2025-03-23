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
import React, { Fragment, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonAdd from "@/components/ButtonAdd";

export type FormReportValues = {
    id: string;
    total: string;
    date: Date | null;
    products: { product_code: string; quantity: string; price: string }[];
};

export const defaultReportValues: FormReportValues = {
    id: "",
    total: "",
    date: null,
    products: [],
};

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

export default function FormReport({
    editMode,
    mode,
    ...props
}: FormReportProps) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<FormReportValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

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
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Date"
                            {...register("date")}
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
                        <Typography variant="h6" sx={{ marginTop: 2 }}>กรอกยอดขายสินค้า</Typography>
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
                                    <MenuItem value="code1">Code 1</MenuItem>
                                    <MenuItem value="code2">Code 2</MenuItem>
                                    <MenuItem value="code3">Code 3</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Quantity"
                                    {...register(`products.${index}.quantity`, { required: "Quantity is required" })}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.products?.[index]?.quantity}
                                    helperText={errors.products?.[index]?.quantity ? errors.products[index].quantity.message : ""}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Price"
                                    {...register(`products.${index}.price`)}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    disabled={true}
                                    error={!!errors.products?.[index]?.price}
                                    helperText={errors.products?.[index]?.price ? errors.products[index].price.message : ""}
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
                        <ButtonAdd label="เพิ่มสินค้า" onClick={() => append({ product_code: "", quantity: "", price: "" })} />
                    </Grid>
                </Grid>
            </Card>
        </Fragment>
    );
}

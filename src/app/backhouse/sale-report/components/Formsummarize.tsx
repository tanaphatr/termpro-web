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
    total_sale: string;
    total_profit: string;
    date: Date | null;
    products: { product_code: string; sale_quantity: string; price: string }[];
};

export const defaultReportValues: FormsummarizeValues = {
    id: "",
    total_sale: "",
    total_profit: "",
    date: new Date(),
    products: [],
};

interface ProductSale {
    Product_code: string;
    Quantity: number;
    Total_Sale: string;
    Total_Profit: string;
}
interface Product {
    [x: string]: string;
    product_id: string;
    product_code: string;
    unit_profit: string;
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

    const [product, setProducts] = useState<Product[]>([]);
    const [productSales, setProductSales] = useState<ProductSale[]>(products);

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

    useEffect(() => {
        const calculateTotalProfit = () => {
            const updatedProducts = products.map((sale: ProductSale) => {
                const matchingProduct = product.find(
                    (p: Product) => p.product_code === sale.Product_code
                );
                if (matchingProduct) {
                    const totalProfit = (
                        parseFloat(matchingProduct.unit_profit) * sale.Quantity
                    ).toFixed(2);
                    return { ...sale, Total_Profit: totalProfit };
                }
                return sale;
            });
            setProductSales(updatedProducts);
        };
        calculateTotalProfit();
    }, [products, product]);

    useEffect(() => {
        let total_sale = 0;
        products.forEach((sale) => {
            total_sale += parseFloat(sale.Total_Sale);
        });
        setValue("total_sale", total_sale.toFixed(2));
    }, [products, setValue]);

    useEffect(() => {
        let total_profit = 0;
        productSales.forEach((productSale: ProductSale) => {
            total_profit += parseFloat(productSale.Total_Profit);
        });
        setValue("total_profit", total_profit.toFixed(2));
    }, [productSales, setValue]);

    return (
        <Fragment>
            <Card sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Count: {products.length}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Totol Sale: {watch("total_sale")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Totol Profit: {watch("total_profit")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Sales Summary</Typography>
                        <Grid container spacing={2}>
                            {productSales.map((productSale: ProductSale, index: number) => (
                                <Fragment key={index}>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Product Code"
                                            value={productSale.Product_code}
                                            fullWidth
                                            margin="normal"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Sale Quantity"
                                            value={productSale.Quantity}
                                            type="number"
                                            fullWidth
                                            margin="normal"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Total Price"
                                            value={productSale.Total_Sale}
                                            type="number"
                                            fullWidth
                                            margin="normal"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Total Profit"
                                            value={productSale.Total_Profit}
                                            type="number"
                                            fullWidth
                                            margin="normal"
                                            disabled
                                        />
                                    </Grid>
                                </Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Fragment>
    );
}

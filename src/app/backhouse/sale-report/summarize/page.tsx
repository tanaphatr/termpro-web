'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import Formsummarize, { defaultReportValues, FormsummarizeValues } from '../components/Formsummarize'

export default function SaleReport() {
    const router = useRouter();

    const [products, setProducts] = useState([]); // Updated state name

    const methods = useForm<FormsummarizeValues>({
        defaultValues: defaultReportValues,
    });

    const query = async () => {
        const response = await axios.get('/Salesdata');
        // console.log('Query result:', response.data);
        const latestSalesDate = response.data.length > 0
            ? new Date(response.data[response.data.length - 1]?.sale_date).toISOString().split('T')[0]
            : '';
        return latestSalesDate;
    };


    useEffect(() => {
        const fetchSalesData = async () => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            const formattedNextDate = new Date(await query());
            formattedNextDate.setDate(formattedNextDate.getDate() + 1);
            const today = formattedNextDate.toISOString().split('T')[0];
            try {
                const response = await axios.get(`/Product_sales`);
                const filteredProducts = response.data?.filter((product: any) => {
                    const productDate = new Date(product.Date).toISOString().split('T')[0];
                    return product?.Date && productDate === today;
                });
                if (filteredProducts && filteredProducts.length > 0) {
                    setProducts(filteredProducts); // Set products state
                    methods.reset({ ...defaultReportValues, products: filteredProducts });
                    // console.log('Products:', filteredProducts);
                } else {
                    console.warn('No matching products found for today.');
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSalesData();
    }, [methods]);

    const handleSubmit = () => {
        methods.handleSubmit(async (data) => {
            setisLoadOpen(true);
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const formattedNextDate = new Date(await query());
                formattedNextDate.setDate(formattedNextDate.getDate() + 1);
                const sale_date = formattedNextDate.toISOString().split('T')[0];

                const saleData = {
                    sale_date: sale_date,
                    sales_amount: data.total_sale,
                    profit_amount: data.total_profit,
                };

                await axios.post(`/Salesdata`, saleData);
                // console.log('Sale data submitted:', response.data);

                // alert('Data submitted successfully');
                router.push('/backhouse/sale-report');
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        })();
    }

    const handleOnBack = () => {
        router.push('/backhouse/sale-report');
    }

    const [isLoadOpen, setisLoadOpen] = useState(false);

    return (
        <PageLayout title="Sales Report" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="Confirm" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
                <Formsummarize title="Sales Report" products={products} /> {/* Pass products as a prop */}
                <Dialog open={isLoadOpen}>
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
                                Data Uploading. Please wait...
                                <CircularProgress size={40} sx={{ marginTop: 5, marginBottom: 4 }} />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </FormProvider>
        </PageLayout>
    )
}

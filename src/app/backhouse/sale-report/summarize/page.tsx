'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Typography } from '@mui/material'
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

    useEffect(() => {
        const fetchSalesData = async () => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            const today = new Date().toISOString().split('T')[0];
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
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const saleData = {
                    sale_date: data.date,
                    sales_amount: data.total,
                };
                const response = await axios.post(`/Salesdata`, saleData);
                console.log('Sale data submitted:', response.data);

                alert('Data submitted successfully');
                router.push('/backhouse/dashboard');
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        })();
    }

    const handleOnBack = () => {
        router.push('/backhouse/sale-report');
    }

    return (
        <PageLayout title="รายงานการขาย" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
                <Formsummarize title="รายงานการขาย" products={products} /> {/* Pass products as a prop */}
            </FormProvider>
        </PageLayout>
    )
}

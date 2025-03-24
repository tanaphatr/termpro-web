'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Typography } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormReport, { defaultReportValues, FormReportValues } from './components/Formsale-report'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SaleReport() {
  const router = useRouter();

  const methods = useForm<FormReportValues>({
    defaultValues: defaultReportValues,
  });

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

        const productData = data.products.map((product) => ({
          Product_code: product.product_code,
          Date: data.date,
          Quantity: product.sale_quantity,
          Total_Sale: product.price,
        }));
        await axios.post(`/Product_sales`, productData);
        alert('Data submitted successfully');
        router.push('/backhouse/dashboard');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    })();
  }

  return (
    <PageLayout title="รายงานการขาย"
      buttons={[
        <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />
      ]}>
      <FormProvider {...methods}>
        <FormReport title="รายงานการขาย" />
      </FormProvider>
    </PageLayout>
  )
}

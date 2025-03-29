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
        const productData = data.products.map((product) => ({
          Product_code: product.product_code,
          Date: data.date,
          Quantity: product.sale_quantity,
          Total_Sale: product.price,
        }));
        await axios.post(`/Product_sales`, productData);
        router.push('/backhouse/sale-report');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    })();
  }

  const handleSummari = () => {
    router.push('/backhouse/sale-report/summarize')
  }

  return (
    <PageLayout title="รายงานการขาย"
      buttons={[
        <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />,
        <ButtonAdd label="สรุปยอด" onClick={handleSummari} />
      ]}>
      <FormProvider {...methods}>
        <FormReport title="รายงานการขาย" />
      </FormProvider>
    </PageLayout>
  )
}

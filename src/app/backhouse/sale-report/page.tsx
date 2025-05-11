'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormReport, { defaultReportValues, FormReportValues } from './components/Formsale-report'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingDialog from '@/components/LoadingDialog'

export default function SaleReport() {
  const router = useRouter();
  const [isLoadOpen, setisLoadOpen] = useState(false);
  const [sale_date, setSaleDate] = useState('');
  const methods = useForm<FormReportValues>({
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

  React.useEffect(() => {
    const fetchSaleDate = async () => {
      const latestDate = await query();
      const formattedNextDate = new Date(latestDate);
      formattedNextDate.setDate(formattedNextDate.getDate() + 1);
      const nextSaleDate = formattedNextDate.toISOString().split('T')[0];
      setSaleDate(nextSaleDate);
    };
    fetchSaleDate();
  }, []);

  const handleSubmit = () => {
    methods.handleSubmit(async (data) => {
      setisLoadOpen(true);
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      try {
        const productData = data.products.map((product) => ({
          Product_code: product.product_code,
          Date: sale_date,
          Quantity: product.sale_quantity,
          Total_Sale: product.price,
        }));
        await axios.post(`/Product_sales`, productData);
        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
        window.location.reload();
      }
    })();
  }

  const handleSummari = () => {
    router.push('/backhouse/sale-report/summarize')
  }



  return (
    <PageLayout title="Sale Report"
      buttons={[
        <ButtonAdd label="Confirm" onClick={handleSubmit} />,
        <ButtonAdd label="Summarize" onClick={handleSummari} />
      ]}>
      <FormProvider {...methods}>
        <FormReport title="Sale Report" date={sale_date} />
        <LoadingDialog open={isLoadOpen} text="Data Uploading. Please wait..." />
      </FormProvider>
    </PageLayout>
  )
}

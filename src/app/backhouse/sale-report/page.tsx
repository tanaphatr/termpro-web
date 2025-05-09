'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormReport, { defaultReportValues, FormReportValues } from './components/Formsale-report'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SaleReport() {
  const router = useRouter();

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

  const handleSubmit = () => {
    methods.handleSubmit(async (data) => {
      setisLoadOpen(true);
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      try {
        const latestSalesDate = await query();
        const nextDate = new Date(latestSalesDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const formattedNextDate = nextDate.toISOString().split('T')[0];
        console.log('Formatted Next Date:', formattedNextDate);

        const productData = data.products.map((product) => ({
          Product_code: product.product_code,
          Date: formattedNextDate,
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

  const [isLoadOpen, setisLoadOpen] = useState(false);

  return (
    <PageLayout title="Sale Report"
      buttons={[
        <ButtonAdd label="Confirm" onClick={handleSubmit} />,
        <ButtonAdd label="Summarize" onClick={handleSummari} />
      ]}>
      <FormProvider {...methods}>
        <FormReport title="Sale Report" />
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

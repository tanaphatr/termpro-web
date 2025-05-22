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
import { useSnackbar } from 'notistack';

export default function SaleReport() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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

        // Update stock quantities after sales are submitted
        await updateStockQuantities(
          data.products.map((product) => ({
            product_code: product.product_code,
            sale_quantity: Number(product.sale_quantity),
          }))
        );

        enqueueSnackbar('SAVE Product sales !', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
        enqueueSnackbar(' ERRO SAVE !', { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        window.location.reload();
      }
    })();
  }

  // Update stock_quantity after submitting sales
  const updateStockQuantities = async (products: { product_code: string; sale_quantity: number }[]) => {
    try {
      // Fetch all products to get current stock quantities
      const res = await axios.get('/Products');
      const allProducts = res.data;

      // Prepare update requests
      const updateRequests = products.map((product) => {
        const matchedProduct = allProducts.find((p: any) => p.product_code === product.product_code);
        if (!matchedProduct) return alert(`Product not found: ${product.product_code}`);
        const newStockQuantity = (matchedProduct.stock_quantity || 0) - product.sale_quantity;
        // Use PUT instead of PATCH
        alert(`Updating product: ${matchedProduct.product_code}, New stock quantity: ${newStockQuantity}`);
        return axios.put(`/Products/${matchedProduct.id}`, { ...matchedProduct, stock_quantity: newStockQuantity });
      }).filter(Boolean);

      await Promise.all(updateRequests);
    } catch (err) {
      console.error('Error updating stock quantities:', err);
    }
  };

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

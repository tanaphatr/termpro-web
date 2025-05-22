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
        // Check stock before submitting sales
        const stockOk = await updateStockQuantities(
          data.products.map((product) => ({
            product_code: product.product_code,
            sale_quantity: Number(product.sale_quantity),
          }))
        );

        if (!stockOk) {
          setisLoadOpen(false);
          return; // Stop if stock is insufficient
        }

        const productData = data.products.map((product) => ({
          Product_code: product.product_code,
          Date: sale_date,
          Quantity: product.sale_quantity,
          Total_Sale: product.price,
        }));
        await axios.post(`/Product_sales`, productData);

        enqueueSnackbar('SAVE Product sales !', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
        enqueueSnackbar(' ERRO SAVE !', { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        window.location.reload();
      }
    })();
  }

  // Return true if stock is sufficient, false otherwise
  const updateStockQuantities = async (products: { product_code: string; sale_quantity: number }[]) => {
    try {
      // Fetch all products to get current stock quantities
      const res = await axios.get('/Products');
      const allProducts = res.data;

      // Map product_code to total sale_quantity (in case of duplicates)
      const productSaleMap = products.reduce((acc, curr) => {
        acc[curr.product_code] = (acc[curr.product_code] || 0) + curr.sale_quantity;
        return acc;
      }, {} as Record<string, number>);

      // Check for insufficient stock
      const insufficientStock: string[] = [];
      Object.entries(productSaleMap).forEach(([product_code, totalSaleQuantity]) => {
        const matchedProduct = allProducts.find((p: any) => p.product_code === product_code);
        if (!matchedProduct || (matchedProduct.stock_quantity || 0) < totalSaleQuantity) {
          insufficientStock.push(matchedProduct?.name || product_code);
        }
      });

      if (insufficientStock.length > 0) {
        enqueueSnackbar(
          `สินค้า ${insufficientStock.join(', ')} มีจำนวนไม่พอใน stock`,
          { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }
        );
        return false; // Stock not enough
      }

      // Prepare update requests for each unique product_code
      const updateRequests = Object.entries(productSaleMap).map(([product_code, totalSaleQuantity]) => {
        const matchedProduct = allProducts.find((p: any) => p.product_code === product_code);
        if (!matchedProduct) return null;
        const newStockQuantity = (matchedProduct.stock_quantity || 0) - totalSaleQuantity;
        return axios.put(`/Products/${matchedProduct.product_id}`, { ...matchedProduct, stock_quantity: newStockQuantity });
      }).filter(Boolean);

      await Promise.all(updateRequests);
      return true; // Stock is sufficient and updated
    } catch (err) {
      console.error('Error updating stock quantities:', err);
      throw err;
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

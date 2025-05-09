'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Pagination } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ButtonAdd from '@/components/ButtonAdd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  product_id: string;
  product_code: string;
  name: string;
  unit_price: number;
  unit_profit: number;
  stock_quantity: number;
  category: string;
}

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

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

  const handleClickAdd = () => {
    router.push('products/create');
  }

  const handleClickView = (id: string) => {
    router.push(`products/${id}`);
  }

  return (
    <PageLayout
      title="Products"
      buttons={[
        <ButtonAdd label="Add Product" onClick={handleClickAdd} />
      ]}
    >
      <TableContainer component={Paper} sx={{ minHeight: '538px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Code</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price/Unit</TableCell>
              <TableCell>Profit/Unit</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.product_id} sx={{ height: '40px' }}>
                <TableCell>{product.product_code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>฿{product.unit_price}</TableCell>
                <TableCell>฿{product.unit_profit}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view" onClick={() => handleClickView(product.product_id)} size="medium">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(products.length / rowsPerPage)}
          page={page + 1}
          onChange={(event, value) => setPage(value - 1)}
          color="primary"
        />
      </Box>
    </PageLayout>
  )
}
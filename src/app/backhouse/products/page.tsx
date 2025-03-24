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
  stock_quantity: number;
  category: string;
}

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      title="สินค้า"
      buttons={[
        <ButtonAdd label="เพิ่มสินค้า" onClick={handleClickAdd} />
      ]}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รหัสสินค้า</TableCell>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell>หมวดหมู่</TableCell>
              <TableCell>ราคา/ชิ้น</TableCell>
              <TableCell>จำนวนสินค้า</TableCell>
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
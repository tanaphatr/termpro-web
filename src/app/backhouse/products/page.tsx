'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ButtonAdd from '@/components/ButtonAdd';
import { useRouter } from 'next/navigation';

const products = [
  { id: '1', productCode: 'P001', name: 'Product 1', price: 100, profit: 50, quantity: 10 },
  { id: '2', productCode: 'P002', name: 'Product 2', price: 200, profit: 50, quantity: 20 },
  { id: '3', productCode: 'P003', name: 'Product 3', price: 300, profit: 50, quantity: 30 },
]

export default function Products() {
  const router = useRouter();

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
      < TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รหัสสินค้า</TableCell>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell>ราคา/ชิ้น</TableCell>
              <TableCell>กำไร/ชิ้น</TableCell>
              <TableCell>จำนวนสินค้า</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productCode}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>${product.profit}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view" onClick={() => handleClickView(product.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </PageLayout >
  )
}

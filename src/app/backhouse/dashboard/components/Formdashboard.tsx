'use client';

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Graph from './Graph';
import Predictable from './Predictable';

interface FormdashboardProps {
    salesData: { name: string, Sales: number, profit: number }[];
    productData: { productcode: string, productname: string, quantity: number }[];
    yesterdaySales: number;
    yesterdayPrediction: number;
    todaySales: number;
    todayDate: string;
}

export default function Formdashboard({
    salesData,
    productData,
    yesterdaySales,
    yesterdayPrediction,
    todaySales,
    todayDate
}: FormdashboardProps) {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                แดชบอร์ด
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, height: 200 }}>
                <Card sx={{ flex: 1.5, marginRight: 2 }}>
                    <CardContent sx={{ padding: 4 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ยอดขายเมื่อวาน</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{yesterdaySales} บาท</Typography>
                        <Typography variant="body2">ผลการทำนายเมื่อวาน: {yesterdayPrediction} บาท</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1.5, marginRight: 2 }}>
                    <CardContent sx={{ padding: 4 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ผลการทำนายของวันนี้</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{todaySales} บาท</Typography>
                        <Typography variant="body2">วันที่: {todayDate}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6"></Typography>
                        <Typography variant="h4"></Typography>
                        <Typography variant="body2"></Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, height: 400 }}>
                <Card sx={{ flex: 3.05, marginRight: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 4 }}>กราฟยอดขาย</Typography>
                        <Graph data={salesData}></Graph>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">ผลการทำนายเฉพาะสินค้า</Typography>
                        <Predictable products={productData}></Predictable>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

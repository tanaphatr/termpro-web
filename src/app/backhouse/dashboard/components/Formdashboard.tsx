'use client';

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
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
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ยอดขายเมื่อวาน</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{yesterdaySales} บาท</Typography>
                        <Typography variant="body2">ผลการทำนายเมื่อวาน: {yesterdayPrediction} บาท</Typography>
                    </CardContent>
                </Card >
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ผลการทำนายของวันนี้</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{todaySales} บาท</Typography>
                        <Typography variant="body2">วันที่: {todayDate}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6"></Typography>
                        <Typography variant="h4"></Typography>
                        <Typography variant="body2"></Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{ height: 400 }}>
                    <CardContent>
                        <Typography variant="h6">กราฟยอดขาย</Typography>
                        <Graph data={salesData}></Graph>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 400 }}>
                    <CardContent>
                        <Typography variant="h6">ผลการทำนายเฉพาะสินค้า</Typography>
                        <Predictable products={productData}></Predictable>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

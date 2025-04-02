'use client';

import React, { Fragment, useState } from 'react';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, LabelList, ResponsiveContainer } from 'recharts';

interface FormdashboardProps {
    salesData: { name: string, Sales: number, profit: number }[];
    productData: { productcode: string, productname: string, quantity: number }[];
    yesterdaySales: number;
    yesterdayPrediction: number;
    todaySales: number;
    todayDate: string;
    weather: string; // เพิ่มข้อมูลสภาพอากาศ
    temperature: number; // เพิ่มข้อมูลอุณหภูมิ
    onGraphTypeChange: (type: 'daily' | 'monthly') => void;
}

export default function Formdashboard({
    salesData,
    productData,
    yesterdaySales,
    yesterdayPrediction,
    todaySales,
    todayDate,
    weather,
    temperature, // รับค่า Props
    onGraphTypeChange
}: FormdashboardProps) {

    const [graphType, setGraphType] = useState<'daily' | 'monthly'>('monthly');

    const handleGraphTypeChange = (event: SelectChangeEvent<'daily' | 'monthly'>) => {
        const selectedType = event.target.value as 'daily' | 'monthly';
        setGraphType(selectedType);
        onGraphTypeChange(selectedType);
    };

    const Graph = ({ data }: { data: { name: string; Sales: number; profit: number }[] }) => (
        <Fragment>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Select
                    value={graphType}
                    onChange={handleGraphTypeChange}
                    variant="outlined"
                    sx={{ width: 150, height: 40, marginLeft: 'auto' }}
                    displayEmpty
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
            </FormControl>
            <ResponsiveContainer width="100%" height={300}>
                {graphType === 'monthly' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            ticks={[0, 150000, 300000, 450000, 600000]}
                            domain={[0, 600000]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sales" fill="#8884d8" />
                        <Bar dataKey="profit" fill="#82ca9d" />
                    </BarChart>
                ) : (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            ticks={[0, 5000, 10000, 20000, 30000]}
                            domain={[0, 30000]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sales" fill="#8884d8" />
                        <Bar dataKey="profit" fill="#82ca9d" />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </Fragment>
    );

    const Predictable = ({ products }: { products: { productcode: string; productname: string; quantity: number }[] }) => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Code</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{product.productcode}</TableCell>
                            <TableCell>{product.productname}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ยอดขายเมื่อวาน</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{yesterdaySales} บาท</Typography>
                    </CardContent>
                </Card >
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>ผลการทำนายของวันนี้</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{todaySales} บาท</Typography>
                        <Typography variant="body2">Date: {new Date(todayDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>สภาพอากาศวันนี้</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{weather}</Typography>
                        <Typography variant="body2">อุณหภูมิ: {temperature}°C</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{ height: 500 }}>
                    <CardContent>
                        <Typography variant="h6">กราฟยอดขาย</Typography>
                        <Graph data={salesData}></Graph>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 500 }}>
                    <CardContent>
                        <Typography variant="h6">ผลการทำนายเฉพาะสินค้า</Typography>
                        <Predictable products={productData}></Predictable>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

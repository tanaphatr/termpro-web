'use client';

import React, { Fragment, useState } from 'react';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Pagination } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, LabelList, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts';

interface FormdashboardProps {
    salesData: { name: string, Sales: number, profit: number }[];
    productData: { productcode: string, productname: string, quantity: number }[];
    GoodsaleproductData: { productcode: string, productname: string, quantity: number, totalSale: number }[];
    PieData: { category: string, productCount: number, AvgQuantity: number, AvgTotalSale: number }[];
    yesterdaySales: number;
    yesterdayPrediction: number;
    todaySales: number;
    todayDate: string;
    weather: string; // Added weather information
    temperature: number; // Added temperature information
    onGraphTypeChange: (type: 'daily' | 'monthly') => void;
}

export default function Formdashboard({
    salesData,
    productData,
    GoodsaleproductData,
    yesterdaySales,
    yesterdayPrediction,
    todaySales,
    todayDate,
    weather,
    temperature,
    PieData,
    onGraphTypeChange
}: FormdashboardProps) {
    console.log('PieData:', PieData);
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

    const Sales_good = ({ products }: { products: { productcode: string; productname: string; quantity: number; totalSale: number }[] }) => {
        const [page, setPage] = useState(0);
        const [sortBy, setSortBy] = useState<'quantity' | 'totalSale'>('quantity');
        const rowsPerPage = 5;

        const paginatedProducts = products.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

        return (
            <>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">Top Selling Products</Typography>
                    <FormControl variant="outlined" size="small" sx={{ width: 150 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value as 'quantity' | 'totalSale')}
                            label="Sort By"
                        >
                            <MenuItem value="quantity">Quantity</MenuItem>
                            <MenuItem value="totalSale">Total Sale</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Code</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total Sale (THB)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedProducts
                                .sort((a, b) => sortBy === 'quantity' ? b.quantity - a.quantity : b.totalSale - a.totalSale)
                                .map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productcode}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.totalSale}</TableCell>
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
            </>
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Yesterday's Sales</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{yesterdaySales} THB</Typography>
                    </CardContent>
                </Card >
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Today's Prediction</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{todaySales} THB</Typography>
                        <Typography variant="body2">Date: {new Date(todayDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Today's Weather</Typography>
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>{weather}</Typography>
                        <Typography variant="body2">Temperature: {temperature}°C</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{ height: 500 }}>
                    <CardContent>
                        <Typography variant="h6">Sales Graph</Typography>
                        <Graph data={salesData}></Graph>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 500 }}>
                    <CardContent>
                        <Typography variant="h6">Product Predictions</Typography>
                        <Predictable products={productData}></Predictable>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 450 }}>
                    <CardContent>
                        <Sales_good products={GoodsaleproductData}></Sales_good>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 450 }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Top Product Categories</Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={PieData}
                                    dataKey="productCount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={130}
                                    fill="#8884d8"
                                    label
                                >
                                    {PieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 80%)`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

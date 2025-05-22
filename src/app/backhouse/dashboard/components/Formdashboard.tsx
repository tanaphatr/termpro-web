'use client';

import React, { Fragment, useState } from 'react';

// Define an array of colors for the pie chart
const PIE_COLORS = ['#4a148c', '#2e7d32', '#ff6f00', '#d84315', '#0277bd', '#c0ca33', '#558b2f', '#ff8f00', '#bf360c', '#01579b', '#9e9d24', '#33691e'];
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Pagination, TextField, Button } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, LabelList, ResponsiveContainer, Cell, Pie, PieChart, LegendProps as LegendRendererProps } from 'recharts';

interface FormdashboardProps {
    salesData: { name: string, Sales: number, profit: number }[];
    productData: { productcode: string, productname: string, quantity: number }[];
    percentError: { type: string, sale: number, predic: number }[];
    GoodsaleproductData: { productcode: string, productname: string, quantity: number, totalSale: number }[];
    PieData: { category: string, productCount: number}[];
    pieStartDate: string;
    pieEndDate: string;
    onPieDateChange: (start: string, end: string) => void;
    yesterdaySales: number;
    yesterdayPrediction: number;
    todaySales: number;
    todayDate: string;
    weather: string; // Added weather information
    temperature: number; // Added temperature information
    onGraphTypeChange: (type: 'daily' | 'monthly') => void;
    ondifferenceTypeChange: (type: 'daily' | 'weekly') => void;
    onPieTypeChange: (type: 'daily' |'weekly'| 'monthly') => void;
}

export default function Formdashboard({
    salesData,
    productData,
    GoodsaleproductData,
    percentError,
    yesterdaySales,
    yesterdayPrediction,
    todaySales,
    todayDate,
    weather,
    temperature,
    PieData,
    pieStartDate,
    pieEndDate,
    onPieDateChange,
    onGraphTypeChange,
    ondifferenceTypeChange,
    onPieTypeChange,
}: FormdashboardProps) {
    // console.log('PieData:', PieData);
    const [graphType, setGraphType] = useState<'daily' | 'monthly'>('monthly');
    const [differenceType, setdifferenceType] = useState<'daily' | 'weekly'>('daily');

    const barChartLegend: Partial<LegendRendererProps> = {
        // direction: isLargeScreen ? 'column' : 'row',
        // position: isLargeScreen
        //   ? { vertical: 'middle', horizontal: 'right' }
        //   : { vertical: 'bottom', horizontal: 'middle' },
        direction: 'row',
        align: 'center',
        verticalAlign: 'bottom',
        // Removed invalid properties
        // padding: isLargeScreen ? 10 : 0,
        wrapperStyle: { fontSize: '12px', fontWeight: 'bold' },
        // Removed invalid property 'itemGap'
    };

    const donutChartLegend: Partial<LegendRendererProps> = {
        ...barChartLegend,
        direction: 'column',
        align: 'left',
        verticalAlign: 'middle',
    };

    const sizePie = {
        height: 230,
    };

    const handleGraphTypeChange = (event: SelectChangeEvent<'daily' | 'monthly'>) => {
        const selectedType = event.target.value as 'daily' | 'monthly';
        setGraphType(selectedType);
        onGraphTypeChange(selectedType);
    };

    const handleDifferenceTypeChange = (event: SelectChangeEvent<'daily' | 'weekly'>) => {
        const selectedType = event.target.value as 'daily' | 'weekly';
        setdifferenceType(selectedType);
        ondifferenceTypeChange(selectedType);
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
                        <Bar dataKey="Sales" fill="#112D4E" />
                        <Bar dataKey="profit" fill="#3F72AF" />
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
                        <Bar dataKey="Sales" fill="#112D4E" />
                        <Bar dataKey="profit" fill="#3F72AF" />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </Fragment>
    );

    const Predictable = ({ products }: { products: { productcode: string; productname: string; quantity: number }[] }) => (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
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

    const Productsaletable = ({ percentError }: { percentError: { type: string; sale: number; predic: number }[] }) => (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Sales</TableCell>
                        <TableCell>Predictive</TableCell>
                        <TableCell>Difference</TableCell>
                        <TableCell>Difference (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {percentError.map((percentError: { type: string; sale: number; predic: number }, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{percentError.type}</TableCell>
                            <TableCell>{percentError.sale.toFixed(2)}</TableCell>
                            <TableCell>{percentError.predic.toFixed(2)}</TableCell>
                            <TableCell>{Math.abs(percentError.sale - percentError.predic).toFixed(2)}</TableCell>
                            <TableCell>
                                {percentError.type === 'Daily'
                                    ? (Number(yesterdaySales) === 0 || percentError.predic === 0
                                        ? 'N/A'
                                        : (() => {
                                            const diff = (Math.abs(Number(yesterdaySales) - percentError.predic) / Math.min(Number(yesterdaySales), percentError.predic)) * 100;
                                            return diff > 100 ? (diff / 10).toFixed(2) + '%' : diff.toFixed(2) + '%';
                                        })())
                                    : (percentError.sale === 0 || percentError.predic === 0
                                        ? 'N/A'
                                        : (() => {
                                            const diff = (Math.abs(percentError.sale - percentError.predic) / Math.min(percentError.sale, percentError.predic)) * 100;
                                            return diff > 100 ? (diff / 10).toFixed(2) + '%' : diff.toFixed(2) + '%';
                                        })())}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const Sales_good = ({ products }: { products: { productcode: string; productname: string; quantity: number; totalSale: number }[] }) => {
        const [page, setPage] = useState(0);
        const [sortBy, setSortBy] = useState<'quantity' | 'totalSale'>('quantity');
        const rowsPerPage = 7;

        const sortedProducts = [...products].sort((a, b) =>
            sortBy === 'quantity' ? b.quantity - a.quantity : b.totalSale - a.totalSale
        );

        const paginatedProducts = sortedProducts.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Code</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total Profit(THB)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedProducts.map((product, index) => (
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
                        count={Math.ceil(sortedProducts.length / rowsPerPage)}
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
                <Card sx={{ height: 170, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Yesterday's Sales</Typography>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}><span style={{ color: '#F7374F' }}>{yesterdaySales}</span> THB</Typography>
                        <Typography variant="body2">Date: {new Date(new Date(todayDate).setDate(new Date(todayDate).getDate() - 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
                    </CardContent>
                </Card >
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Today's Prediction</Typography>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}><span style={{ color: '#41D4A8' }}>{Number(todaySales).toFixed(2)}</span> THB</Typography>
                        <Typography variant="body2">Date: {new Date(todayDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 170, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Today's Weather</Typography>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>{weather}</Typography>
                        <Typography variant="body2">Temperature: <span style={{ color: '#F7374F' }}>{temperature}°C</span></Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{ height: 500, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6">Sales Graph</Typography>
                        <Graph data={salesData}></Graph>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 500, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6">Product Predictions</Typography>
                        <Predictable products={productData}></Predictable>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 600, borderRadius: 5 }}>
                    <CardContent>
                        <Sales_good products={GoodsaleproductData}></Sales_good>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 600, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6">Category Sale Data</Typography>
                        <Box display="flex" alignItems="center" gap={2} mt={1} mb={5}>
                            <TextField
                                label="Start Date"
                                type="date"
                                size="small"
                                value={pieStartDate}
                                onChange={e => onPieDateChange(e.target.value, pieEndDate)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ flex: 1 }}
                            />
                            <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>to</Typography>
                            <TextField
                                label="End Date"
                                type="date"
                                size="small"
                                value={pieEndDate}
                                onChange={e => onPieDateChange(pieStartDate, e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ flex: 1 }}
                            />
                            {/* <Button
                                onClick={() => onPieDateChange(pieStartDate, pieEndDate)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Confirm
                            </Button> */}
                        </Box>
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={PieData.sort((a, b) => b.productCount - a.productCount).map(item => ({ name: item.category, value: item.productCount }))}
                                    cx="50%"
                                    innerRadius={90}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={1}
                                >
                                    {PieData.sort((a, b) => b.productCount - a.productCount).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                                            name={`${entry.category} (${((entry.productCount / PieData.reduce((sum, item) => sum + item.productCount, 0)) * 100).toFixed(2)}% : ${entry.productCount})`}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${((value / PieData.reduce((sum, item) => sum + item.productCount, 0)) * 100).toFixed(2)}%`} />
                                <Legend
                                    layout="vertical"
                                    align="left"
                                    verticalAlign="middle"
                                    wrapperStyle={{
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        lineHeight: '2',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4} >
                <Card sx={{ height: 600, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h6">Product Difference ({new Date(new Date(todayDate).setDate(new Date(todayDate).getDate() - 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })})</Typography>
                        {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <Select
                                value={differenceType}
                                onChange={handleDifferenceTypeChange}
                                variant="outlined"
                                sx={{ width: 150, height: 40, marginLeft: 'auto' }}
                                displayEmpty
                            >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">weekly</MenuItem>
                            </Select>
                        </FormControl> */}
                        <Productsaletable percentError={percentError}></Productsaletable>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

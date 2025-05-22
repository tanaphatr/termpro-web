'use client';

import PageLayout from '@/components/layouts/PageLayout';
import React, { Fragment, useEffect, useState } from 'react'; // Ensure useState is imported
import Formdashboard from './components/Formdashboard';
import axios from 'axios';
import ButtonAdd from '@/components/ButtonAdd';
import { Box, Button, CircularProgress } from '@mui/material';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import LoadingDialog from '@/components/LoadingDialog';

interface DashboardData {
  salesData: any;
  productData: any;
  yesterdaySales: any;
  yesterdayPrediction: any;
  todaySales: any;
  todayDate: any;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [Predictive, setPredictive] = useState<any>({});
  const [Salesdata, setSalesdata] = useState<any[]>([]);
  const [GrapData, setGrapData] = useState<any[]>([]);
  const [graphType, setGraphType] = useState<'daily' | 'monthly'>('monthly');
  const [differenceType, setdifferenceType] = useState<'daily' | 'weekly'>('daily');
  const [pieType, setPieType] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [weather, setWeather] = useState<string>(''); // เก็บข้อมูลสภาพอากาศ
  const [temperature, setTemperature] = useState<number>(0); // เก็บข้อมูลอุณหภูมิ
  const [GoodproductData, setGoodproductData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [difference, setDifference] = useState<any[]>([]);
  const [pieStartDate, setPieStartDate] = useState<string>('2024-01-01');
  const [pieEndDate, setPieEndDate] = useState<string>('2024-01-31');
  // console.log('difference:', difference);
  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

    const fetchPredictives = async () => {
      try {
        setPredictive({}); // Set to empty object to indicate "Waiting Predictive"
        const response = await axios.get('/History_predic');
        const rawData = response.data;

        // Find the latest date
        const latestDate = rawData.reduce((latest: string, item: any) => {
          return item.date > latest ? item.date : latest;
        }, '');

        // Filter data for the latest date
        const latestData = rawData.filter((item: any) => item.date === latestDate);

        // Transform the data into a structured format
        const transformedData = latestData.reduce((acc: any, item: any) => {
          const date = item.date;
          if (!acc[date]) {
            acc[date] = { daily: 0, products: [] };
          }

          if (item.type === 'Daily') {
            acc[date].daily = item.result;
          } else {
            acc[date].products.push({ type: item.type.trim(), result: item.result });
          }

          return acc;
        }, {});

        setPredictive(transformedData);
      } catch (error) {
        console.error('Error fetching predictive data:', error);
      }
    };

    const fetchDiferen = async () => {
      try {
      const responsePredictive = await axios.get('/History_predic');
      const rawPredictiveData = responsePredictive.data;

      // Find the latest date
      const latestDate = rawPredictiveData.reduce((latest: string, item: any) => {
        return item.date && item.date > latest ? item.date : latest;
      }, '');

      // Get the date before the latest date
      const previousDate = new Date(latestDate);
      previousDate.setDate(previousDate.getDate() - 1);
      const previousDateString = previousDate.toISOString().split('T')[0];

      // Calculate the start of the week for weekly comparison
      const startOfWeek = new Date(latestDate);
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const startOfWeekString = startOfWeek.toISOString().split('T')[0];

      // Fetch actual sales data
      const responseSales = await axios.get('/Salesdata');
      const rawSalesData = responseSales.data;

      let percentError = [];

      if (differenceType === 'daily') {
        // Filter predictive data for the previous date (exclude 'Daily' type)
        const previousPredictiveData = rawPredictiveData.filter(
        (item: any) => item.date && item.date.split('T')[0] === previousDateString
        );

        percentError = previousPredictiveData.map((predicItem: any) => {
        if (predicItem.type === 'Daily') {
          const actualDailySales = rawSalesData
          .filter(
            (saleItem: any) =>
            new Date(saleItem.sale_date).toISOString().split('T')[0] === previousDateString
          )
          .reduce((total: number, saleItem: any) => total + Number(saleItem.sales_amount), 0);

          return {
          type: predicItem.type,
          sale: actualDailySales || 0,
          predic: Number(predicItem.result),
          };
        } else {
          const actualSalesForDateAndProduct = rawSalesData
          .filter(
            (saleItem: any) =>
            saleItem.Product_code === predicItem.type &&
            new Date(saleItem.sale_date).toISOString().split('T')[0] === previousDateString
          )
          .reduce((total: number, saleItem: any) => total + Number(saleItem.Quantity), 0);

          return {
          type: predicItem.type,
          sale: actualSalesForDateAndProduct || 0,
          predic: Number(predicItem.result),
          };
        }
        });
      } else if (differenceType === 'weekly') {
        // Filter predictive data for the past week
        const weeklyPredictiveData = rawPredictiveData.filter(
        (item: any) =>
          item.date &&
          new Date(item.date) >= new Date(startOfWeekString) &&
          new Date(item.date) <= new Date(latestDate)
        );

        percentError = weeklyPredictiveData.map((predicItem: any) => {
        if (predicItem.type === 'Daily') {
          const actualWeeklySales = rawSalesData
          .filter(
            (saleItem: any) =>
            new Date(saleItem.sale_date) >= new Date(startOfWeekString) &&
            new Date(saleItem.sale_date) <= new Date(latestDate)
          )
          .reduce((total: number, saleItem: any) => total + Number(saleItem.sales_amount), 0);

          return {
          type: predicItem.type,
          sale: actualWeeklySales || 0,
          predic: Number(predicItem.result),
          };
        } else {
          const actualSalesForWeekAndProduct = rawSalesData
          .filter(
            (saleItem: any) =>
            saleItem.Product_code === predicItem.type &&
            new Date(saleItem.sale_date) >= new Date(startOfWeekString) &&
            new Date(saleItem.sale_date) <= new Date(latestDate)
          )
          .reduce((total: number, saleItem: any) => total + Number(saleItem.Quantity), 0);

          return {
          type: predicItem.type,
          sale: actualSalesForWeekAndProduct || 0,
          predic: Number(predicItem.result),
          };
        }
        });
      }

      setDifference(percentError);
      } catch (error) {
      console.error('Error fetching difference data:', error);
      }
    };

    const fetchSalesdata = async () => {
      try {
        const response = await axios.get('/Salesdata');
        const salesData = response.data;
        setSalesdata(salesData);

        if (graphType === 'monthly') {
          const latestData = salesData ? salesData.slice(-300) : [];
          const graphData = latestData.map((item: { sale_date: string; sales_amount: string; profit_amount: string }) => ({
            name: new Date(item.sale_date).toLocaleString('default', { month: 'short', year: 'numeric' }),
            Sales: isNaN(Number(item.sales_amount)) ? 0 : Number(item.sales_amount),
            profit: isNaN(Number(item.profit_amount)) ? 0 : Number(item.profit_amount),
          }));

          const monthlyData = graphData.reduce((acc: { [key: string]: { name: string; Sales: number; profit: number } }, item: { name: string; Sales: number; profit: number }) => {
            if (!acc[item.name]) {
              acc[item.name] = { name: item.name, Sales: 0, profit: 0 };
            }
            acc[item.name].Sales += item.Sales;
            acc[item.name].profit += item.profit;
            return acc;
          }, {});

          setGrapData(Object.values(monthlyData));
        } else if (graphType === 'daily') {
          const latestData = salesData ? salesData.slice(-45) : [];
          const graphData = latestData.map((item: { sale_date: string; sales_amount: string; profit_amount: string }) => ({
            name: new Date(item.sale_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }), // Format as DD/MM
            Sales: isNaN(Number(item.sales_amount)) ? 0 : Number(item.sales_amount),
            profit: isNaN(Number(item.profit_amount)) ? 0 : Number(item.profit_amount),
          }));

          setGrapData(graphData);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=9f04441fb1254c3a8bf212302242009&q=Bangkok&days=2`);
        const weatherData = response.data;
        setWeather(weatherData.current.condition.text); // ดึงข้อมูลสภาพอากาศ
        setTemperature(weatherData.current.temp_c); // ดึงข้อมูลอุณหภูมิ
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchGoodProduct = async () => {
      try {
        const response = await axios.get('/GoodsaleproductData/sales');
        const rawGoodproductData = response.data;

        // Map the data to include Total_Sale
        const GoodproductData = rawGoodproductData.map((item: any) => ({
          productcode: item.Product_code,
          quantity: item.Quantity,
          totalSale: item.Total_Sale, // Include Total_Sale
        }));

        setGoodproductData(GoodproductData);
      } catch (error) {
        console.error('Error fetching good product data:', error);
      }
    };


    const fetchPieData = async (startDate: string, endDate: string) => {
      try {
      const response = await axios.get(`/graphpie/category-sales?startDate=${startDate}&endDate=${endDate}`);
              const rawPieData = response.data;

        // Map the data to include category, product count, average quantity, and average total sale
        const pieData = rawPieData.map((item: any) => ({
          category: item.category,
          productCount: item.productCount,
        }));  

      setPieData(pieData);
      } catch (error) {
      console.error('Error fetching pie data:', error);
      }
    };

    fetchDiferen();
    fetchPieData(pieStartDate, pieEndDate);
    fetchGoodProduct();
    fetchWeatherData();
    fetchPredictives();
    fetchSalesdata();
  }, [graphType,pieType, pieStartDate, pieEndDate]);

  useEffect(() => {
    if (Predictive && Salesdata.length > 0) {
      const yesterdaySales = Salesdata[Salesdata.length - 1]?.sales_amount || 0;
      const predicSale = Predictive[Object.keys(Predictive)[0]]?.daily || 0; // Extract daily prediction
      const predicDate = Object.keys(Predictive)[0] || ''; // Extract the first date

      // Transform product data
      const productData = Predictive[Object.keys(Predictive)[0]]?.products.map((item: any) => ({
        productcode: item.type,
        productname: (() => {
          switch (item.type) {
            case "A1001":
              return "Osida shoes";
            case "A1002":
              return "Adda shoes";
            case "A1004":
              return "Fashion shoes";
            case "A1034":
              return "Court Shoes";
            case "B1002":
              return "Long socks";
            case "B1003":
              return "Short socks";
            case "D1003":
              return "Mask pack";
            default:
              return "";
          }
        })(),
        quantity: Number(item.result),
      })) || [];

      const salesData = GrapData;

      setData({
        salesData,
        productData,
        yesterdaySales,
        yesterdayPrediction: predicSale,
        todaySales: predicSale,
        todayDate: predicDate,
      });
    }
  }, [Predictive, Salesdata, GrapData]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadOpen, setisLoadOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        try {
          const query = async () => {
            const response = await axios.get('/Salesdata');
            // console.log('Query result:', response.data);
            const latestSalesDate = response.data.length > 0
              ? new Date(response.data[response.data.length - 1]?.sale_date).toISOString().split('T')[0]
              : '';
            return latestSalesDate;
          };

          const latestSalesDate = await query();
          const todayDate = data.todayDate.split('T')[0];


          if (latestSalesDate && todayDate && (latestSalesDate === todayDate || latestSalesDate > todayDate)) {
            if (!isDialogOpen) { // Ensure it runs only once per reset 
              setIsDialogOpen(true);
              axios.get('https://termpro-machinelerning-production.up.railway.app')
                .then(response => {
                  console.log('API response:', response.data);
                  alert('Prediction completed successfully!');
                })
                .catch(error => {
                  console.error('Error calling API:', error);
                })
                .finally(() => {
                  setIsDialogOpen(false);
                  window.location.reload();
                });
            }
          }
        } catch (error) {
          console.error('Error executing query:', error);
        }
      };

      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      setisLoadOpen(true); // Ensure dialog is open when data is null
    } else {
      setisLoadOpen(false); // Close dialog when data is available
    }
  }, [data]);

  if (!data) {
    return (
      <Fragment>
        <LoadingDialog open={isLoadOpen} text="Data loading. Please wait..." />
      </Fragment>
    );
  }

  
  return (
    <Fragment>
      <LoadingDialog open={isDialogOpen} text="Prediction in progress. Please wait..." />
      <PageLayout title="Dashboard">
        <Formdashboard
          salesData={data.salesData}
          productData={data.productData}
          yesterdaySales={data.yesterdaySales}
          yesterdayPrediction={data.yesterdayPrediction}
          todaySales={data.todaySales}
          todayDate={data.todayDate}
          weather={weather}
          temperature={temperature}
          onGraphTypeChange={setGraphType}
          GoodsaleproductData={GoodproductData}
          PieData={pieData}
          pieStartDate={pieStartDate}
          pieEndDate={pieEndDate}
          onPieDateChange={(start, end) => {
            setPieStartDate(start);
            setPieEndDate(end);
          }}
          onPieTypeChange={setPieType} 
          percentError={difference} 
          ondifferenceTypeChange={setdifferenceType}       
          />
      </PageLayout>
    </Fragment>
  );
}

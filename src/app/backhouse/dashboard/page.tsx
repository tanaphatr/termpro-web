'use client';

import PageLayout from '@/components/layouts/PageLayout';
import React, { useEffect, useState } from 'react'; // Ensure useState is imported
import Formdashboard from './components/Formdashboard';
import axios from 'axios';
import ButtonAdd from '@/components/ButtonAdd';
import { Box, Button, CircularProgress } from '@mui/material';

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
  const [weather, setWeather] = useState<string>(''); // เก็บข้อมูลสภาพอากาศ
  const [temperature, setTemperature] = useState<number>(0); // เก็บข้อมูลอุณหภูมิ
  const [GoodproductData, setGoodproductData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

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

    const fetchPieData = async () => {
      try {
        const response = await axios.get('/GraphPie/category-sales');
        const rawPieData = response.data;

        // Map the data to include category, product count, average quantity, and average total sale
        const pieData = rawPieData.map((item: any) => ({
          category: item.Category,
          productCount: item.ProductCount,
          avgQuantity: item.AvgQuantity,
          avgTotalSale: item.AvgTotalSale,
        }));

        setPieData(pieData);
      } catch (error) {
        console.error('Error fetching good product data:', error);
      }
    };

    fetchPieData();
    fetchGoodProduct();
    fetchWeatherData();
    fetchPredictives();
    fetchSalesdata();
  }, [graphType]);

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

  const [isPredicting, setIsPredicting] = useState(false);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleClickAdd = () => {
    setIsPredicting(true);
    alert('Predictive process started. Please wait');

    axios.get('https://termpro-machinelerning-production.up.railway.app')
      .then(response => {
        console.log('API response:', response.data);
        alert('Prediction completed successfully!');
      })
      .catch(error => {
        console.error('Error calling API:', error);
        // alert('Prediction failed!');
      })
      .finally(() => {
        setIsPredicting(false);
        alert('Prediction completed please Reloading the page');
        window.location.reload();
      });
  };

  return (
    <PageLayout title="Dashboard"
      buttons={[
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: isPredicting ? 'grey' : 'primary.main' }}
            disabled={isPredicting}
            onClick={handleClickAdd}
          >
            New Predictive
          </Button>
          {isPredicting && (
            <CircularProgress
              size={24}
              sx={{
                color: 'green',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      ]}
    >
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
      />
    </PageLayout>
  );
}

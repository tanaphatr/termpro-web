'use client';

import PageLayout from '@/components/layouts/PageLayout'
import React, { useEffect, useState } from 'react'
import Formdashboard from './components/Formdashboard'
import axios from 'axios';

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

  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    const fetchPredictives = async () => {
      try {
        const response = await axios.get('/Predictive');
        setPredictive(response.data);
      } catch (error) {
        console.error('Error fetching predictive data:', error);
      }
    };

    const fetchSalesdata = async () => {
      try {
        const response = await axios.get('/Salesdata');
        const salesData = response.data;
        setSalesdata(salesData);

        const latestData = salesData ? salesData.slice(-300) : [];
        console.log("Fetched Salesdata:", latestData);

        const graphData = latestData.map((item: { sale_date: string; sales_amount: string; profit_amount: string }) => ({
          name: new Date(item.sale_date).toLocaleString('default', { month: 'short', year: 'numeric' }),
          Sales: isNaN(Number(item.sales_amount)) ? 0 : Number(item.sales_amount),
          profit: isNaN(Number(item.profit_amount)) ? 0 : Number(item.profit_amount)
        }));

        const monthlyData = graphData.reduce((acc: { [key: string]: { name: string; Sales: number; profit: number } }, item: { name: string; Sales: number; profit: number }) => {
          if (!acc[item.name]) {
            acc[item.name] = { name: item.name, Sales: 0, profit: 0 };
          }
          acc[item.name].Sales += item.Sales;
          acc[item.name].profit += item.profit;
          return acc;
        }, {});

        const finalGraphData = Object.values(monthlyData);

        setGrapData(finalGraphData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchPredictives();
    fetchSalesdata();
  }, []);

  useEffect(() => {
    if (Predictive && Salesdata.length > 0) {
      const yesterdaySales = Salesdata[Salesdata.length - 1]?.sales_amount || 0;
      const predicSale = Predictive.dailysale;
      const predicDate = Predictive.date;
      const salesData = GrapData;

      setData({
        salesData,
        productData: [],
        yesterdaySales,
        yesterdayPrediction: predicSale,
        todaySales: 0,
        todayDate: predicDate
      });
    }
  }, [Predictive, Salesdata]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout
      title="แดชบอร์ด"
    >
      <Formdashboard
        salesData={data.salesData}
        productData={data.productData}
        yesterdaySales={data.yesterdaySales}
        yesterdayPrediction={data.yesterdayPrediction}
        todaySales={data.todaySales}
        todayDate={data.todayDate}
      />
    </PageLayout>
  )
}

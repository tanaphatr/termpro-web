'use client';

import PageLayout from '@/components/layouts/PageLayout'
import React, { useEffect, useState } from 'react'
import Formdashboard from './components/Formdashboard'

export default function Dashboard() {
  interface DashboardData {
    salesData: any;
    productData: any;
    yesterdaySales: any;
    yesterdayPrediction: any;
    todaySales: any;
    todayDate: any;
  }

  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Simulate an API call
    const fetchData = async () => {
      const response = await fetch('/API/Dashboard.json');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

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

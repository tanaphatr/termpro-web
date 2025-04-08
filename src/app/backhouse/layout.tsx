'use client';

import "react-perfect-scrollbar/dist/css/styles.css";
import { Box, CssBaseline, Toolbar } from '@mui/material';
import NavMenu from "@/components/layouts/Nav";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductsIcon from '@mui/icons-material/Category';
import SaleReportIcon from '@mui/icons-material/Assessment';
import EmployeeIcon from '@mui/icons-material/People';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const [firstname, setfirstname] = useState<string | null>(null);
    const [role, setrole] = useState<string | null>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
        setfirstname(user.first_name);
        setrole(user.role);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (!user) {
            router.push('/auth/login');
        }
    }, []);
    const menuItems = [];
    
    if (role === 'admin' || role === 'employee') {
        menuItems.push(
            {
                text: 'Dashboard',
                href: '/backhouse/dashboard',
                icon: <DashboardIcon />
            },
            {
                text: 'Products',
                href: '/backhouse/products',
                icon: <ProductsIcon />
            },
            {
                text: 'Sale Report',
                href: '/backhouse/sale-report',
                icon: <SaleReportIcon />
            },
        );
    }

    if (role === 'admin') {
        menuItems.push({
            text: 'Employee',
            href: '/backhouse/employee',
            icon: <EmployeeIcon />
        });
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <NavMenu menuItems={menuItems} user={{
                name: `${firstname}`,
                avatarUrl: ""
            }} />
            {children}
        </Box>
    );
}

import "react-perfect-scrollbar/dist/css/styles.css";
import { Box, CssBaseline, Toolbar } from '@mui/material';
import NavMenu from "@/components/layouts/Nav";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductsIcon from '@mui/icons-material/Category';
import SaleReportIcon from '@mui/icons-material/Assessment';
import EmployeeIcon from '@mui/icons-material/People';

const menuItems = [
    {
        text: 'แดชบอร์ด',
        href: '/backhouse/dashboard',
        icon: <DashboardIcon />
    },
    {
        text: 'สินค้า',
        href: '/backhouse/products',
        icon: <ProductsIcon />
    },
    {
        text: 'รายงานยอดขาย',
        href: '/backhouse/sale-report',
        icon: <SaleReportIcon />
    },
    {
        text: 'พนักงาน',
        href: '/backhouse/employee',
        icon: <EmployeeIcon />
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <NavMenu menuItems={menuItems} user={{
                name: "สงพง สงวนสุข",
                avatarUrl: ""
            }} />
            {children}
        </Box>
    );
}
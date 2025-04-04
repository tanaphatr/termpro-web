"use client";

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Divider, Typography, Grid, ListItemButton, Avatar } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useRouter } from "next/navigation";

interface NavMenuProps {
    menuItems: { text: string, href: string, icon: React.ReactNode, pathname?: string }[];
    user: { name: string, avatarUrl: string };
}

export default function NavMenu({ menuItems, user }: NavMenuProps) {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNavigation = (href: string, index: number) => {
        setSelectedIndex(index);
        router.push(href);
    };

    const handleLogout = () => {
        router.push(`/auth/logout`);
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.name} src={user.avatarUrl} />
                <Typography sx={{ fontSize: '16px', paddingLeft: '20px' }} noWrap>
                    {user.name}
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => handleNavigation(item.href, index)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.5)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.5)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                                },
                            }}
                        >
                            <ListItemIcon >{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontSize: '14px' }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Grid sx={{ flexGrow: 1 }} />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px' }}>
                                    Logout
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
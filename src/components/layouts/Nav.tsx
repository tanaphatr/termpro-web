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
                width: 220,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 220,
                    boxSizing: 'border-box',
                    backgroundColor: '#112D4E',
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.name} src={user.avatarUrl} />
                <Typography sx={{ fontSize: '16px', paddingLeft: '20px', color: '#F9F7F7' }} noWrap>
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
                            <ListItemIcon sx={{ color: '#F9F7F7' }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontSize: '14px', color: '#F9F7F7' }} noWrap>
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
                            <ExitToApp sx={{ color: '#F9F7F7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px', color: '#F9F7F7' }}>
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
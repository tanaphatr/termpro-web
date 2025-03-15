"use client";

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Divider, Typography, Box, ListItemButton, Avatar } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useRouter } from "next/navigation";

interface NavMenuProps {
    menuItems: { text: string, path: string, icon: React.ReactNode }[];
    user: { name: string, avatarUrl: string };
}

export default function NavMenu({ menuItems, user }: NavMenuProps) {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNavigation = (path: string, index: number) => {
        setSelectedIndex(index);
        router.push(path);
    };

    const handleLogout = () => {
        router.push(`/auth/login`);
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
                            onClick={() => handleNavigation(item.path, index)}
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
            <Box sx={{ flexGrow: 1 }} />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px' }}>
                                    ออกจากระบบ
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
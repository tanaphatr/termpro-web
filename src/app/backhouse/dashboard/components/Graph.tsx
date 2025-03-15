'use client';
import { Card, CardContent, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, LabelList, ResponsiveContainer } from 'recharts';

interface GraphProps {
    data: { name: string; Sales: number; profit: number }[];
}

export default function Graph({ data }: GraphProps) {
    return (
        <Fragment>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        ticks={[0, 150000, 300000, 450000, 600000]} // กำหนดค่าที่จะแสดงในแกน Y
                        domain={[0, 600000]} // กำหนดช่วงของแกน Y
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Sales" fill="#8884d8">
                        <LabelList dataKey="Sales" position="top" />
                    </Bar>
                    <Bar dataKey="profit" fill="#82ca9d">
                        <LabelList dataKey="profit" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Fragment>
    );
}

'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVentas } from '@/store/slices/dataSlice';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line,
    PieChart, Pie, Cell,
    AreaChart, Area,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { groupByCategory, groupByDate, groupByRegion, getCumulativeData, getRadarMetrics } from '@/utils/transformData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardCharts() {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.data);
    const filters = useAppSelector((state) => state.filters);

    useEffect(() => {
        dispatch(fetchVentas(filters));
    }, [dispatch, filters]);

    if (status === 'loading') {
        return <div className="p-8 text-center text-xl text-blue-600 animate-pulse">Cargando datos del dashboard...</div>;
    }

    if (status === 'failed') {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    const dataByCategory = groupByCategory(items);
    const dataByDate = groupByDate(items);
    const dataByRegion = groupByRegion(items);
    const dataCumulative = getCumulativeData(items);
    const dataRadar = getRadarMetrics(items);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Ventas por Categoría (Barras)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataByCategory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Monto ($)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Evolución Temporal (Líneas)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dataByDate}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Venta Diaria" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
                    Distribución por Región (Torta)
                    {filters.categoria && !filters.region && (
                        <span className="block text-xs font-normal text-gray-500 mt-1">
                            En {filters.categoria}
                        </span>
                    )}
                    {filters.region && !filters.categoria && (
                        <span className="block text-xs font-normal text-gray-500 mt-1">
                            En {filters.region}
                        </span>
                    )}
                    {filters.categoria && filters.region && (
                        <span className="block text-xs font-normal text-gray-500 mt-1">
                            {filters.categoria} en {filters.region}
                        </span>
                    )}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={dataByRegion}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {dataByRegion.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Crecimiento Acumulado (Área)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dataCumulative}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" name="Acumulado" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 md:col-span-2 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Métricas Generales (Radar)</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Tooltip />
                            <Radar name="KPIs Actuales" dataKey="A" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

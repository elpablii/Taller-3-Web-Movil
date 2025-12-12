'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DashboardCharts from '@/components/DashboardCharts';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            DataMobile Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Visualización de Ventas en Tiempo Real
          </p>
        </header>

        {/*Contenido del Dashboard*/}
        <FilterBar />
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200">
          <DashboardCharts />
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import DashboardCharts from '@/components/DashboardCharts';
import FilterBar from '@/components/FilterBar';
import VentasTable from '@/components/VentasTable';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ventas'>('dashboard');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            DataMobile Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Visualización de Ventas en Tiempo Real
          </p>
        </header>

<<<<<<< HEAD
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('ventas')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'ventas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Gestión de Ventas
          </button>
=======
        {/*Contenido del Dashboard*/}
        <FilterBar />
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200">
          <DashboardCharts />
>>>>>>> main
        </div>

        {activeTab === 'dashboard' ? (
          <>
            <FilterBar />
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200">
              <DashboardCharts />
            </div>
          </>
        ) : (
          <VentasTable />
        )}
      </div>
    </main>
  );
}

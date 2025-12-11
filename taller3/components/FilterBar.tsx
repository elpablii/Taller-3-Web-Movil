'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRegion, setCategoria, setFechaInicio, setFechaFin, resetFilters } from '@/store/slices/filterSlice';

export default function FilterBar() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters);

    // Lists for dropdowns (could be dynamic, but static is fine for now)
    const regions = ['Norte', 'Centro', 'Sur', 'Metropolitana'];
    const categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setRegion(e.target.value));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCategoria(e.target.value));
    };

    const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFechaInicio(e.target.value));
    };

    const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFechaFin(e.target.value));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
                {/* Region Filter */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1">Región</label>
                    <select
                        value={filters.region}
                        onChange={handleRegionChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-40"
                    >
                        <option value="">Todas</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1">Categoría</label>
                    <select
                        value={filters.categoria}
                        onChange={handleCategoryChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-40"
                    >
                        <option value="">Todas</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Date Ranges (Optional implementation for UI, logic needs backend support usually) */}
                {/* Helper: Backend API currently supports basic filtering, complex date range might need full ISO strings */}
            </div>

            {/* Actions */}
            <button
                onClick={() => dispatch(resetFilters())}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
                Limpiar Filtros
            </button>
        </div>
    );
}

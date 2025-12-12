'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteVenta, updateVenta, createVenta, fetchVentas } from '@/store/slices/dataSlice';
import { Venta } from '@/store/slices/dataSlice';

export default function VentasTable() {
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((state) => state.data);
    const filters = useAppSelector((state) => state.filters);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Venta>>({
        producto: '',
        categoria: '',
        monto: 0,
        cantidad: 1,
        vendedor: '',
        region: '',
    });

    const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];
    const regiones = ['Norte', 'Centro', 'Sur', 'Metropolitana'];

    const handleEdit = (venta: Venta) => {
        setEditingId(venta.id);
        setFormData({
            producto: venta.producto,
            categoria: venta.categoria,
            monto: venta.monto,
            cantidad: venta.cantidad,
            vendedor: venta.vendedor || '',
            region: venta.region || '',
        });
    };

    const handleSave = async () => {
        if (!formData.producto || !formData.categoria || !formData.monto || !formData.cantidad) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        try {
            if (editingId) {
                const updateData = {
                    id: editingId,
                    producto: formData.producto!,
                    categoria: formData.categoria!,
                    monto: Math.floor(formData.monto || 0),
                    cantidad: Math.floor(formData.cantidad || 1),
                    vendedor: formData.vendedor || null,
                    region: formData.region || null,
                };
                await dispatch(updateVenta(updateData)).unwrap();
                setEditingId(null);
            } else {
                const createData = {
                    producto: formData.producto!,
                    categoria: formData.categoria!,
                    monto: Math.floor(formData.monto || 0),
                    cantidad: Math.floor(formData.cantidad || 1),
                    vendedor: formData.vendedor || null,
                    region: formData.region || null,
                };
                await dispatch(createVenta(createData)).unwrap();
                setShowCreateForm(false);
            }
            setFormData({
                producto: '',
                categoria: '',
                monto: 0,
                cantidad: 1,
                vendedor: '',
                region: '',
            });
            dispatch(fetchVentas(filters));
        } catch (error) {
            console.error('Error saving venta:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error: ${errorMessage}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
            return;
        }

        try {
            await dispatch(deleteVenta(id)).unwrap();
            dispatch(fetchVentas(filters));
        } catch (error) {
            console.error('Error deleting venta:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error: ${errorMessage}`);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowCreateForm(false);
        setFormData({
            producto: '',
            categoria: '',
            monto: 0,
            cantidad: 1,
            vendedor: '',
            region: '',
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700">Gestión de Ventas</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + Nueva Venta
                </button>
            </div>

            {(showCreateForm || editingId !== null) && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        {editingId ? 'Editar Venta' : 'Nueva Venta'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Producto *
                            </label>
                            <input
                                type="text"
                                value={formData.producto}
                                onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría *
                            </label>
                            <select
                                value={formData.categoria}
                                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                                required
                            >
                                <option value="">Seleccione...</option>
                                {categorias.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Monto *
                            </label>
                            <input
                                type="number"
                                value={formData.monto || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d+$/.test(value)) {
                                        setFormData({ ...formData, monto: value === '' ? 0 : parseInt(value, 10) });
                                    }
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                                min="1"
                                step="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cantidad *
                            </label>
                            <input
                                type="number"
                                value={formData.cantidad || ''}
                                onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) || 1 })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vendedor
                            </label>
                            <input
                                type="text"
                                value={formData.vendedor || ''}
                                onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Región
                            </label>
                            <select
                                value={formData.region || ''}
                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium bg-white"
                            >
                                <option value="">Seleccione...</option>
                                {regiones.map((reg) => (
                                    <option key={reg} value={reg}>{reg}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Producto</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoría</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Monto</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Cantidad</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Vendedor</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Región</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                    No hay ventas disponibles
                                </td>
                            </tr>
                        ) : (
                            items.map((venta) => (
                                <tr key={venta.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{venta.id}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900">{venta.producto}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{venta.categoria}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">${venta.monto.toLocaleString()}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{venta.cantidad}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{venta.vendedor || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{venta.region || '-'}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                                        {new Date(venta.fecha).toLocaleDateString('es-CL')}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(venta)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
                                                disabled={status === 'loading'}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(venta.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                                                disabled={status === 'loading'}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


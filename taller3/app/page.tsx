'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, incrementByAmount } from '@/store/slices/counterSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const [data] = useState([
    { name: 'Enero', valor: 400 },
    { name: 'Febrero', valor: 300 },
    { name: 'Marzo', valor: 200 },
    { name: 'Abril', valor: 278 },
    { name: 'Mayo', valor: 190 },
    { name: 'Junio', valor: 229 },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Taller 3 - Web Móvil
        </h1>
        <p className="text-gray-600 mb-8">
          Proyecto con Next.js, Redux, Prisma y Recharts
        </p>

        {/* Sección de Counter con Redux */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Contador con Redux
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(decrement())}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              -
            </button>
            <span className="text-4xl font-bold text-blue-600 min-w-[100px] text-center">
              {count}
            </span>
            <button
              onClick={() => dispatch(increment())}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              +
            </button>
            <button
              onClick={() => dispatch(incrementByAmount(5))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              +5
            </button>
          </div>
        </div>

        {/* Gráfico con Recharts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Gráfico de Ejemplo
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

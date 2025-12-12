
import { Venta } from '../store/slices/dataSlice';

export const groupByCategory = (items: Venta[]) => {
  const grouped = items.reduce((acc, item) => {
    const existing = acc.find((i) => i.name === item.categoria);
    if (existing) {
      existing.value += item.monto;
    } else {
      acc.push({ name: item.categoria, value: item.monto });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  return grouped.sort((a, b) => b.value - a.value);
};

export const groupByRegion = (items: Venta[]) => {
  const grouped = items.reduce((acc, item) => {
    const region = item.region || 'Sin Región';
    const existing = acc.find((i) => i.name === region);
    if (existing) {
      existing.value += item.monto;
    } else {
      acc.push({ name: region, value: item.monto });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  return grouped;
};

export const groupByDate = (items: Venta[]) => {
  const grouped = items.reduce((acc, item) => {
    const date = new Date(item.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' });
    const existing = acc.find((i) => i.name === date);
    if (existing) {
      existing.value += item.monto;
      existing.count += 1;
    } else {
      acc.push({ name: date, value: item.monto, count: 1 });
    }
    return acc;
  }, [] as { name: string; value: number; count: number }[]);
  
  return grouped.reverse();
};

export const getCumulativeData = (items: Venta[]) => {
    const sorted = [...items].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    
    let accumulated = 0;
    const grouped = groupByDate(sorted.reverse());
    
    const dailyMap = new Map<string, number>();
    sorted.forEach(item => {
        const date = new Date(item.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' });
        dailyMap.set(date, (dailyMap.get(date) || 0) + item.monto);
    });

    const result = [];
    for (const [date, value] of dailyMap) {
        accumulated += value;
        result.push({ name: date, value: accumulated });
    }
    return result;
}

export const getRadarMetrics = (items: Venta[]) => {
    if (!items.length) return [];
    
    const totalVentas = items.reduce((sum, i) => sum + i.monto, 0);
    const totalCantidad = items.reduce((sum, i) => sum + i.cantidad, 0);
    const avgTicket = totalVentas / items.length;
    const maxVenta = Math.max(...items.map(i => i.monto));
    
    return [
       { subject: 'Ticket Promedio', A: avgTicket, fullMark: 10000 },
       { subject: 'Transacciones', A: items.length * 100, fullMark: 150 },
       { subject: 'Cantidad Prod.', A: totalCantidad * 10, fullMark: 150 },
       { subject: 'Máx. Venta / 10', A: maxVenta / 10, fullMark: 150 },
    ];
}

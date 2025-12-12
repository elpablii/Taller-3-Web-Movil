import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    const whereClause = region ? { region } : {};

    try {
        const ventas = await prisma.venta.findMany({
            where: whereClause,
            orderBy: { fecha: 'desc' }
        });
        return NextResponse.json(ventas);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const categoria = searchParams.get('categoria');
    const fechaInicio = searchParams.get('fechaInicio');
    const fechaFin = searchParams.get('fechaFin');

    const whereClause: any = {};
    if (region) whereClause.region = region;
    if (categoria) whereClause.categoria = categoria;
    
    if (fechaInicio || fechaFin) {
        whereClause.fecha = {};
        if (fechaInicio) {
            whereClause.fecha.gte = new Date(fechaInicio);
        }
        if (fechaFin) {
            const fechaFinDate = new Date(fechaFin);
            fechaFinDate.setHours(23, 59, 59, 999);
            whereClause.fecha.lte = fechaFinDate;
        }
    }

    try {
        const ventas = await prisma.venta.findMany({
            where: whereClause,
            orderBy: { fecha: 'desc' }
        });
        return NextResponse.json(ventas);
    } catch (error) {
        console.error('Error fetching ventas:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error fetching data';
        const errorDetails = error instanceof Error ? error.stack : String(error);
        console.error('Error details:', errorDetails);
        return NextResponse.json({ 
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.producto || !body.categoria || !body.monto || !body.cantidad) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos: producto, categoria, monto, cantidad' },
                { status: 400 }
            );
        }

        const monto = Math.floor(Number(body.monto));
        const cantidad = Math.floor(Number(body.cantidad));

        if (isNaN(monto) || monto <= 0) {
            return NextResponse.json(
                { error: 'El monto debe ser un número entero positivo' },
                { status: 400 }
            );
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            return NextResponse.json(
                { error: 'La cantidad debe ser un número entero positivo' },
                { status: 400 }
            );
        }

        const venta = await prisma.venta.create({
            data: {
                producto: body.producto,
                categoria: body.categoria,
                monto: monto,
                cantidad: cantidad,
                fecha: body.fecha ? new Date(body.fecha) : new Date(),
                vendedor: body.vendedor || null,
                region: body.region || null,
            },
        });

        return NextResponse.json(venta, { status: 201 });
    } catch (error) {
        console.error('Error creating venta:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error creating data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
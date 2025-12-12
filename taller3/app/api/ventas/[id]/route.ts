import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const resolvedParams = await Promise.resolve(params);
        const id = parseInt(resolvedParams.id);
        
        if (isNaN(id)) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }

        const venta = await prisma.venta.findUnique({
            where: { id },
        });

        if (!venta) {
            return NextResponse.json({ error: 'Venta no encontrada' }, { status: 404 });
        }

        return NextResponse.json(venta);
    } catch (error) {
        console.error('Error fetching venta:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error fetching data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const resolvedParams = await Promise.resolve(params);
        const id = parseInt(resolvedParams.id);
        
        if (isNaN(id)) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }

        const body = await request.json();
        console.log('PUT /api/ventas/[id] - Received data:', { id, body });

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

        const existing = await prisma.venta.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json({ error: 'Venta no encontrada' }, { status: 404 });
        }

        const venta = await prisma.venta.update({
            where: { id },
            data: {
                producto: body.producto,
                categoria: body.categoria,
                monto: monto,
                cantidad: cantidad,
                fecha: body.fecha ? new Date(body.fecha) : existing.fecha,
                vendedor: body.vendedor !== undefined ? (body.vendedor || null) : existing.vendedor,
                region: body.region !== undefined ? (body.region || null) : existing.region,
            },
        });

        return NextResponse.json(venta);
    } catch (error) {
        console.error('Error updating venta:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error updating data';
        const errorDetails = error instanceof Error ? error.stack : String(error);
        console.error('Error details:', errorDetails);
        return NextResponse.json({ 
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
        }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const resolvedParams = await Promise.resolve(params);
        const id = parseInt(resolvedParams.id);
        
        if (isNaN(id)) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }

        const existing = await prisma.venta.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json({ error: 'Venta no encontrada' }, { status: 404 });
        }

        await prisma.venta.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Venta eliminada correctamente' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting venta:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error deleting data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}


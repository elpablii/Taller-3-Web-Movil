import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Venta {
    id: number;
    producto: string;
    categoria: string;
    monto: number;
    cantidad: number;
    fecha: string;
    vendedor: string | null;
    region: string | null;
}

interface DataState {
    items: Venta[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchVentas = createAsyncThunk('data/fetchVentas', async (filters: any) => {
    const params = new URLSearchParams();
    if (filters?.region) params.append('region', filters.region);
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);

    const response = await fetch(`/api/ventas?${params.toString()}`);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
});

export const createVenta = createAsyncThunk('data/createVenta', async (ventaData: Omit<Venta, 'id' | 'fecha'> & { fecha?: string }) => {
    const response = await fetch('/api/ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
});

export const updateVenta = createAsyncThunk('data/updateVenta', async ({ id, ...ventaData }: Partial<Venta> & { id: number }) => {
    try {
        console.log('updateVenta - Sending:', { id, ventaData });
        const response = await fetch(`/api/ventas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ventaData),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
            const errorDetails = errorData?.details || '';
            throw new Error(errorMessage + (errorDetails ? `: ${errorDetails}` : ''));
        }
        return response.json();
    } catch (error) {
        console.error('Error in updateVenta:', error);
        throw error;
    }
});

export const deleteVenta = createAsyncThunk('data/deleteVenta', async (id: number) => {
    const response = await fetch(`/api/ventas/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return id;
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVentas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVentas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchVentas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createVenta.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createVenta.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [action.payload, ...state.items];
            })
            .addCase(createVenta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error creating venta';
            })
            .addCase(updateVenta.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateVenta.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateVenta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error updating venta';
            })
            .addCase(deleteVenta.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVenta.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteVenta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error deleting venta';
            });
    },
});

export default dataSlice.reducer;

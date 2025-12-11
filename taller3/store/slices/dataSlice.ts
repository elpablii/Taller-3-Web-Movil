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

    const response = await fetch(`/api/ventas?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
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
            });
    },
});

export default dataSlice.reducer;

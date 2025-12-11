import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    region: string;
    categoria: string;
    fechaInicio: string;
    fechaFin: string;
    tipoGrafico: 'line' | 'bar' | 'pie';
}

const initialState: FilterState = {
    region: '',
    categoria: '',
    fechaInicio: '',
    fechaFin: '',
    tipoGrafico: 'line', // Default chart type
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload;
        },
        setCategoria: (state, action: PayloadAction<string>) => {
            state.categoria = action.payload;
        },
        setFechaInicio: (state, action: PayloadAction<string>) => {
            state.fechaInicio = action.payload;
        },
        setFechaFin: (state, action: PayloadAction<string>) => {
            state.fechaFin = action.payload;
        },
        setTipoGrafico: (state, action: PayloadAction<'line' | 'bar' | 'pie'>) => {
            state.tipoGrafico = action.payload;
        },
        resetFilters: (state) => {
            state.region = '';
            state.categoria = '';
            state.fechaInicio = '';
            state.fechaFin = '';
        }
    },
});

export const {
    setRegion,
    setCategoria,
    setFechaInicio,
    setFechaFin,
    setTipoGrafico,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;

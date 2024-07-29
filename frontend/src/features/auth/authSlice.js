import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const initialState = {
    user: {},
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://192.168.66.74:8000/auth/login/', credentials);
        const access = response.data['token'];
        localStorage.setItem('token', access);
        const user_details = jwtDecode(access);
        return { token: access, user: user_details };
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.error);
        } else if (error.request) {
            return rejectWithValue("Server not accessible");
        } else {
            return rejectWithValue("Unknown error occurred");
        }
    }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        await axios.post('http://192.168.66.74:8000/auth/register/', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert("User registered successfully");
        return { message: 'User registered successfully' };
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.error);
        } else if (error.request) {
            return rejectWithValue("Server not accessible");
        } else {
            return rejectWithValue("Unknown error occurred");
        }
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

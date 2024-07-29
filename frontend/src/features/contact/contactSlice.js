import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    message: 'idle',
    status: '',
    contact: [],
    loading: false,
    error: null,
};

export const listContacts = createAsyncThunk('contact/list', async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get('http://192.168.66.74:8000/contact/list/');
        return response.data;
    } catch (error) {
        alert(error.response.data.error);
        return rejectWithValue(error.response.data.error);
    }
});


export const searchContacts = createAsyncThunk('contact/search', async (credentials, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://192.168.66.74:8000/contact/search/',credentials);
        return response.data;
    } catch (error) {
        alert(error.response.data.error);
        
        return rejectWithValue(error.response.data.error);
    }
});

export const addContact = createAsyncThunk('contact/add', async (credentials, {rejectWithValue}) => {
    try {
        await axios.post('http://192.168.66.74:8000/contact/add/', credentials);
        return { message: 'Contact Added successfully' };
    } catch(error) {
        alert(error.response.data.error);
        return rejectWithValue(error.response.data.error);
    }
});

export const editContact = createAsyncThunk('contact/edit', async (credentials, {rejectWithValue}) => {
    try {
        await axios.post('http://192.168.66.74:8000/contact/edit/', credentials);
        return { message: 'Contact Edited successfully' };
    } catch(error) {
        alert(error.response.data.error);
        return rejectWithValue(error.response.data.error);
    }
});

export const deleteContact = createAsyncThunk('contact/delete', async(credentials, {rejectWithValue}) => {
    try {
        await axios.post('http://192.168.66.74:8000/contact/delete/', credentials);
        return { message: 'Contact Deleted successfully' };
    } catch(error) {
        alert(error.response.data.error);
        return rejectWithValue(error.response.data.error);
    }
})

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addContact.pending, (state) => {
                state.message = '';
                state.status = '';
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state) => {
                state.message = 'Contact Added successfully';
                state.status = 'Contact Added successfully';
                state.loading = false;
                state.error = null;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.message = '';
                state.status = '';
                state.loading = false;
                state.error = action.payload || action.error.message;;
            })
            .addCase(editContact.pending, (state) => {
                state.message = '';
                state.status = '';
                state.loading = true;
                state.error = null;
            })
            .addCase(editContact.fulfilled, (state) => {
                state.message = 'Contact Edited successfully';
                state.status = 'Contact Edited successfully';
                state.loading = false;
                state.error = null;
            })
            .addCase(editContact.rejected, (state, action) => {
                state.message = '';
                state.status = '';
                state.loading = false;
                state.error = action.payload || action.error.message;;
            })
            .addCase(listContacts.pending,(state) => {
                state.message = '';
                state.loading = true;
                state.error = null;;
            })
            .addCase(listContacts.fulfilled,(state,action) => {
                state.message = 'list updated';
                state.loading = false;
                state.contact = action.payload;
            })
            .addCase(listContacts.rejected, (state, action) => {
                state.message = '';
                state.loading = false;
                state.error = action.payload || action.error.message;;
            })
            .addCase(searchContacts.pending, (state) => {
                state.status = '';
                state.loading = true;
                state.contact = [];
                state.error = null;;
            })
            .addCase(searchContacts.fulfilled, (state, action) => {
                state.status = '';
                state.loading = false;
                state.contact = action.payload;;
            })
            .addCase(searchContacts.rejected, (state, action) => {
                state.status = '';
                state.loading = false;
                state.error = action.payload || action.error.message;;
            });
    }
});

export default contactSlice.reducer;
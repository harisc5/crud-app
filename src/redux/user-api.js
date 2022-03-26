import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "../constants";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (data, { rejectWithValue }) => {
    try {
       return await axiosInstance.get('/users');
    } catch (e) {
        return rejectWithValue(e.response);
    }
});

export const createUser = createAsyncThunk('users/createUser', async (data, { rejectWithValue }) => {
    try {
       return await axiosInstance.post('/users', data);
    } catch (e) {
        return rejectWithValue(e.response);
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (data, { rejectWithValue }) => {
    try {
       return await axiosInstance.put(`/users/${data.id}`, data);
    } catch (e) {
        return rejectWithValue(e.response);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (data, { rejectWithValue }) => {
    try {
       return await axiosInstance.delete(`/users/${data.id}`);
    } catch (e) {
        return rejectWithValue(e.response);
    }
});

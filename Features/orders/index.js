import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_URL } from "../../Constants/firebase";

const initialState = {
    value: {
        orders: [],
        loading: false,
        error: false
    }
};


export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async (_, asyncThunk) => {
        console.log(asyncThunk.getState());
        try{
            const res = await fetch(`${DB_URL}orders.json`);
            const data = Object.values(await res.json())
            console.log(data);
            return data
        } catch (error) {
            return {error: 'Opps there seems to be an error'}
        }
    }
);


export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId, asyncThunk) => {
        try {
            await fetch(`${DB_URL}orders/${orderId}.json`, {
                method:'DELETE',
            });

            return orderId
        } catch (error) {
            return {error: 'Opps, there seems to delete order'}
        }
    }
);


export const ordersSlice = createSlice({
    name:"orders",
    initialState :initialState ,
    reducers: {},
    extraReducers:{
        [getOrders.pending]: (state) => {
            state.value.loading = true
        },
        [getOrders.fulfilled]: (state, {payload}) => {
            state.value.loading = false 
            state.value.orders = payload
        },
        [getOrders.rejected]: (state) => {
            state.value. loading = false
            state.value.error = true
        },
        [deleteOrder.pending]: (state) => {
            state.value.loading = true
        },
        [deleteOrder.fulfilled]: (state, {payload}) => {
            state.value.orders = state.value.orders.filter(
                (order) => order.id !== payload
            );
            state.value.loading = false;
        },
        [deleteOrder.rejected]: (state) => {
            state.value.loading = false;
            state.value.error = true;
        },
    }
});

export default ordersSlice.reducer;
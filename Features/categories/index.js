import { createSlice } from '@reduxjs/toolkit'
import { CATEGORIES } from '../../Data/categories'


const initialState = {
    value: {
        categories: CATEGORIES,
        categorySelected: "",
    }
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        selectCategory: (state, action) => {
            const categorySelected = state.value.categories.find(category => category.id === action.payload)
            state.value.categorySelected = categorySelected.category
        }
    }
});

export const {selectCategory} = categorySlice.actions

export default categorySlice.reducer

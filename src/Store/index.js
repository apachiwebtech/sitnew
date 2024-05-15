import {configureStore} from '@reduxjs/toolkit'
import productReducer from './Products/productSlice';
const store = configureStore({
    reducer : {
        products : productReducer,
    }
})
export default store;
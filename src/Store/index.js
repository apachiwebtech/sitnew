import {configureStore} from '@reduxjs/toolkit'
import productReducer from './Products/productSlice';
import roleAssignReducer from './Role/roleSilce'
const store = configureStore({
    reducer : {
        products : productReducer,
        roleAssign : roleAssignReducer,
    }
})
export default store;
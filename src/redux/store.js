import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transaction/transactionSlice';
import { reHydrateStore } from '../features/transaction/transactionSlice';
import { localStorageMiddleware } from '../features/transaction/transactionSlice';
import transactionStore from "../features/transaction/transaction";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        transactionStore: transactionStore
    },
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})


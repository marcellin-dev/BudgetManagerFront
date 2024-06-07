import {createSlice} from "@reduxjs/toolkit";
import moment from "moment/moment";


const initialState = {
    allTransactions: [],
    incomes: [],
    totalIncome: 10,
    totalExpense: 10,
    todaysTransactions: [],
    todaysIncomeTotal: 0,
    todaysExpenseTotal: 0,
    balance: 0
}


export const transactionSlice = createSlice({
    name: 'transactionStore',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.allTransactions.push(action.payload)

        },
        setTransactionsStrore: (state, action) => {
            state.allTransactions = action.payload
            state.balance = action.payload?.reduce((acc, item) => {
                if(item.type === "income"){
                    return acc + item.amount
                }else {
                    return acc - item.amount
                }
            },0);
            state.totalIncome = action.payload?.reduce((acc, item) => {
                if(item.type === "income")
                    return acc + item.amount
                return acc +0
            },0);
            state.totalExpense = action.payload?.reduce((acc, item) => {
                if(item.type === "expense")
                    return acc + item.amount
                return acc +0
            },0);
        },
        setIncomes: (state, action) => {


        },

        getTodaysTransactions: {
            reducer(state) {
                var today = moment().format('MM-DD-YYYY');
                const sortTodayInc = state.income.filter((transaction) =>
                    transaction.date === today);
                const sortTodayExp = state.expense.filter((transaction) =>
                    transaction.date === today);
                state.todaysTransactions = [...sortTodayInc, ...sortTodayExp]

                const sortTodayIncAmount = sortTodayInc.map((transaction) =>
                    transaction.amount)
                let totalIncToday =
                    sortTodayIncAmount.length > 0 ? sortTodayIncAmount.reduce((prev, current) => prev + current) : 0;
                state.todaysIncomeTotal = totalIncToday;

                const sortTodayExpAmount = sortTodayExp.map((transaction) =>
                    transaction.amount)
                let totalExpToday =
                    sortTodayExpAmount.length > 0 ? sortTodayExpAmount.reduce((prev, current) => prev + current) : 0;
                state.todaysExpenseTotal = totalExpToday;
            }
        },

    }
})
export const selectAllIncomes = (state) => state?.transactionStore.allTransactions?.filter(transaction => transaction.type === 'income')
export const selectAllExpenses = (state) => state?.transactionStore.allTransactions?.filter(transaction => transaction.type === 'expense')
export const {addTransaction, setTransactionsStrore} = transactionSlice.actions

export default transactionSlice.reducer;
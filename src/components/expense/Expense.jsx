import React, {useEffect, useState} from 'react';
import './Expense.css';
import {UilHome, UilTimes} from '@iconscout/react-unicons';
import {Link, useNavigate} from 'react-router-dom';
import {categoryOptions} from "../../data/Data";
import {useDispatch} from 'react-redux';
import moment from 'moment/moment';
import {addExpense, changePeriod} from '../../features/transaction/transactionSlice';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {MenuItem} from '@mui/material';
import Typography from '@mui/material/Typography';
import {ApiCall, notification} from "../../helpers/utils";

const Expense = ({setIsAdded}) => {
    const navigate = useNavigate()
    const cat = categoryOptions;
    const typeTx = "expense"
    const [category, setCategory] = useState("");

    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [loadingGet, setLoadingGet] = useState(false)
    const [categories, setCategories] = useState([])
    const onTitleChange = e => setTitle(e.target.value)
    const onAmountChange = e => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))

            setAmount(e.target.value)
        const val = parseFloat(e.target.value);
        if (isNaN(val)) {
            setAmount('');
            return;
        }
        setAmount(val);
    }

    const formatDate = moment(moment((date), 'YYYY-MM-DD')).format('MM-DD-YYYY');

    const [titleError, setTitleError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    const onSaveExpenseClick = async (e) => {
        e.preventDefault()
        setTitleError(false)
        setAmountError(false)
        setDateError(false)
        setCategoryError(false)

        if (title === '') {
            setTitleError(true)
        }

        if (amount === 0) {
            setAmountError(true)
        }


        if (category === '') {
            setCategoryError(true)
        }

        if (title && amount && category) {

            const body = {
                description: title,
                amount,
                category_id:category,
                type: typeTx
            }
            console.log("body ", body)

            const res = await ApiCall("transaction", "POST", body)
            if(res?.status === 200){
                notification("success", "Expense added successfully")
            setTitle('')
            setAmount('')
            setDate('')
            setCategory('')
             navigate("/")
            // dispatch(changePeriod(0))
            setIsAdded(true)
            }else {
                notification("error", "Expense not added")
            }
        }
    }

    async function getCategories() {
        setLoadingGet(true)
        const response = await ApiCall(`category?type=${typeTx}`, "GET")
        setLoadingGet(false)
        console.log("response ", response)
        if (response.status === 200) {
            console.log("categories ", response.data)
            const datas = response.data.map((data) => {
                return {
                    id: data.id,
                    title: data.name,
                    icon: UilHome,
                    color: "#A95EC2",
                }
            })
            console.log("datas formated ", datas)
            setCategories(datas)
            // dispatch(setCategories(response.data))
        }
    }

    useEffect(() => {
        getCategories()
    }, []);
    return (
        <div className='transaction-container'>
            <div className='transaction-top'>
                <Link to='/' className='transaction-button'>
                    <div className='btn-cancel'>
                        <UilTimes/>
                        <label>Cancel transaction</label>
                    </div>
                </Link>
            </div>
            <div className='transaction-card'>
                <div className="transaction-title">
                    Add new expense
                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 3, display: "flex"},
                    }}
                    autoComplete="off"
                    noValidate
                    onSubmit={onSaveExpenseClick}
                >
                    <TextField
                        className='textfield'
                        variant="outlined"
                        label="Name of Expense"
                        value={title}
                        onChange={onTitleChange}
                        required
                        inputProps={{maxLength: 15}}
                        error={titleError}
                        helperText={titleError && "Please fill in the name"}
                    />
                    <TextField
                        className='textfield'
                        value={amount}
                        id="filled-adornment-amount"
                        inputProps={{maxLength: 6}}
                        onChange={onAmountChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                        error={amountError}
                        helperText={amountError && "Please fill in the amount"}
                    />


                    <TextField
                        className='textfield'
                        id="demo-simple-select"
                        value={category}
                        label="Select Category"
                        select
                        onChange={handleCategory}
                        required
                        error={categoryError}
                        helperText={categoryError && "Please select the category"}
                    >
                        {categories.map((cat) => (
                            <MenuItem
                                key={cat.id}
                                value={cat.id}
                            >
                                <cat.icon
                                    className='category-icon'/>
                                <label>
                                    {cat.title}</label>
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography align='center'>
                        <button className='add-btn btn btn-outline-dark'>Save</button>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};
export default Expense;
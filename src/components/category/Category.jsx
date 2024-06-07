import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {UilHome, UilTimes} from "@iconscout/react-unicons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {categoryOptions} from "../../data/Data";
import {ApiCall, notification} from "../../helpers/utils";
import TableCategory from "../table/TableCategory";
import { motion } from 'framer-motion';
import MyLoader from "../loader/MyLoader";
const Category = () => {
    const wrapperVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        }
    };
    const cats = [
        {
            id: 1,
            title: "income",
            icon: UilHome,
            color: "#A95EC2",
        },
        {
            id: 2,
            title: "expense",
            icon: UilHome,
            color: "#A95EC2",
        },
    ];
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [categories, setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingGet,setLoadingGet] = useState(false)

    async function onSave(e){
        e.preventDefault();
        console.log("name ", name)
        console.log("type ", type)

        const data = {name, type}
        setLoading(true)
        const res = await ApiCall("category", "POST", data)
        setLoading(false)
        if(res.status === 200){
            notification("success", "Category added successfully")
            getCategories()
           setShowAdd(false)
        }else{
            notification("error", "Category not added")
        }
    }

    async function getCategories(){
        setLoadingGet(true)
        const response = await ApiCall("category", "GET")
        setLoadingGet(false)
        console.log("response ", response)
        if(response.status === 200){
            console.log("categories ", response.data)
            setCategories(response.data)
           // dispatch(setCategories(response.data))
        }
    }

    useEffect(() => {
         getCategories()
    }, []);
    return (
        <div className="container">

            <div className="mt-2">
                <button
                    onClick={() => setShowAdd(true)}
                    className="reset-btn btn btn-outline-success">Add new category
                </button>
            </div>
            <br/>
            <br/>
            {
                showAdd &&
                <motion.div
                    layout
                    variants={wrapperVariants}
                    // animate={searchActive ? 'visible' : 'hidden'}
                    transition={{duration: 0.5}}
                    className="search-component">
                    <div className='transaction-container'>
                        <div className='transaction-top'>
                            {/*<Link to='/' className='transaction-button'>*/}
                            <div className='btn-cancel ' onClick={() => setShowAdd(false)}>
                                <UilTimes/>
                                <label>Cancel</label>
                            </div>
                            {/*</Link>*/}
                        </div>
                        <div className='transaction-card'>
                            <div className="transaction-title">
                                Add new category
                            </div>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': {m: 3, display: "flex"},
                                }}
                                autoComplete="off"
                                noValidate
                                onSubmit={onSave}
                            >
                                <TextField
                                    className='textfield'
                                    variant="outlined"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    inputProps={{maxLength: 15}}
                                    error={nameError}
                                    helperText={nameError && "Please fill in the name"}
                                />

                                <TextField
                                    className='textfield'
                                    id="demo-simple-select"
                                    value={type}
                                    label="Select type"
                                    select
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    error={typeError}
                                    helperText={typeError && "Please select the type"}
                                >
                                    {cats.map((categories) => (
                                        <MenuItem
                                            key={categories.id}
                                            value={categories.title}
                                        >
                                            <categories.icon
                                                className='category-icon'/>
                                            <label>
                                                {categories.title}</label>
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Typography align='center'>
                                    <button className='add-btn btn btn-outline-success' disabled={loading} >
                                        {
                                            loading ? <MyLoader/> : 'Save'
                                        }

                                    </button>
                                </Typography>
                            </Box>
                        </div>
                    </div>
                </motion.div>
            }

            <TableCategory categories={categories} getCategories={getCategories} loading={loadingGet} />
        </div>
    );
};

export default Category;
import {Link, useNavigate} from "react-router-dom";
import {UilTimes} from "@iconscout/react-unicons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {addExpense, changePeriod} from "../../features/transaction/transactionSlice";
import {ApiCall, notification} from "../../helpers/utils";
import {LS} from "../../helpers/security";
import MyLoader from "../loader/MyLoader";


const Login = () => {
    const navigate = useNavigate()
    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [loading,setLoading] = useState(false)

    const onSaveExpenseClick = async (e) => {
        e.preventDefault()
if(email === "" || password === "")
    return notification("error","Please fill all fields")
        const response = await ApiCall("auth/login", "POST", {email, password})
        console.log("response ", response)
        if(response.status === 200){
            notification("success", "Login successful welcome")
            LS.set("token", response.data.authToken)
            window.location.href = "/"
        }else {
            notification("error","Invalid email or password")
        }

        }


    return (
        <div>
            <div className='transaction-container '>
                <div className='transaction-top'>
                    {/*<Link to='/' className='transaction-button'>*/}
                    {/*    <div className='btn-cancel'>*/}
                    {/*        <UilTimes/>*/}
                    {/*        <label>Cancel transaction</label>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                </div>
                <div className='transaction-card'>
                    <div className="transaction-title">
                        Login Here
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
                            label="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            // inputProps={{maxLength: 15}}
                            // error={titleError}
                            helperText={emailError && "Please fill in the email"}
                        />
                        <TextField
                            type="password"
                            className='textfield'
                            label="Your password"
                            value={password}
                            id="filled-adornment-amount"
                            // inputProps={{maxLength: 6}}
                            onChange={(e) => setPassword(e.target.value)}
                            // InputProps={{
                            //     startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            // }}
                            required
                            error={passwordError}
                            helperText={passwordError && "Please fill in the password"}
                        />
                        <Typography align='center'>
                            <button className='add-btn '  disabled={loading}>
                                {
                                    loading ? <MyLoader/> : 'Login'
                                }
                                </button>
                        </Typography>
                    </Box>
                  <div className="text-center">
                      Or <Link to='/register'>Register</Link>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
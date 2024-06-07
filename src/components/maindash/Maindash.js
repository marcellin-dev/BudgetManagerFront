import React, {useEffect, useState} from "react";
import Budget from "../budget/Budget";
import Period from "../period/Period";
import TableTransactions from "../table/TableTransactions";
import "./Maindash.css";
import IncomeCard from "../cards/IncomeCard";
import ExpenseCard from "../cards/ExpenseCard";
import {ApiCall} from "../../helpers/utils";
import {useDispatch} from "react-redux";
import {setTransactionsStrore} from "../../features/transaction/transaction";

const MainDash = ({ page, setPage, isAdded, setIsAdded }) => {
    const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
const [transactions, setTransactions] = useState([])


    async function getTransactions(){
        const res = await ApiCall("transaction", "GET")
        if(res.status === 200){
            console.log("res.data ", res.data)
            setTransactions(res.data)
            dispatch(setTransactionsStrore(res.data))
        }
    }

    useEffect(() => {
        getTransactions()
    }, []);
  return (
    <div className="maindash">
      <div className="top">
        <Budget />
        <Period />
      </div>
      <div className="cards">
        <div className="parent-container">
          <IncomeCard isOpen={isOpen} setIsOpen={setIsOpen} />
          <ExpenseCard isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <TableTransactions transactions={transactions} page={page} setPage={setPage} isAdded={isAdded} setIsAdded={setIsAdded} onRefresh={getTransactions} />
    </div>
  );
};

export default MainDash;
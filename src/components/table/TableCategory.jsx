import React, {useEffect, useState} from 'react';
import {Tooltip} from "@mui/material";
import {UilSearch, UilTrash} from "@iconscout/react-unicons";
import {NumericFormat} from "react-number-format";
import {deleteTransaction} from "../../features/transaction/transactionSlice";
import Pagination from "@mui/material/Pagination";
import {useMediaQuery} from "react-responsive";
import {ApiCall, notification} from "../../helpers/utils";
import MyLoader from "../loader/MyLoader";

const TableCategory = ({categories, loading, getCategories}) => {
    const [heightEmptyRows, setHeightEmptyRows] = useState(0)
    const [emptyRows, setEmptyRows] = useState(0)
    const rowsPerPage = 8;
    const [page, setPage] = useState(1);
    const isDesktop = useMediaQuery({
        query: '(min-width: 480px)'
    });
    const isMobile = useMediaQuery({
        query: '(max-width: 480px)'
    });

    async function deleteCategory(id) {
        const res = await ApiCall(`category/${id}`, "DELETE")
        if (res.status === 200) {
            notification("success", "Category deleted successfully")
            getCategories()
        } else {
            notification("error", "Category not deleted")
        }
    }

    useEffect(() => {
        if (isDesktop) {
            setHeightEmptyRows(34)
        } else if (isMobile) {
            setHeightEmptyRows(66)
        }
    }, [isDesktop, isMobile])
    return (
        <div>

            <div className="table-container">

                <table>

                    <thead>

                    <tr>
                        {isDesktop &&
                            <>
                                <th>Title</th>
                                <th>Type</th>
                            </>
                        }
                        {isMobile &&
                            <>
                                <th>Title/Cat.</th>
                            </>
                        }
                        <th>Date</th>
                        <th>-/+</th>
                        <th>Action
                            {/*<Tooltip title="Click to search for transactions"*/}
                            {/*         placement='top'*/}
                            {/*         arrow>*/}
                            {/*    <div*/}
                            {/*        className='search-transactions'*/}
                            {/*        onClick={HandleActiveSearch}*/}
                            {/*    >*/}
                            {/*        <UilSearch className="search-button"/>*/}
                            {/*    </div>*/}
                            {/*</Tooltip>*/}
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {loading ?
                        <tr>
                            <td colSpan="5">
                                <div className="text-center">
                                    <MyLoader/>
                                </div>
                            </td>
                        </tr>
                        : null}
                    {(categories || []).slice((page - 1) * rowsPerPage, page * rowsPerPage)
                        .map((transaction) => (
                            <tr key={transaction.id}
                                // className={transaction.id === addedId && itemAnimation ? "added" : null}
                            >
                                {isDesktop &&
                                    <>
                                        <td>{transaction.name}</td>
                                        <td>{transaction.type}</td>
                                    </>
                                }
                                {isMobile &&
                                    <>
                                        <td className="td-mobile">{transaction.name}/<span>{transaction.type}</span>
                                        </td>
                                    </>
                                }
                                <td>{new Date(transaction.created_at)?.toDateString()}</td>
                                {transaction.type === "income" &&
                                    <td>
                                        <span className='amount-plus'>+  </span>
                                        <NumericFormat value={transaction.amount} displayType="text"
                                                       thousandSeparator={true} prefix="$"/>
                                    </td>}
                                {transaction.type === 'expense' &&
                                    <td>
                                        <span className='amount-min'>- </span>
                                        <NumericFormat value={transaction.amount} displayType="text"
                                                       thousandSeparator={true} prefix="$"/>
                                    </td>}
                                <td>
                                    <Tooltip title="Delete"
                                             placement='top'
                                             arrow>
                                        <div
                                            className='delete-transaction-btn'
                                            onClick={() => deleteCategory(transaction.id)}
                                        >
                                            <UilTrash/>
                                        </div>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tbody>
                    <tr>
                        <td
                            className="no-transactions"
                            colSpan="4">
                            {/*{noTransactions}*/}
                        </td>

                        {emptyRows > 0 && (
                            <td className="no-transactions" style={{height: `${heightEmptyRows}` * emptyRows}}>
                            </td>
                        )}
                    </tr>
                    </tbody>

                </table>

                <Pagination
                    size="small"
                    className="pagination"
                    variant="outlined"
                    shape="rounded"
                    count={categories?.length || 0}
                    onChange={(page) => setPage(page)}
                    page={page}
                    showFirstButton
                    showLastButton
                ></Pagination>
            </div>

        </div>
    );
};

export default TableCategory;
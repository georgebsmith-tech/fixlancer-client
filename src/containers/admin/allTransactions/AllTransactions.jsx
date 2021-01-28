import React, { useEffect, useState } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import TransactionsList from './TransactionsList'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }
}
const AllTransactions = () => {
    const [transactionsStore, setTransactionsStore] = useState([])
    const [transactions, setTransactions] = useState([])
    const [showSearchBTN, setShowSearchBTN] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/transactions/list`
            const response = await axios.get(usersURL, config)
            const data = response.data
            setTransactions(data)
            setTransactionsStore(data)
            console.log(data)

        }
        fetchData()

    },
        [])
    useEffect(() => {
        if (searchTerm.length >= 1)
            setTransactions(transactionsStore.filter(transaction => transaction.username.toLowerCase().includes(searchTerm.toLowerCase())))
        else
            setTransactions(transactionsStore)
    }, [searchTerm])
    const handleSerach = () => {
        setTransactions(transactions.filter(transaction => transaction.username.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    return (
        <main className="main">
            <AdminHeading
                title="All Transactions"
            />
            <div className="flex-end relative">
                <input
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    className="padd10 padd5-top-bottom border-smooth no-outline"
                    type="text" placeholder="Search a user e.g Smith" />
                {showSearchBTN &&
                    <i
                        onClick={handleSerach}
                        className="fa fa-search font15 padd10 pointer" style={{ position: "absolute", top: -2, right: -2 }}></i>
                }

            </div>
            <TransactionsList
                transactions={transactions} >

            </TransactionsList>
        </main>
    );
}

export default AllTransactions;

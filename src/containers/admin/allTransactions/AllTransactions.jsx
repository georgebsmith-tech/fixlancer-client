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
    const [transactions, settransactions] = useState([])
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/transactions/list`
            const response = await axios.get(usersURL, config)
            const data = response.data
            settransactions(data)
            console.log(data)

        }
        fetchData()


    },
        [])
    return (
        <main className="main">
            <AdminHeading
                title="All Transactions"
            />
            <TransactionsList
                transactions={transactions} />
        </main>
    );
}

export default AllTransactions;

import React, { useState, useEffect } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import TransactionsList from '../../finance/TransactionsList'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'

const DetailedTransaction = ({ match }) => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/transactions/${match.params.username}`
            const response = await axios.get(url)
            setTransactions(response.data.data)
            console.log(response.data.data)
            // setIsloading(false)
        }
        fetchData()


    }, [])
    return (<main className="main">
        <AdminHeading
            title={"All Transactions made by " + match.params.username}
        />
        {
            transactions.length === 0 ? <div className="font20 center-text padd20 bg-white">No transactions have been made by
             <span className="bold"> {match.params.username}</span></div>
                :
                <TransactionsList
                    transactions={transactions}
                />
        }

    </main>
    );
}

export default DetailedTransaction;

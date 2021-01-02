import React, { useState, useEffect } from 'react'
import UserFooter from "../../components/UserFooter"
import UserHeader from "../../components/UserHeader"
import FinanceNavigation from "./FinanceNavigations"
import TransactionsList from './TransactionsList'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'

const TransactionHistory = () => {
    const username = localStorage.getItem("username")

    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/transactions/${username}`
            const response = await axios.get(url)
            setTransactions(response.data.data)
            console.log(response.data.data)
            setIsloading(false)
        }
        fetchData()


    }, [])

    return (
        <>
            <UserHeader />
            { isLoading ? <Loading height="90vh" /> :
                <main className="main">
                    <h1>Finance</h1>
                    <div class="grid-2-21 margin20-top">
                        <section>
                            <div class="border-smooth bg-white margin20-top">
                                <header class="bg-heading padd10">
                                    <i className="fa fa-bar-chart font16 bold margin3-right">
                                    </i>
                                    <h1 class="inline-block font16 bold">Transactions</h1>
                                </header>
                                {
                                    transactions.length === 0 ? <div className="padd20 font14">No transactions yet.</div> :

                                        <TransactionsList transactions={transactions} />
                                }

                            </div>

                        </section>
                        <section>
                            <FinanceNavigation />

                        </section>


                    </div>

                </main>
            }

            <UserFooter />

        </>
    )
}


export default TransactionHistory
import React, { useState, useEffect } from 'react'

import BalanceList from './BalanceList'
import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'
import { Loading } from '../../../components/helperComponents/Loading'


const UserBalances = () => {
    const [wallets, setWallets] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/wallets/`
            const response = await axios.get(url, config)
            const data = response.data
            setWallets(data)

            console.log(data)

            // setCountOfUsersWithFixes(data.usersWithFixes)


            setIsLoading(false)
        }
        fetchData()


    },
        [])
    const style = {
        padd: {
            padding: "5px 10px"
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setIsLoading(true)
        async function fetchData() {
            const url = `${domain}/api/wallets?q=${searchUsers}`
            const response = await axios.get(url, config)
            const data = response.data
            setWallets(data)
            setIsLoading(false)
        }
        fetchData()

    }

    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="User Balance"

                />

                <div className="margin20-bottom">
                    <form>
                        <input
                            onChange={(e) => setSearchUsers(e.target.value)}
                            style={style.padd}
                            text="text"
                            placeholder="Username"
                            className="no-outline border-smooth margin5-right font15 "
                        />

                        <button
                            type="submit"
                            onClick={handleSearch}
                            style={style.padd}
                            className="border5-radius no-outline bold font14 text-white bg-dark-blue border-dark-blue"
                        >
                            Search
                        </button>
                    </form>

                </div>
                {
                    isLoading ? <Loading
                        message="Loading Financial Details"
                        height="70vh"
                    /> : <BalanceList wallets={wallets} />
                }


                {/* <OrdersList orders={presentOrders} /> */}
            </main>

        </>

    )
}

export default UserBalances;
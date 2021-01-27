import React, { useEffect, useState } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import WithdrawalsList from './WithdrawalsList'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}
const AllWithdrawals = ({ location }) => {
    const qs = queryString.parse(location.search)
    const [withdrawalsStore, setWithdrawalsStore] = useState([])
    const [withdrawals, setWithdrawals] = useState([])
    const [showSearchBTN, setShowSearchBTN] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [state, setState] = useState(qs.state || "all")
    useEffect(() => {
        setState(qs.state || "all")
        async function fetchData() {
            const usersURL = `${domain}/api/withdrawals${location.search}`
            const response = await axios.get(usersURL, config)
            const data = response.data
            setWithdrawals(data)
            setWithdrawalsStore(data)
            setWithdrawalsStore(data)
            console.log(data)

        }
        fetchData()

    },
        [location.search])
    useEffect(() => {
        if (searchTerm.length >= 1)
            setWithdrawals(withdrawalsStore.filter(transaction => transaction.username.toLowerCase().includes(searchTerm.toLowerCase())))
        else
            setWithdrawals(withdrawalsStore)
    }, [searchTerm])

    const updateWithdrawals = (modified) => {
        setWithdrawals([modified, ...withdrawals.filter(withdrawal => withdrawal._id !== modified._id)])
    }

    const counts = {

    }
    return (
        <main className="main">
            <AdminHeading
                title="All Withdrawals"
            />
            <Header state={state} counts={counts} />
            <div className="flex-end relative margin10-top">
                <input
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    className="padd10 padd5-top-bottom border-smooth no-outline"
                    type="text" placeholder="Search a user e.g Smith" />
                {/* {showSearchBTN &&
                    <i
                        onClick={handleSerach}
                        className="fa fa-search font15 padd10 pointer" style={{ position: "absolute", top: -2, right: -2 }}></i>
                } */}

            </div>


            <WithdrawalsList
                withdrawals={withdrawals}
                updateWithdrawals={updateWithdrawals}
                state={state === "all" ? "" : state} >

            </WithdrawalsList>

        </main>
    );
}

export default AllWithdrawals;

const Header = ({ counts = { all: 0, online: 0, banned: 0, active: 0 }, state }) => <header
    className="common-headings">
    <div>
        <Link
            to={`/admin/all-withdrawals`}
            className={state === "all" ? "active" : undefined}
        >All
        {/* (<span>{counts.all}</span>) */}
        </Link>
    </div>
    <div>
        <Link
            to={`/admin/all-withdrawals?state=approved`}
            className={state === "approved" ? "active" : undefined}>Completed
            {/* (<span>{counts.online}</span>) */}
        </Link>
    </div>
    <div>
        <Link to={`/admin/all-withdrawals?state=declined`}
            className={state === "declined" ? "active" : undefined}>Declined
             {/* (<span>{counts.banned}</span>) */}
        </Link>
    </div>
    <div>
        <Link to={`/admin/all-withdrawals?state=pending`}
            className={state === "pending" ? "active" : undefined}>Pending
            {/* (<span>{counts.active}</span>) */}
        </Link>
    </div>
    <div>
        <Link to={`/admin/all-withdrawals?state=cancelled`}
            className={state === "cancelled" ? "active" : undefined}>Cancelled
            {/* (<span>{counts.active}</span>) */}
        </Link>
    </div>
</header>

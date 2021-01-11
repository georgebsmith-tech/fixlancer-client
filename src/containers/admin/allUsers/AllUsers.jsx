import React, { useState, useEffect } from 'react'
import UsersList from './UsersList'
import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'
import { Link } from 'react-router-dom'
import queryString from 'query-string'


const AllUser = ({ location }) => {
    const [users, setUsers] = useState([])
    const [countOfUsersWithFixes, setCountOfUsersWithFixes] = useState(0)
    const [allUsers, setAllUsers] = useState([])
    const qs = queryString.parse(location.search)
    const [state, setState] = useState(qs.state || "all")
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    useEffect(() => {
        setState(qs.state || "all")
        async function fetchData() {
            const usersURL = `${domain}/api/users${location.search}`
            const response = await axios.get(usersURL, config)
            const data = response.data
            console.log(data)
            setUsers(data.users)



            // setIsLoading(false)
        }
        fetchData()


    },
        [location.search])
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/users`
            const response = await axios.get(usersURL, config)
            const data = response.data
            console.log(data)
            setAllUsers(data.users)
            setCountOfUsersWithFixes(data.usersWithFixes)
        }
        fetchData()


    },
        [])
    const counts = {
        all: allUsers.length,
        online: allUsers.filter(user => user.online).length,
        banned: allUsers.filter(user => !user.active).length,
        active: allUsers.filter(user => user.active).length
    }
    const updateUsers = (item) => {
        console.log(item)
        setUsers([item, ...users.filter(user => user._id !== item._id)])
        setAllUsers([item, ...allUsers.filter(user => user._id !== item._id)])
    }

    return (
        <>

            <main
                className="main">
                <AdminHeading
                    title="All Users"
                />
                <h2>Users with Fix: {countOfUsersWithFixes}</h2>
                <Header state={state} counts={counts} />
                <UsersList
                    updateUsers={updateUsers}
                    users={users} />
            </main>

        </>

    )
}

export default AllUser;

const Header = ({ counts = { all: 0, online: 0, banned: 0, active: 0 }, state }) => <header
    className="sales-and-orders-headings">
    <div>
        <Link
            to={`/admin/all-users`}
            className={state === "all" ? "active" : undefined}
        >All (<span>{counts.all}</span>)
        </Link>
    </div>
    <div>
        <Link
            to={`/admin/all-users?state=online`}
            className={state === "online" ? "active" : undefined}>Online (<span>{counts.online}</span>)
         </Link>
    </div>
    <div>
        <Link to={`/admin/all-users?state=banned`}
            className={state === "banned" ? "active" : undefined}>Banned (<span>{counts.banned}</span>)
        </Link>
    </div>
    <div>
        <Link to={`/admin/all-users?state=active`}
            className={state === "active" ? "active" : undefined}>active (<span>{counts.active}</span>)
        </Link>
    </div>
</header>
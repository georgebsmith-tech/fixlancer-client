import React, { useState, useEffect } from 'react'
import UsersList from './UsersList'
import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'

const AllUser = () => {
    const [users, setUsers] = useState([])
    const [countOfUsersWithFixes, setCountOfUsersWithFixes] = useState(0)
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/users/`
            const response = await axios.get(usersURL, config)
            const data = response.data
            console.log(data)
            setUsers(data.users)
            setCountOfUsersWithFixes(data.usersWithFixes)


            // setIsLoading(false)
        }
        fetchData()


    },
        [])

    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="All Users"

                />

                <h2>Users with Fix: {countOfUsersWithFixes}</h2>



                <UsersList users={users} />
            </main>

        </>

    )
}

export default AllUser;
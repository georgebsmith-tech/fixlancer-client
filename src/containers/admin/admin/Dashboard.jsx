import React, { useState, useEffect } from 'react'
import SummaryCard from './SummaryCard'
import { domain } from "../../../helperFunctions/domain"
import UsersList from '../../admin/allUsers/UsersList'
import axios from 'axios'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}

const Dashboard = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/users`
            const response = await axios.get(usersURL, config)
            const data = response.data
            console.log(data)
            setUsers(data.users)

        }
        fetchData()


    },
        [])

    return (
        <main>
            <SummaryCard
                title="Logged In User"
                perc={40}
                count={563}
                state="inc"
            />
            <SummaryCard
                title="Monthly Earning"
                perc={60}
                count={563}
                state="dec"
            />
            <SummaryCard
                title="New Fixes"
                perc={12}
                count={563}
                state="inc"
            />
            <SummaryCard
                title="New Jobs"
                perc={12}
                count={563}
                state="inc"
            />
            <section>
                <h3 className="font20">
                    Recent Users
                </h3>
                <UsersList
                    // updateUsers={updateUsers}
                    users={users} />

            </section>


        </main>
    )
}

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import RatingsList from './RatingsList'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}
const AllTransactions = () => {
    const [ratingsStore, setRatingsStore] = useState([])
    const [ratings, setRatings] = useState([])
    const [showSearchBTN, setShowSearchBTN] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/fixes/ratings`
            const response = await axios.get(usersURL, config)
            const data = response.data
            console.log(data)
            setRatings(data)
            setRatingsStore(data)
            console.log(data)

        }
        fetchData()

    },
        [])
    useEffect(() => {
        if (searchTerm.length >= 1)
            setRatingsStore(ratingsStore.filter(rating => rating.username.toLowerCase().includes(searchTerm.toLowerCase())))
        else
            setRatingsStore(ratingsStore)
    }, [searchTerm])
    const handleSerach = () => {
        setRatings(ratings.filter(rating => rating.username.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    return (
        <main className="main">
            <AdminHeading
                title="All Ratings"
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
            <RatingsList
                ratings={ratings} >

            </RatingsList>
        </main>
    );
}

export default AllTransactions;

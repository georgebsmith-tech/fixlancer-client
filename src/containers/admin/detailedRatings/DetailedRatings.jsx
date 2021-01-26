import React, { useState, useEffect } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import DetailedRatingsList from './DetailedRatingsList'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'

const DetailedRatings = ({ match }) => {
    const [ratings, setRatings] = useState([])

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/fixes/ratings/${match.params.username}`
            const response = await axios.get(url)
            setRatings(response.data)
            console.log(response.data)
            // setIsloading(false)
        }
        fetchData()


    }, [])
    return (<main className="main">
        <AdminHeading
            title={"All Ratings for " + match.params.username}
        />
        {
            ratings.length === 0 ? <div className="font20 center-text padd20 bg-white">No ratings for
             <span className="bold"> {match.params.username}</span></div>
                :
                <DetailedRatingsList
                    ratings={ratings}
                />
        }

    </main>
    );
}

export default DetailedRatings;

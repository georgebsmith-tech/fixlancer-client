import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import FeaturedFixes from '../../components/fixes/RecommendationList'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'

const Featured = () => {
    const [term, setTerm] = useState("")
    const [isLoading, setIsloading] = useState(true)
    const [fixes, setFixes] = useState([])



    const handleChange = (e) => {

        setTerm(e.target.value.trim())
        console.log(e.target.value.trim())


    }
    const subMitSearch = () => {
        setIsloading(true)
        setTerm(term)

    }

    useEffect(() => {

        const fetchDate = async () => {
            const url = `${domain}/api/fixes?state=featured&pg=1`

            const response = await axios.get(url)
            const data = response.data
            setFixes(data)
            setIsloading(false)

        }

        fetchDate()


    }, [])

    return (
        <>
            <PageHeader title="Featured Fixes" background="#f2f2f2" />
            <main className="bg-white">
                <div
                    class="search-by-cat-container margin10-top margin30-bottom">
                    <input
                        typeName="text" class="border-smooth search-by-cat" value={term}
                        onChange={handleChange}
                        placeholder="Search e.g logo"
                    />
                    <i
                        className="fa fa-search font16 search-btn-body"
                        onClick={subMitSearch}></i>
                </div>
                {isLoading ? <Loading height="400px" message="Loading Featured fixes" /> : <FeaturedFixes fixes={fixes} />}
                <JobNavigation />
                <div class="center-text">
                    <Link to="/dashboard" class="button next-btn font16">Home</Link>
                </div>
            </main>
        </>
    )
}


const JobNavigation = () => {
    return <div className="grid-desktop-2">

        <div className="bg-white border-smooth margin20-top">
            <div className="flex-between">
                <div className="font16 padd15-left">
                    Looking to hire?
                                </div>
                <div>
                    <Link to="/dashboard/post-job-request" className="font16 block padd10 margin5 text-white"
                        style={{ background: "#f27415", borderRadius: 5 }}>Post a
                                        Request</Link>
                </div>

            </div>

        </div>
        <div className="bg-white border-smooth margin20-top">
            <div className="flex-between">
                <div className="font16 padd15-left">
                    Looking for work?
                                </div>
                <div>
                    <Link to="/dashboard/create-a-fix" className="font16 block padd10 margin5 text-white"
                        style={{ background: "#36b9cc", borderRadius: 5 }}>Start Selling</Link>
                </div>

            </div>

        </div>
    </div>
}


export default Featured
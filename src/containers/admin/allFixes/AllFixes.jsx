import React, { useEffect, useState } from 'react'
import FixList from '../../../components/fixes/FixList'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const AllFixes = ({ location }) => {
    const [fixes, setFixes] = useState([])
    const [allFixes, setAllFixes] = useState([])
    const qs = queryString.parse(location.search)

    const [state, setState] = useState(qs.state || "all")

    useEffect(() => {
        setState(qs.state || "all")
        async function fetchData() {
            const url = `${domain}/api/fixes${location.search}`
            const response = await axios.get(url)
            const data = response.data.data
            setFixes(data)
            console.log(data)

            // setIsLoading(false)
        }
        fetchData()


    }, [location.search])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/fixes`
            const response = await axios.get(url)
            console.log(response.data.data)
            setAllFixes(response.data.data)

        }
        fetchData()
    }, [])
    const counts = {
        all: allFixes.length,
        draft: allFixes.filter(fix => (!fix.approved)).length,
        published: allFixes.filter(fix => (fix.approved)).length
    }
    return (
        <>
            <Header state={state} counts={counts} />
            <FixList fixes={fixes} admin={true} />
        </>
    )
}

const Header = ({ counts = { all: 0, published: 0, draft: 0 }, state }) => <header
    className="sales-and-orders-headings">
    <div>
        <Link
            to={`/admin/all-fixes`}
            className={state === "all" ? "active" : undefined}
        >All (<span>{counts.all}</span>)
        </Link>
    </div>
    <div>
        <Link
            to={`/admin/all-fixes?state=published`}
            className={state === "published" ? "active" : undefined}>Published (<span>{counts.published}</span>)
         </Link>
    </div>
    <div><Link to={`/admin/all-fixes?state=draft`}
        className={state === "draft" ? "active" : undefined}>Draft (<span>{counts.draft}</span>)</Link>
    </div>

</header>

export default AllFixes;
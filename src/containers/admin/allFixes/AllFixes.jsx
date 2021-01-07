import React, { useEffect, useState } from 'react'
import FixList from '../../../components/fixes/FixList'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'

const AllFixes = () => {
    const [fixes, setFixes] = useState([])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/fixes`
            const response = await axios.get(url)
            const data = response.data.data
            setFixes(data)
            console.log(data)
            // setIsLoading(false)
        }
        fetchData()


    }, [])
    return (
        <>
            <FixList fixes={fixes} admin={true} />
        </>
    )
}


export default AllFixes;
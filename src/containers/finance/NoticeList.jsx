import React, { useState, useEffect } from 'react'

import Notice from './Notice'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'

const NoticeList = () => {
    const [notices, setNotices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const username = "Smith"
    useEffect(() => {

        async function fetchData() {
            const url = `${domain}/api/notices/${username}`
            const response = await axios.get(url)
            setNotices(response.data.notices)
            setIsLoading(false)
            const urlForPatchNotice = `${domain}/api/notices/${username}`
            const response_patch = await axios.patch(urlForPatchNotice)
        }
        fetchData()
    }, [])


    const noticesList = notices.map(notice => <Notice key={notice._id} notice={notice} />)
    let loading = <div
        style={{ width: "100%", height: 500 }} className="bg-white font28 flex-center">
        Loading...
       </div>

    return (isLoading ? loading : <ul className="">
        {noticesList}
    </ul>

    )


}

export default NoticeList;
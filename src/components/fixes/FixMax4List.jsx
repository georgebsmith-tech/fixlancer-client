import React from 'react'
import FixMax4 from './FixMax4'

const FixMax4List = ({ fixes = [] }) => {
    console.log(fixes)

    return (
        <ul className="margin20-top grid-responsive-max4 search-fixes">
            {
                fixes.map(fix => <FixMax4 fix={fix} key={fix._id} />)
            }
        </ul>

    )
}

export default FixMax4List;
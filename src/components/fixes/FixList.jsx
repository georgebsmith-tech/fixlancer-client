import React from 'react'

import Fix from './Fix'



const FixList = ({ fixes = [], admin }) => {

    return (<ul
        className='grid-responsive-6'>
        {fixes.map(fix =>
            <li>
                <Fix key={fix._id} fix={fix} admin={admin} />
            </li>
        )}
    </ul>

    )

}


export default FixList;
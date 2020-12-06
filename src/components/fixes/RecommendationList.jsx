import React, { Component } from 'react'

import Recommendation from './Recommendation'



const RecommendationList = ({ fixes }) => {

    return (<ul
        className='grid-responsive-6'>
        {fixes.map(fix =>
            <li>
                <Recommendation key={fix._id} fix={fix} />
            </li>
        )}
    </ul>

    )

}


export default RecommendationList;
import React from 'react'

import FeaturedFix from './FeaturedFix'



const FeaturedFixesList = ({ fixes, handleSlugChange }) => {

    const theFixes = fixes.map(fix =>
        <FeaturedFix
            key={fix._id}
            handleSlugChange={handleSlugChange}
            fix={fix}
        />
    )


    return (
        <ul
            className='flex fit-content'>
            {theFixes}
        </ul>

    )


}

export default FeaturedFixesList;
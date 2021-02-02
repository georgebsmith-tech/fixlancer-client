import React from 'react'

import {FixMax6Desktop,FixMax6Mobile} from './FixMax6'



const FixListMax6 = ({ fixes, handleSlugChange }) => {

    const theFixes = fixes.map(fix =>
    
        <FixMax6Mobile
            key={fix._id}
            handleSlugChange={handleSlugChange}
            fix={fix}
        />
            
   
    )


    return (
        <>
        <ul
            className='grid-responsive-6 mobile'>
            {theFixes}
        </ul>
        <ul className="grid-responsive-desk-6">
        {
          fixes.map(fix=> <FixMax6Desktop
            key={fix._id}
            handleSlugChange={handleSlugChange}
            fix={fix}
        />)
        }
        </ul>
</>
    )


}

export default FixListMax6;
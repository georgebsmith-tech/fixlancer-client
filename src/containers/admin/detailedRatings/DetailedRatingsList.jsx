import React, { useState } from 'react'

import { DetailRatingMobile, DetailRatingDesktop } from './DetailedRating'

const DetailedRatingsList = ({ ratings }) => {


    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-3 mobile">
                {
                    ratings.map(rating => <DetailRatingMobile
                        rating={rating}


                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    ratings.map(rating =>
                        <DetailRatingDesktop
                            rating={rating}
                            key={rating._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default DetailedRatingsList;
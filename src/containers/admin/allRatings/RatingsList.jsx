import React, { Children, useState } from 'react'
import { Link } from 'react-router-dom'
import { RatingMobile, RatingDesktop } from './Rating'

const RatingsList = ({ ratings = [], updateUsers, children }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            {children}
            <ul
                className="grid-responsive-max6 mobile">
                {
                    ratings.map(rating => <RatingMobile
                        rating={rating}
                        key={rating._id}
                        updateUsers={updateUsers}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    ratings.map(rating =>
                        <RatingDesktop
                            rating={rating}
                            key={rating._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default RatingsList;
import React from 'react'

import { CategoryMobile, CategoryDesktop } from './Category'

const CategoriesList = ({ categories, deleteItem }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-max6 mobile">
                {
                    categories.map(category => <CategoryMobile
                        category={category}
                        key={category._id}
                        deleteItem={deleteItem}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    categories.map(category =>
                        <CategoryDesktop
                            category={category}
                            key={category._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default CategoriesList;
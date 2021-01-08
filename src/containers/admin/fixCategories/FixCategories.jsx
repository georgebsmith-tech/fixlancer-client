import React, { useEffect, useState } from 'react'
import CategoriesList from './CategoriesList'

import { domain } from '../../../helperFunctions/domain'
import axios from 'axios'
const FixCategories = () => {
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [prices, setPrices] = useState("")
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/categories?content=with-fix-count`
            const response = await axios.get(url)
            console.log(response.data)
            setCategories(response.data.data)
        }
        fetchData()
    }, [])

    const handlenewcategory = (e) => {
        e.preventDefault()
        const body = {
            name: categoryName,
            prices: prices.split(",")
        }
        console.log(body)
        console.log("new category")
    }
    return (
        <main className="main">
            <div
            // className="grid2-1-4"
            >
                <div className="bg-white border-smooth margin10-top">
                    <h2 className="margin10-bottom bold padd10">Add new Fix Category</h2>
                    <form className="padd10" onSubmit={handlenewcategory}>
                        <fieldset>
                            <input
                                value={categoryName}
                                type="text"
                                placeholder="Name"
                                onChange={(e) => { setCategoryName(e.target.value) }}

                            />
                        </fieldset>

                        <fieldset>
                            <input
                                value={prices}
                                type="text"
                                placeholder="Include prices seperated by commas"
                                onChange={(e) => setPrices(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit">Add New Category</button>
                        </fieldset>
                    </form>

                </div>
                <CategoriesList categories={categories} />

            </div>

        </main>
    )
}

export default FixCategories;
import React, { useEffect, useState } from 'react'
import CategoriesList from './CategoriesList'

import { domain } from '../../../helperFunctions/domain'
import axios from 'axios'
const config = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("auth-token")
    }
}
async function postData(url, body = {}) {
    try {
        const response = await axios.post(url, body, config)
        return response.data
    } catch (err) {
        console.log(err)
    }

}
const FixCategories = () => {
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [prices, setPrices] = useState("")
    const [subCategory, setSubCategory] = useState([])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/categories?content=with-fix-count`
            const response = await axios.get(url)

            setCategories(response.data.data)
        }
        fetchData()
    }, [])

    const handlenewcategory = async (e) => {
        e.preventDefault()
        const body = {
            name: categoryName,
            prices: prices.split(",").map(n => parseFloat(n)),
            sub: subCategory
        }
        const data = await postData(`${domain}/api/categories`, body)

        console.log(data)
        if (data.error) {
            console.log(data.error)
            return
        }
        setCategories([data, ...categories])
        setSubCategory("")
        setCategoryName("")
        setPrices([])
    }
    const deleteItem = (item) => {
        console.log(item)

        setCategories(categories.filter(category => category._id !== item._id))

    }
    return (
        <main className="main padd20-bottom">
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
                            <input
                                value={subCategory}
                                type="text"

                                placeholder="Include a sub category."
                                onChange={(e) => setSubCategory(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit">Add New Category</button>
                        </fieldset>
                    </form>

                </div>
                <CategoriesList
                    categories={categories}
                    deleteItem={deleteItem}
                />

            </div>
            <section
                style={{ paddingBottom: 50 }}
                className="flex-between font15 margin10-top">
                <div></div>
                <div>{categories.length} items</div>
            </section>

        </main>
    )
}

export default FixCategories;
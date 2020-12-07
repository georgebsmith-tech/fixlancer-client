import React, { useEffect, useState } from 'react'

import UserFooter from '../../components/UserFooter'
import { domain } from '../../helperFunctions/domain'
import axios from 'axios'
import UserHeader from '../../components/UserHeader'
import { Loading } from '../../components/helperComponents/Loading'

const PostJobRequest = ({ history }) => {
    const [categories, setcategories] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [prices, setPrices] = useState([])
    const [delivery, setDelivery] = useState("")
    const [isUploading, setisUploading] = useState(false)
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/categories?content=slim`
            const response1 = await axios.get(url)
            const data = response1.data.data
            // console.log(data)
            setcategories(data)
            setIsloading(false)
        }
        fetchData()

    }, [])

    const handleChangeCategory = async (e) => {
        setCategory(e.target.value)
        const prices = (categories.filter(category => category.name === e.target.value))[0] ?
            (categories.filter(category => category.name === e.target.value))[0].prices
            : []
        setPrices(prices)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = {
            title,
            category,
            price,
            delivery,
            description

        }
        function sendPost(body) {
            fetch(`${domain}/api/requests`,
                {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `BEARER ${localStorage.getItem("auth-token")}`
                    }
                })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                        return history.push("/login")

                    }
                    history.push("/dashboard/my-requests")
                }).catch(err => {
                    console.log(err)
                })
        }
        sendPost(body)
    }


    return (
        <>
            <UserHeader />
            {
                isLoading ? <Loading
                    height="67vh"

                /> :

                    <main className="post-a-request-main">
                        <section className="form-container">
                            <h3 className="form-title">What service do you want fixed? </h3>
                            <form>
                                <fieldset><input
                                    type="text"
                                    placeholder="Title"
                                    name="post-title" id="post-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                                </fieldset>

                                <fieldset>
                                    <textarea
                                        name="post-descr"
                                        id="post-descr"
                                        placeholder="Describe the job you want done. Be detailed as possible..."
                                        cols="30"
                                        rows="6"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>

                                    </textarea>
                                </fieldset>

                                <div className="selections">
                                    <fieldset>
                                        <select
                                            value={category}
                                            onChange={handleChangeCategory}
                                            name="category"
                                            id="category"
                                            data-placeholder="Please select a category..">
                                            <option value="">Select a Category...</option>
                                            {
                                                categories.map(category => <option
                                                    value={category.name}
                                                    key={category._id}>{category.name}</option>)
                                            }
                                        </select>
                                    </fieldset>
                                    {
                                        prices.length !== 0 &&

                                        <fieldset>
                                            <select
                                                onChange={((e) => { setPrice(e.target.value) })}
                                                name="prices" id="prices" data-placeholder="Please select a category..">
                                                <option value="">Select Price...</option>
                                                {
                                                    prices.map(price => <option
                                                        value={price}
                                                        key={price}>{price}</option>)
                                                }
                                            </select>
                                        </fieldset>
                                    }
                                    <fieldset>
                                        <select
                                            onChange={(e) => { setDelivery(e.target.value) }}
                                            name="delivery" id="delivery" data-placeholder="Please select a category..">
                                            <option value="">Delivery Days</option>
                                            <option value="2">2 days</option>
                                            <option value="3">3 days</option>
                                            <option value="4">4 days</option>
                                            <option value="14">14 days</option>
                                            <option value="21">21 days</option>
                                            <option value="30">30 days</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <fieldset>
                                    <button
                                        onClick={handleSubmit}
                                        className="submit-post-request">Submit Post
                                    </button>
                                </fieldset>


                            </form>


                        </section>

                    </main>
            }
            <UserFooter />

        </>
    );
}


export default PostJobRequest;

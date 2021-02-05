import React, { useEffect, useState } from 'react'

import UserFooter from '../../components/UserFooter'
import { domain } from '../../helperFunctions/domain'
import axios from 'axios'
import UserHeader from '../../components/UserHeader'
import { Loading } from '../../components/helperComponents/Loading'
import queryString from 'query-string'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'
import { withRouter } from 'react-router-dom'

const PostJobRequest = ({ history, location }) => {
    const qs = queryString.parse(location.search)
    const [categories, setcategories] = useState([])
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [prices, setPrices] = useState([])
    const [delivery, setDelivery] = useState("")
    const [isUploading, setisUploading] = useState(false)
    const [isLoading, setIsloading] = useState(true)
    console.log(qs)

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/categories?content=slim`
            const response1 = await axios.get(url)
            const data = response1.data.data
            // console.log(data)
            setcategories(data)
            if (qs.job) {
                const url = `${domain}/api/requests/request/${qs.job}`
                const response = await axios.get(url)
                const data = response.data
                console.log(data)
                setDescription(data.description)
                setTitle(data.title)
                setDelivery(data.delivery)
                setCategory(data.category)
                setPrice(data.price)
                setId(data._id)


            }
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

    function getBody() {
        return {
            title,
            category,
            price,
            delivery,
            description

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = getBody()
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log("update")
        const body = getBody()
        body.id = id
        console.log(body)
        const response = await axios.put(`${domain}/api/requests/${id}?action=update`, body)
        const data = response.data
        console.log(data)




    }


    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            {
                isLoading ? <Loading
                    height="67vh"

                /> :

                    <main className="main">
                        <div>
                            <section
                                style={{ maxWidth: 700 }}
                                className="form-container">
                                {
                                    qs.job ? <h3
                                        className="form-title">

                                        Edit Request-
                                    <span className="bold"> {title}</span>

                                    </h3>
                                        :
                                        <h3
                                            className="form-title">

                                            What service do you want fixed?
                             </h3>
                                }

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
                                            (prices.length !== 0 || qs.job) &&

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
                                                value={delivery}
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
                                        {
                                            qs.job ? <button
                                                onClick={handleUpdate}
                                                className="submit-post-request">Update Post
                                    </button>
                                                :
                                                <button
                                                    onClick={handleSubmit}
                                                    className="submit-post-request">Submit Post
                                    </button>
                                        }

                                    </fieldset>


                                </form>


                            </section>
                        </div>

                    </main>
            }
            <UserFooter />

        </>
    );
}


export default withRouter(PostJobRequest);

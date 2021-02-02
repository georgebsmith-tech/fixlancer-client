import React, { useState, useEffect } from 'react'

import UserFooter from '../components/UserFooter'
import axios from 'axios'
import { domain } from '../helperFunctions/domain'
import UserHeader from '../components/UserHeader'
import { Loading } from '../components/helperComponents/Loading'
import UserHeaderDesktop from '../components/UserHeaderDesktop'


const CreateFix = ({ history }) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [photo1, setPhoto1] = useState({})
    const [photo2, setPhoto2] = useState({})
    const [photo3, setPhoto3] = useState({})
    const [deliveryDays, setDeliveryDays] = useState("")
    const [tags, setTags] = useState("")
    const [category, setcategory] = useState("")
    const [description, setDescription] = useState("")
    const [requirements, setRequirements] = useState("")
    const [categories, setcategories] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [extra2Desc, setExtra2Desc] = useState("")
    const [extra1Desc, setExtra1Desc] = useState("")
    const [extra2Amount, setExtra2Amount] = useState("")
    const [extra1Amount, setExtra1Amount] = useState("")
    const [video, setVideo] = useState({})
    const [workSample1, setWorkSample1] = useState("")
    const [workSample2, setWorkSample2] = useState("")
    const [workSample3, setWorkSample3] = useState("")
    const [workSample4, setWorkSample4] = useState("")
    const [workSample5, setWorkSample5] = useState("")
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/categories`
            const response1 = await axios.get(url)
            const data = response1.data.data
            // console.log(data)
            setcategories(data)
            setIsloading(false)
            window.scrollTo(0, 0)
        }
        fetchData()

    }, [])

    const handleCatChange = (e) => {
        setcategory(e.target.value)
        const cat = categories.find(cat => cat.name === e.target.value)
        setSubCategories(cat.subcat)

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const tagsList = tags.split(",").map(tag => tag.trim())

        const body = {
            title,
            description,
            requirements,
            price,
            category,
            subCategory,
            deliveryDays,
            tags: tagsList,
            extra2Amount,
            extra2Desc,
            extra1Amount,
            extra1Desc,
            photos: [photo1, photo2, photo3],
            video,
            workSamples: [
                workSample1,
                workSample2,
                workSample3,
                workSample4,
                workSample5
            ]

        }
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("requirements", requirements)
        formData.append("price", price)
        formData.append("category", category)
        formData.append("deliveryDays", deliveryDays)
        formData.append("tags", tagsList)
        formData.append("subCategory", subCategory)
        formData.append("photos", photo1)
        formData.append("photos", photo2)
        formData.append("photos", photo3)
        formData.append("extra1Desc", extra1Desc)
        formData.append("extra1Amount", extra1Amount)
        formData.append("extra2Desc", extra2Desc)
        formData.append("extra2Amount", extra2Amount)
        formData.append("video", video)
        formData.append("workSamples", workSample1)
        formData.append("workSamples", workSample2)
        formData.append("workSamples", workSample3)
        formData.append("workSamples", workSample4)
        formData.append("workSamples", workSample5)

        try {
            const response = await axios.post(`${domain}/api/fixes`, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            console.log(response.data)
            // return
            history.push("/dashboard")
        } catch (err) {
            console.log("error")
        }





    }
    const handleVideoChange = (e) => {

        let attachedFile;
        if (e.target.files.length === 1) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                attachedFile = reader.result

                setVideo(attachedFile)


            }

        }

    }

    const handleImage3Change = (e) => {

        let attachedFile;
        if (e.target.files.length === 1) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                attachedFile = reader.result

                setPhoto3(attachedFile)
                // console.log(photo3)

            }
        }
    }
    const handleImage2Change = (e) => {

        let attachedFile;
        if (e.target.files.length === 1) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                attachedFile = reader.result

                setPhoto2(attachedFile)
                // console.log(photo2)

            }
        }
    }

    const handleImage1Change = (e) => {

        let attachedFile;
        const reader = new FileReader()
        if (e.target.files.length === 1) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                attachedFile = reader.result
                // setImage(attachedFile)
                setPhoto1(attachedFile)
                // console.log(photo1)
            }
        }
    }
    return (<>
        <UserHeader />
        <UserHeaderDesktop />
        {
            isLoading ? <Loading height="90vh" message="Just a moment" /> :

                <main class="main">

                    <h1>Create a Fix to start Selling</h1>
                    <form
                        id="fix-form"
                        name="fix-form">
                        <section
                            className="form-group the-first">

                            <fieldset>
                                <textarea
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    value={title}
                                    name="fix-title" id="fix-title"
                                    cols="30"
                                    rows="2"
                                    placeholder="Enter fix title">

                                </textarea>
                            </fieldset>


                            <small
                                className="important">* Your fix title should start with "i will" or "i can"
                    </small>
                        </section>
                        <section
                            className="form-group-2-in-row">
                            <div>
                                <div
                                    className="section-head">
                                    <span>Description</span>

                                </div>
                                <section class="form-group">
                                    <div>
                                        <fieldset>
                                            <textarea
                                                value={description}
                                                name="fix-descr" id="fix-descr" cols="30"
                                                rows="8"
                                                placeholder="Be detailed as possible"
                                                onChange={(e) => {
                                                    setDescription(e.target.value)
                                                }}>

                                            </textarea>
                                        </fieldset>
                                        <small
                                            className="warning">* Posting of contact information will result in permanent blocking of
                                            your
                                            account
                                </small>
                                    </div>
                                </section>
                            </div>

                            <div>
                                <div
                                    className="section-head">
                                    <span>Details you need to start the project
                            </span>

                                </div>
                                <section
                                    className="form-group">
                                    <div>
                                        <fieldset>
                                            <textarea
                                                onChange={(e) => {
                                                    setRequirements(e.target.value)
                                                }}
                                                value={requirements}
                                                name="fix-details"
                                                id="fix-details"
                                                cols="30"
                                                rows="8"
                                                placeholder="Enter details here">

                                            </textarea>
                                            <small
                                                className="warning">* Do not request for contact details</small>
                                        </fieldset>

                                    </div>
                                </section>
                            </div>
                        </section>
                        <section class="form-group-4-in-row">

                            <div>


                                <fieldset>
                                    <select
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                        value={price}
                                        name="fix-price"
                                        id="fix-price"
                                        data-placeholder="Please select a category..">
                                        <option
                                            value="">
                                            Select Price
                                        </option>
                                        <option
                                            value="1000">
                                            ₦1000
                                        </option>
                                        <option
                                            value="2000">
                                            ₦2000
                                        </option>
                                        <option
                                            value="3000">
                                            ₦3000
                                        </option>
                                    </select>
                                </fieldset>
                            </div>
                            <div>
                                <div>


                                    <fieldset>
                                        <select
                                            value={category}
                                            onChange={handleCatChange}
                                            name="fix-category"
                                            id="fix-category"
                                            data-placeholder="Please select a category..">
                                            <option
                                                value="">Select Category...
                                            </option>
                                            {
                                                categories.map(category =>
                                                    <option
                                                        value={category.name}
                                                        key={category._id}>{category.name}
                                                    </option>)
                                            }
                                        </select>
                                    </fieldset>
                                </div>
                                {subCategories.length !== 0 &&

                                    <div
                                        className="create-fix-subcategory">


                                        <fieldset>
                                            <select
                                                value={subCategory}
                                                onChange={(e) => setSubCategory(e.target.value)}
                                                name="fix-subcategory"
                                                data-placeholder="Please select a subcategory..">
                                                <option
                                                    value="">
                                                    Select Subcategory...
                                        </option>
                                                {
                                                    subCategories.map(sub =>
                                                        <option
                                                            value={sub.name}
                                                            key={sub._id}>{sub.name}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </fieldset>
                                    </div>
                                }
                            </div>


                            <div>
                                <fieldset>
                                    <select
                                        value={deliveryDays}

                                        onChange={(e) => {
                                            setDeliveryDays(e.target.value)
                                        }}
                                        name="fix-delivery" id="fix-delivery" data-placeholder="Please select a category..">
                                        <option
                                            value="">Delivery Days</option>
                                        <option
                                            value="1">1 day
                                    </option>
                                        <option value="2">2 days</option>
                                        <option value="3">2 days</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div>
                                <fieldset>
                                    <input
                                        value={tags}
                                        type="text"
                                        placeholder="Enter Each tag separated by comms(optional)"
                                        name="fix-tags"
                                        id="fix-tags"
                                        onChange={(e) => {
                                            setTags(e.target.value)
                                        }}

                                    />
                                </fieldset>
                            </div>
                        </section>
                        <section className="form-group-2-in-row">
                            <div>
                                <div
                                    className="section-head">
                                    <i
                                        className="fa fa-camera">

                                    </i>
                                    <span>
                                        Image Upload
                                    </span>

                                </div>

                                <section
                                    className="form-group">
                                    <div>

                                        <fieldset>
                                            <input
                                                onChange={(e) => { setPhoto1(e.target.files[0]) }}
                                                // value={photo1}
                                                type="file"
                                                name="photo"

                                            />
                                        </fieldset>

                                    </div>
                                    <div>

                                        <fieldset>
                                            <input
                                                onChange={(e) => { setPhoto2(e.target.files[0]) }}
                                                // value={photo1}
                                                // value={photo2}
                                                type="file"
                                                name="photo" />
                                        </fieldset>

                                    </div>
                                    <div>

                                        <fieldset>
                                            <input
                                                onChange={(e) => { setPhoto3(e.target.files[0]) }}
                                                // value={photo1}
                                                // value={photo3}
                                                type="file"
                                                name="photo"

                                            />
                                        </fieldset>

                                    </div>
                                </section>
                            </div>
                            <div>
                                <div>
                                    <div
                                        className="section-head">
                                        <i
                                            className="fa fa-camera-retro">

                                        </i>
                                        <span>
                                            Video Upload
                                    </span>
                                    </div>

                                    <section className="form-group">

                                        <div>
                                            <fieldset>
                                                <input
                                                    type="file"
                                                    name="video"
                                                    id="video"
                                                    onChange={handleVideoChange}

                                                />
                                            </fieldset>

                                        </div>
                                    </section>
                                </div>
                                <div>
                                    <div
                                        className="section-head">
                                        <i
                                            className="fa fa-briefcase">

                                        </i>
                                        <span>
                                            Work Samples
                                    </span>
                                    </div>

                                    <section className="form-group">

                                        <div>
                                            <fieldset>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setWorkSample1(e.target.value)}
                                                    placeholder="Url 1(Link to work)"
                                                    value={workSample1}


                                                />
                                                <input
                                                    type="text"
                                                    value={workSample2}
                                                    placeholder="Url 2(Link to work)"
                                                    onChange={(e) => setWorkSample2(e.target.value)}

                                                />
                                                <input
                                                    type="text"
                                                    value={workSample3}
                                                    placeholder="Url 3(Link to work)"
                                                    onChange={(e) => setWorkSample3(e.target.value)}

                                                />
                                                <input
                                                    type="text"
                                                    value={workSample4}
                                                    onChange={(e) => setWorkSample4(e.target.value)}
                                                    placeholder="Url 4(Link to work)"

                                                />
                                                <input
                                                    type="text"
                                                    value={workSample5}
                                                    placeholder="Url 5(Link to work)"
                                                    onChange={(e) => setWorkSample5(e.target.value)}

                                                />
                                            </fieldset>

                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                        <div>
                            <div className="section-head">
                                <i className="fa fa-plus"></i>

                                <span>Extra</span><br />
                                <span className="font15 margin10-top" style={{ display: "inline-block" }}>Enter What you will do for
                            extra</span>
                            </div>
                        </div>
                        <div className="grid-2-3-1">
                            <section className="form-group no-sahdow">
                                <div className="grid-2">
                                    <div>
                                        <fieldset>
                                            <input
                                                onChange={(e) => setExtra1Desc(e.target.value.trim())}
                                                value={extra1Desc}
                                                type="text" placeholder="Extra description" name="extra-descr"
                                                id="extra-descr" />
                                        </fieldset>
                                    </div>

                                    <div>
                                        <fieldset>
                                            <input
                                                onChange={(e) => setExtra1Amount(e.target.value.trim())}
                                                value={extra1Amount}
                                                type="number" placeholder="Amount" name="extra-amount" id="extra-amount" />
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="grid-2">
                                    <div>
                                        <fieldset>
                                            <input
                                                onChange={(e) => setExtra2Desc(e.target.value.trim())}
                                                value={extra2Desc}
                                                type="text" placeholder="Extra description" name="extra-descr"
                                                id="extra-descr" />
                                        </fieldset>
                                    </div>
                                    <div>
                                        <fieldset>
                                            <input
                                                onChange={(e) => setExtra2Amount(e.target.value.trim())}
                                                value={extra2Amount}
                                                type="number"
                                                placeholder="Amount" name="extra-amount" id="extra-amount" />
                                        </fieldset>
                                    </div>
                                </div>
                            </section>
                            <section></section>
                            <fieldset>
                                <button
                                    className="create-fix-btn"
                                    onClick={handleSubmit}>
                                    Create Fix
                        </button>
                            </fieldset>
                        </div>
                    </form>

                </main>
        }
        <UserFooter />
    </>


    )
}

export default CreateFix
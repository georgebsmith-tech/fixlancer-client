import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'
import { Link } from 'react-router-dom'


const EditProfile = ({ match, history }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [fullName, setFullName] = useState("")
    const [city, setCity] = useState("")
    const [bio, setBio] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [bankName, setBankName] = useState("")
    const [accName, setAccName] = useState("")
    const [accNumber, setAccNumber] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)

    const loggedUser = localStorage.getItem("username")

    useEffect(() => {
        async function fetchData() {
            const url_of_user_info = `${domain}/api/users/${loggedUser}?content=full`
            const response1 = await axios.get(url_of_user_info)
            const data = response1.data.data
            const bank = response1.data.data.bankDetails
            console.log(response1.data)
            setPhone(data.phone)
            setCity(data.city)
            setUsername(data.username)
            setBankName(bank.bankName)
            setFullName(data.fullName)
            setAccName(bank.accName)
            setAccNumber(bank.accNumber)
            setBio(data.bio)
            setImageURL(data.imageURL)
            console.log(data)
            setIsLoading(false)
        }
        fetchData()


    }, [])
    const handleImageChange = (e) => {

        // let formData = new FormData()
        // formData.append("image", image)
        // console.log(formData.keys)

        let attachedFile;
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            attachedFile = reader.result
            setImage(attachedFile)
            setImageURL(attachedFile)
            console.log(image)
            // type = hiddenAtachment.files[0].type
            // attachedFileName = hiddenAtachment.files[0].name
            // console.log(attachedFile)

        }

    }
    const handleSubmit = () => {
        setIsUpdating(true)
        const body = {
            city,
            fullName,
            bio,
            phone,
            password,
            confirmPassword,
            bankName,
            accName,
            accNumber,
            image

        }
        const sendData = async () => {
            try {
                const response = await axios.put(`/api/users/${loggedUser}`, body)
                const data = response.data
                console.log(data)
                if (data) {
                    setSuccess(true)
                    setIsUpdating(false)

                }
                if (data.mainChange)
                    setTimeout(() => {
                        localStorage.clear()

                        history.push("/login")

                    }, 2000)



            } catch (err) {
                throw err
            }

        }


        sendData()
    }

    return (

        <>
            <UserHeader />
            {
                isLoading ?
                    <Loading
                        message="Loading User's Details"
                        height="80vh"
                    /> :

                    <main
                        className="main"
                        id="top">
                        <div>
                            <h1>Edit Personal Info</h1>
                        </div>


                        <div
                            className="details ">
                            {success &&
                                <div
                                    className="font14 padd10 profile-updated"
                                    style={{
                                        marginBottom: -30,
                                        marginTop: 20,
                                        background: "#1cc88a",
                                        borderRadius: 5
                                    }}>
                                    <span
                                        className="text-white">Your profile has been updated.
                                </span>
                                    <Link
                                        to="/dashboard/profile" className="text-link-with-hover">View your profile.</Link>
                                </div>
                            }
                            <div className="grid-desktop-2">


                                <div className="personal border-smooth bg-white margin30-top">
                                    <div className="bg-heading">
                                        <h2 className="padd20 bold">Personal Details</h2>
                                    </div>
                                    <form action="" className="padd20 ">

                                        <fieldset
                                            className="margin10-bottom">
                                            <label
                                                htmlFor=" username"
                                                className="font12 margin5-bottom block">USERNAME
                                            </label>

                                            <input
                                                type="text"
                                                name="username"
                                                size="40"
                                                id="username"
                                                placeholder="Username"
                                                value={username}
                                                disabled

                                            />

                                            {/* <small
                                                className="font10 margin-minus10-top block font11 ">* You can change your username 3 times maximum.
                                            </small> */}
                                        </fieldset>
                                        <fieldset>
                                            <label for=" username" className="font12 margin5-bottom block">FULL NAME</label>
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                size="40" id="full-name"
                                                value={fullName}
                                                onChange={
                                                    (e) => setFullName(e.target.value)
                                                }


                                            />


                                        </fieldset>
                                        <fieldset>
                                            <label
                                                for="username" class="font12 margin5-bottom block">CITY</label>
                                            <input
                                                type="text"
                                                size="40"
                                                id="city"
                                                placeholder="City"
                                                value={city}
                                                onChange={
                                                    (e) => setCity(e.target.value)
                                                }


                                            />
                                        </fieldset>
                                        <fieldset className="margin10-bottom">
                                            <label for="username" class="font12 margin5-bottom block">PHONE</label>
                                            <input
                                                type="text"
                                                name=""
                                                id="phone"
                                                size="40"
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={
                                                    (e) => setPhone(e.target.value)
                                                }

                                            />
                                            <small class="font10 margin-minus10-top block font11 text-red">* For sms notifications</small>
                                        </fieldset>
                                        <fieldset>
                                            <label for="username" className="font12 margin5-bottom block">BIO</label>

                                            <textarea
                                                name="area"
                                                id="bio"
                                                cols="30"
                                                rows="5"
                                                placeholder="Bio"
                                                value={bio}
                                                onChange={
                                                    (e) => setBio(e.target.value)
                                                }
                                            >
                                            </textarea>

                                            <small class="font11 margin-minus10-top block text-red">* Posting of contact informations may
                                            result in
                                            permanent blocking
                                            of
                            your account</small>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="other border-smooth bg-white margin30-top" style={{ height: "fit-content" }}>
                                    <div className="p-head bg-heading">
                                        <h2 className="padd20 bold">Other Details</h2>
                                    </div>
                                    <form
                                        action="" className="padd20">
                                        <label for="avatar" className="font12 block margin5-bottom">PROFILE PICTURE</label><br />
                                        <div >
                                            <input
                                                style={{
                                                    cursor: "pointer !important",
                                                    fontSize: 14,
                                                    float: "left",
                                                    width: "100%", marginBottom: 10, borderStyle: "none"
                                                }}
                                                type="file"
                                                name="photo"
                                                id="photo"
                                                onChange={handleImageChange}

                                            />
                                        </div>
                                        <div
                                            className="user-photo-wrapper">
                                            <img
                                                src={imageURL} alt={`User Avatar`}
                                                className="user-photo"
                                            />
                                        </div>

                                        <div
                                            className="font16 margin20-top">
                                            <i
                                                className="fa fa-key margin3-right" aria-hidden="true"
                                                style={{
                                                    fontSize: 16
                                                }}>

                                            </i>
                                            <span className="font16">
                                                Change Password
                        </span>
                                        </div>
                                        <fieldset className="margin10-top">
                                            <input type="password" name="password"
                                                id="password"
                                                placeholder="New Password"
                                                onChange={
                                                    (e) => setPassword(e.target.value)
                                                }

                                            />
                                        </fieldset>
                                        <fieldset>
                                            <input
                                                type="password" name="re_password" placeholder="Repeat New Password"
                                                id="confirm-password"
                                                onChange={
                                                    (e) => setConfirmPassword(e.target.value)
                                                }
                                            />
                                        </fieldset>
                                        <h3 className="font15 margin10-bottom margin30-top" >
                                            <i className="fa fa-university"></i> Bank Transfer Details</h3>
                                        <fieldset>

                                            <input type="text" name="account name" id="acct-name" placeholder="Account Name" value={accName}
                                                onChange={
                                                    (e) => setAccName(e.target.value)
                                                }

                                            />


                                        </fieldset>
                                        <fieldset>


                                            <input type="number" name="account_num" id="acct-number" value={accNumber} placeholder="Account Number"
                                                onChange={
                                                    (e) => setAccNumber(e.target.value)
                                                } />

                                        </fieldset>
                                        <fieldset>

                                            <input type="text" placeholder="Name of Bank" id="bank-name" value={bankName}
                                                onChange={
                                                    (e) => setBankName(e.target.value)
                                                }
                                            />


                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                            <div className="grid-desktop-2">



                                <div
                                    className="card padd20 bg-heading margin10-top border-smooth font16 margin30-top-desktop"
                                    style={{
                                        height: "fit-content"
                                    }} >
                                    <input
                                        type="checkbox" name="notif"
                                        value="1"
                                    /> Unsubscribe from 'New Job Request' notifications<br /><br />
                                </div>
                            </div>
                        </div>
                        <fieldset className="margin30-top">
                            <button
                                disabled={isUpdating}
                                style={{
                                    backgroundColor: "#1cc88a",
                                    color: "white",
                                    border: "1px solid #1cc88a"
                                }}
                                name=""
                                id="save-btn"
                                className="full-width no-outline"
                                onClick={handleSubmit}>
                                {isUpdating ? "Updating Profile..." : "Save"}
                            </button>
                        </fieldset>
                    </main>
            }
            <UserFooter />



        </>
    )
}

export default EditProfile
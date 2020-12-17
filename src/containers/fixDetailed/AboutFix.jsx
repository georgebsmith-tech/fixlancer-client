import React, { useState } from 'react'

import { Link, withRouter } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'
const AboutFix = ({ fix, user, loggedUser, history }) => {
    const [showCarNav, setShowCarNav] = useState(false)
    const [total, setTotal] = useState(fix.price)
    const [extra1, setExtra1] = useState("")
    const [extra2, setExtra2] = useState("")
    const [to, setTo] = useState()

    const handleNextImage = () => {
        console.log("next")

    }
    const handlePrevImage = () => {
        console.log("prev")

    }
    const handleExtraChange = (e) => {
        console.log(e.target.dataset.pos)
        if (e.target.checked) {
            setTotal(total + e.target.value * 1)
            if (e.target.dataset.pos * 1 === 1) {
                setExtra1("1")
            } else if (e.target.dataset.pos * 1 === 2) {
                setExtra2("1")
            }
        }
        else {


            setTotal(total - e.target.value * 1)
            if (e.target.dataset.pos * 1 === 1) {
                setExtra1("")
            } else if (e.target.dataset.pos * 1 === 2) {
                setExtra2("")
            }
        }
    }

    const handleOrderNow = () => {
        let url = `/order-fix/${fix.titleSlug}`
        console.log(url)
        if (extra1 && extra2)
            url = `${url}?extra=12`
        else if (extra1)
            url = `${url}?extra=1`
        else if (extra2)
            url = `${url}?extra=2`
        console.log(url)
        history.push(url)


    }
    return (
        <section class="about-fix-section">
            <h1>
                {fix.title}
            </h1>
            <div class="fix-meta">
                <div>
                    <i class="fas fa-clock"></i>
                    <span>{fix.delivery_days} day(s)</span> <span> delivery</span>
                </div>
                <div>
                    <i class="fa fa-star"></i>
                    <span>122</span>

                </div>
                <div>
                    <i class="fa fa-eye"></i>
                    <span>{fix.views}</span>
                    <span> Views</span>
                </div>

            </div>
            <div
                onMouseEnter={() => setShowCarNav(true)}
                onMouseLeave={() => setShowCarNav(false)}
                className="corousel-container">
                <div
                    className="image-carousel-wrapper">
                    {fix.images_url.map((image) =>
                        <div >
                            <img
                                src={`${image}`}
                                alt={`image for the fix: ${fix.title}`}
                            />
                        </div>

                    )}

                </div>
                {showCarNav &&
                    <div
                        className="carousel-nav">
                        {fix.images_url.length !== 1 && <>
                            <i
                                onClick={handlePrevImage}
                                className="fa fa-angle-left">

                            </i>
                            <i
                                onClick={handleNextImage}
                                className="fa fa-angle-right">

                            </i>
                        </>
                        }
                    </div>

                }


            </div>
            {(fix.images_url.length !== 1) &&

                <div
                    className="carousel-tombnail">
                    {fix.images_url.map((image, id) =>
                        <div
                            className="pointer">
                            <img
                                src={image}
                                alt={`image for the fix: ${fix.title}`}
                            />
                            <div></div>
                        </div>
                    )}

                </div>
            }
            <div>
                <h2>About this Fix</h2>
                <p>
                    {fix.description}
                </p>
            </div>
            <div className="tags">
                {fix.tags.map(tag =>
                    <Link
                        to=""
                        className="tag anchor-hover-blue-underline">
                        {tag}
                    </Link>
                )}
            </div>
            <div
                className="category-and-subcategory">
                This fix is posted in
                             <Link
                    to={`/section/${fix.catSlug}?sub=${fix.subcatSlug}`} > {fix.subcategory}
                </Link>,

                <Link

                    to={`/section/${fix.catSlug}`}>
                    {fix.category}
                </Link>
            </div>

            <div
                classNAme="flex-center">
                {(user.username !== loggedUser && fix.active) &&

                    <div
                        style={{ width: "100%" }}
                        className="margin10-top">
                        <div
                            onClick={handleOrderNow}
                            className="control-btn center-text orange-btn full-width pointer"
                        >
                            Order Now ₦{commafy(total)}
                        </div>
                    </div>
                }
                {
                    fix.username === loggedUser && <h3 className="margin10-top font16 bold">Extras</h3>
                }
                <div className="font14 full-width margin10-top">
                    {
                        fix.extras.map((extra, idx) =>
                            <div
                                className="padd10 border-bottom"
                                key={idx}>{fix.username !== loggedUser &&
                                    <input
                                        data-pos={idx * 1 + 1}
                                        value={extra.price}
                                        type="checkbox"
                                        onChange={handleExtraChange}
                                        className="margin5-right"
                                    />}
                                {extra.description} for ₦{commafy(extra.price)}
                            </div>)

                    }
                    <button onClick={() => { console.log(extra1, extra2) }}>show more</button>
                </div>
            </div>

            <div>
                <h2
                    className="border-bottom">
                    Ratings
                    </h2>
                <div style={{
                    fontSize: "1.6rem",
                    padding: "40px 10px 30px 10px"
                }}>
                    No reviews Yet
                    </div>
            </div>


        </section>
    )
}

export default withRouter(AboutFix)
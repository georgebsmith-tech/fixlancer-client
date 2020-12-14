import React, { useState } from 'react'

import { Link } from 'react-router-dom'
const AboutFix = ({ fix, user, loggedUser }) => {
    const [showCarNav, setShowCarNav] = useState(false)

    const handleNextImage = () => {
        console.log("next")

    }
    const handlePrevImage = () => {
        console.log("prev")

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
            {(user.username !== loggedUser)
                &&
                <div class="flex-center">
                    {
                        fix.active &&

                        <div
                            style={{ width: "100%" }}
                            className="margin10-top">
                            <Link
                                to={`/order-fix/${fix.titleSlug}`}
                                className="control-btn center-text orange-btn full-width"
                                onclick="location.href='/order-fix/<%= fix.titleSlug %>'">Order Now ₦{fix.price}
                            </Link>
                        </div>
                    }
                </div>
            }
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

export default AboutFix
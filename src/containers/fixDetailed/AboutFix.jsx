import React, { useRef, useState } from 'react'
import { FaClock } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'
import { getDateAndTime } from '../../helperFunctions/getDate'
const AboutFix = ({ fix, user, loggedUser, history }) => {
    const [showCarNav, setShowCarNav] = useState(false)
    const [total, setTotal] = useState(fix.price)
    const [extra1, setExtra1] = useState("")
    const [extra2, setExtra2] = useState("")
    const [ratings, setRatings] = useState([{ rating: 4 }, { rating: 2 }, { rating: 5 }, { rating: 3 }])
    const carouselRef = useRef()
    const imageref = useRef()



    const style = {
        ratingsGrid: {
            display: "grid",
            gridTemplateColumns: "40px auto",
            columnGap: 10
        }
    }

    const handleNextImage = (e) => {
        console.log("next")
        console.log(imageref.current.offsetWidth)
        carouselRef.current.style.transform = `translateX(-${imageref.current.offsetWidth + 20}px)`

        // e.target.classList.add("translate-left")


    }
    const handlePrevImage = (e) => {
        carouselRef.current.style.transform = `translateX(0)`

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

    let sumOFRating = 0
    const numberOFReviews = fix.ratings.length
    fix.ratings.forEach(rating => {
        sumOFRating += rating.rating
    })
    const avgRating = sumOFRating === 0 ? 0 : (sumOFRating / numberOFReviews).toFixed(1)
    return (
        <section
            className="about-fix-section">
            <h1>
                {fix.title}
            </h1>
            <div
                className="fix-meta">
                <div>
                    <FaClock size="1.1rem" />
                    <span> {`${fix.delivery_days} day${fix.delivery_days !== 1 && "s"}`}</span> <span> delivery</span>
                </div>
                <div>

                    <span
                        className="font12">
                        <i
                            className="fa fa-star margin3-right">

                        </i>
                        <span
                            className="bolder font12 margin3-right">
                            {avgRating}

                        </span>

                        ({fix.ratings.length} reviews)
                    </span>

                </div>
                <div>
                    <i
                        className="fa fa-eye"></i>
                    <span>{fix.views}</span>
                    <span> Views</span>
                </div>

            </div>
            <div
                onMouseEnter={() => setShowCarNav(true)}
                onMouseLeave={() => setShowCarNav(false)}
                className="corousel-container">
                <div
                    className="image-carousel-wrapper"
                    ref={carouselRef}>
                    {fix.images_url.map((image) =>
                        <div >
                            <img
                                ref={imageref}
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
                                {extra.description} for ₦{commafy(extra.price ? extra.price : 0)}
                            </div>)

                    }

                </div>
            </div>

            <div>
                <h2
                    className="border-bottom">
                    <span className="bold margin20-right">Ratings</span>
                    {
                        numberOFReviews !== 0 && <span className="font14">
                            <i className="fa fa-star margin3-right"></i>
                            <span className="bolder font14 margin3-right">{avgRating}  </span>  ({fix.ratings.length} reviews)
                        </span>
                    }

                </h2>
                <div style={{
                    fontSize: "1.6rem",
                    padding: "10px 10px 30px 10px"
                }}>
                    {
                        fix.ratings.length === 0 ?

                            <div> No reviews Yet</div> :
                            <div>
                                {
                                    fix.ratings.map(rating =>
                                        <div
                                            className="padd10-top-bottom border-bottom"
                                            style={style.ratingsGrid}>
                                            <div>
                                                <span
                                                    className="circle flex-center bold"
                                                    style={
                                                        {
                                                            backgroundColor: rating.userColor, color: "white",
                                                            width: 32,
                                                            height: 32
                                                        }
                                                    }>{rating.username[0].toUpperCase()}</span>
                                            </div>


                                            <div
                                                classname="font12">
                                                <div className="flex-between">
                                                    <Link
                                                        className="font12 anchor-hover-blue-underline">
                                                        {rating.username}
                                                    </Link>
                                                    <div
                                                        className="font13">
                                                        {
                                                            [1, 2, 3, 4, 5].map(rate => {
                                                                if (rate <= rating.rating) {
                                                                    return <i
                                                                        className="fa fa-star font13">

                                                                    </i>
                                                                } else {
                                                                    return <i
                                                                        className="fa fa-star font13" style={{ color: "lightgrey" }}>

                                                                    </i>
                                                                }
                                                            }
                                                            )
                                                        }

                                                 ({rating.rating})

                                            </div>
                                                </div>
                                                <p
                                                    style={{ paddingRight: 50 }}
                                                    className="font13 margin5-top">
                                                    {rating.review}
                                                </p>
                                                <small className="font10"> {getDateAndTime(rating.createdAt)}</small>
                                            </div>


                                        </div>
                                    )
                                }
                            </div>
                    }

                </div>
            </div>


        </section>
    )
}

export default withRouter(AboutFix)
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'
export const FixMax6Desktop = ({ fix, handleSlugChange }) => {
    console.log(handleSlugChange)
    const styles = {
        objectFit: {
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        },
        borderSquare: {
            borderRadius: 0
        }
    }
    let userRate;
    const number_of_ratings = fix.ratings.length
    if (number_of_ratings !== 0) {
        let sum = 0;
        fix.ratings.forEach(rating => {
            sum += rating.rating
        })
        const avg = (sum / number_of_ratings).toFixed(1)
        userRate = <div className="font12">
            <i className="fa fa-star margin3-right"></i>
            <span className="">{avg} ({number_of_ratings})</span>
        </div>
    } else if (fix.trusted) {

        userRate = <div className="font12">
            <i
                className="fa fa-check margin3-right"
                style={{ color: "#f27415" }}>

            </i>
            <span
                className="" style={{ color: "#f27415" }}>Trusted</span>
        </div>

    } else {
        userRate = <div className="font12">
            <FaClock size="0.9rem" />

            <span
                className="" > {`${fix.delivery_days} day${fix.delivery_days !== 1 && "s"}`} </span>

        </div>

    }

    return (

        <div style={{ borderRadius: 0 }} className='border-smooth margin20-right bg-white'>
            <div style={{ height: 120 }} className="border-smooth border0-radius">
                <img src={fix.images_url[0]} alt={"Image for the fix" + fix.title} style={{ ...styles.objectFit, ...styles.borderSquare }} />
            </div>
            <div className='padd10'>
                <i className="fa fa-circle font13 margin5-right"></i>
                <span className='font14'>{fix.username}</span>

            </div>
            <div className='padd10'>
                <Link
                    to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`
                    }
                    onClick={handleSlugChange}
                    className="font16">
                    {fix.title.substr(0, 45)}...
                </Link>


            </div>
            <div className='flex-between padd10-sides padd10-bottom font15'>
                {userRate}
                <div className='text-green bold'>
                    ₦{commafy(fix.price)}
                </div>

            </div>
        </div>

    );
}



export const FixMax6Mobile = ({ fix }) => {
    let userRate;
    // console.log(fix.ratings)
    const number_of_ratings = fix.ratings.length
    if (number_of_ratings !== 0) {
        let sum = 0;
        fix.ratings.forEach(rating => {
            sum += rating.rating
        })
        const avg = (sum / number_of_ratings).toFixed(1)
        userRate = <div className="font12">
            <i className="fa fa-star margin3-right"></i>
            <span className="">{avg} ({number_of_ratings})</span>
        </div>
    } else if (fix.trusted) {

        userRate = <div className="font12">
            <i
                className="fa fa-check margin3-right"
                style={{ color: "#f27415" }}>

            </i>
            <span
                className="" style={{ color: "#f27415" }}>Trusted</span>
        </div>

    } else {
        userRate = <div>

        </div>

    }

    return (

        <div className="bg-white border-smooth padd10 margin20-bottom">
            <div className="grid2-1-2">
                <div style={{ width: 80, height: 75 }} className="border-smooth">
                    <img src={fix.images_url[0]} alt={"image for the fix " + fix.title} className="object-fit" />
                </div>
                <div >
                    <h3
                        className="font15"
                        style={{ height: 40 }}>
                        <Link to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`
                        }>
                            {fix.title.substr(0, 45)}...
                        </Link>

                    </h3>
                    <div className="flex line-height margin10-top">
                        <div className="  margin20-right ">
                            <FaClock size="0.9rem" />
                            <span className="font12"> {fix.delivery_days} days</span>
                        </div>
                        {
                            userRate
                        }


                    </div>
                </div>
            </div>
            <div className="flex-between margin10-top">
                <div>
                    <i className="fa fa-circle font12 margin5-right"></i>
                    <span className="font12"> {fix.username}</span>
                </div>
                <div className="font17 bold text-green">
                    ₦<span className="text-green bold">{commafy(fix.price)}</span>
                </div>


            </div>

        </div>

    );

}


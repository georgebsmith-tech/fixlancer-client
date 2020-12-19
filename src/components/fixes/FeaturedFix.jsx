import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'
const FeaturedFix = ({ fix, handleSlugChange }) => {
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

        <div style={{ width: 238, borderRadius: 0 }} className='border-smooth margin20-right bg-white'>
            <div style={{ height: 160 }} className="border-smooth border0-radius">
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

export default FeaturedFix;
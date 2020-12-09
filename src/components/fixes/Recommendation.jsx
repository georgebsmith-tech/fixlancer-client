import React from 'react';
import { Link } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'
import { FaClock } from 'react-icons/fa';

const Recommendation = ({ fix }) => {
    let userRate = 12
    // console.log(fix.ratings)
    const number_of_ratings = fix.ratings.length
    if (number_of_ratings !== 0) {
        let sum = 0;
        fix.ratings.forEach(number => {
            sum += number * 1
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

export default Recommendation;
import React from 'react';
import { Link } from 'react-router-dom'
import { commafy } from '../../helperFunctions/commafy'

const Recommendation = ({ fix }) => {


    return (

        <div className="bg-white border-smooth padd10 margin20-bottom">
            <div className="grid2-1-2 column10-gap">
                <div style={{ width: 90, height: 90 }} className="border-smooth">
                    <img src={fix.images_url[0]} alt={"image for the fix " + fix.title} className="object-fit" />
                </div>
                <div >
                    <h3 className="font15">
                        <Link to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`
                        }>
                            {fix.title.substr(0, 45)}...
                        </Link>

                    </h3>
                    <div className="flex-between line-height margin10-top">
                        <div>
                            <i className="fas fa-clock font12 margin5-right"></i>
                            <span className="font12"> {fix.delivery_days} days</span>
                        </div>
                        <div className="font12">
                            <i className="fa fa-star"></i>
                            <span className="">2.4 (4)</span>
                        </div>


                    </div>
                </div>
            </div>
            <div className="flex-between margin10-top">
                <div>
                    <i className="fa fa-circle font12 margin5-right"></i>
                    <span className="font12"> {fix.username}</span>
                </div>
                <div className="font17 bold text-green">
                    ₦<span className="text-green bold"> {commafy(fix.price)}</span>
                </div>


            </div>

        </div>

    );

}

export default Recommendation;
import React from 'react';
import { Link } from 'react-router-dom'

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
                    {fix.title}
                </Link>


            </div>
            <div className='flex-between padd10-sides padd10-bottom font15'>
                <div>
                    <i className="fa fa-star font15"></i>
                    <span> 2.4</span> <span>(4)</span>
                </div>
                <div className='text-green bold'>
                    ₦{fix.price}
                </div>

            </div>
        </div>

    );
}

export default FeaturedFix;
import React from 'react'
import { Link } from 'react-router-dom'

const FixMax4 = ({ fix = { username: "Smith", title: "it is what it is", images_url: [] } }) => {

    return (
        <li class="fix-card">
            <div class="grid-2-12-card">
                <Link to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`}>
                    <div className="fix-image-wrapper">
                        <img src={`${fix.images_url[0]}`} alt="" />
                    </div>
                </Link>
                <div class="fix-username-and-presence desktop padding-sides padd10-bottom">
                    <i class="fa fa-circle"></i>
                    <span className="bold"> {fix.username} </span>

                </div>
                <div>
                    <Link to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`}
                        class="anchor-hover-blue-underline fix-title block">
                        {fix.title.toLowerCase().substr(0, 80)}...
                    </Link>
                    <div className="duration-and-rating-trust">
                        <i class="fas fa-clock"></i>
                        <span>{fix.delivery_days} day(s)</span>

                    </div>

                </div>
            </div>

            <div class="amount-and-user">
                <div class="duration-and-rating-trust desktop padd10-bottom" >
                    <i class="fas fa-clock"></i>
                    <span>{fix.delivery_days} day(s)</span>

                </div>
                <div class="fix-username-and-presence mobile padd10-bottom">
                    <i class="fa fa-circle"></i>
                    <span className="bold"> {fix.username}</span>

                </div>
                <div class="fix-amount-green">
                    ₦{fix.price}
                </div>
            </div>

        </li>

    )
}

export default FixMax4
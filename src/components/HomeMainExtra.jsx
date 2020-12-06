import React from 'react'

export const HomeMainExtra=()=>{
    return (
        <div className="margin20-bottom margin20-top grid-desktop-2-nospace bg-white border-smooth card-shadow">
        <div className="padd10 padd60-top">
            <div className="padd40-bottom">


                <strong className="bold font18">
                    Find an Expert for Anything

                </strong>
            </div>

            <ul>
                <li className="font16 margin30-bottom">
                    <h4 className="margin10-bottom">
                        <span class="bold">
                            <i class="fa fa-check text-success"></i>
                            Always covered
                        </span>
                    </h4>
                    <p>
                        Whether you need writers, graphic designers, programmers etc we have got you covered. Find
                        Services in minutes with fixed prices. No Setup fee, no hidden fee.
                    </p>
                </li>

                <li className="font16 margin30-bottom ">
                    <h4 className="margin10-bottom">
                        <i class="fa fa-check text-success"></i>

                        <span className="bold ">
                            Zero Risk, MoneyBack Guaranteed
                        </span>
                    </h4>
                    <p>
                        Payments are held on escrow with us.
                        We only release payments to the freelancer once you are satisfied.
                    </p>
                </li>
            </ul>
        </div>
        <div className="desktop">
            <img src="../../images/back.jpg" alt="" />
        </div>
    </div>
    )
}
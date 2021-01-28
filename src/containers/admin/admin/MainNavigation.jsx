import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { navs } from './nav-data'

const MainNavigation = ({ closeNav, extraClass }) => {

    return (
        <nav
            onClick={closeNav}
            style={{
                position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", zIndex: 22, top: 0, left: 0, transition: "0.5s"
            }}
            className={extraClass}>
            <ul
                onClick={(e) => { e.stopPropagation() }}
                className="padd15" style={{ height: "100%", width: 250, backgroundColor: "#3f4d67", overflow: "auto" }}>
                <li
                    onClick={(e) => { e.stopPropagation() }}
                    className="font20 text-white margin30-bottom">
                    FixLancer
            </li>
                <li
                    className="margin20-bottom">
                    <i className="fa fa-home text-white font14 margin10-right"></i>
                    <Link to="/admin" className="text-white font13">
                        Dashboard
                </Link>
                </li>
                {
                    navs.map(nav => <NavGroup
                        closeNav={closeNav}
                        group={nav.group}
                        icon={nav.icon}
                        subs={nav.subs} />)
                }
                <li
                    onClick={(e) => { e.stopPropagation(); }}
                    className="font10 text-white margin20-top">
                    <div className="flex-between pointer">
                        <Link
                            to="/admin/settings"
                            className="text-white">
                            <i className={`fa fa-cog text-white font10 margin10-right`}></i>{"Settings".toUpperCase()
                            }
                        </Link>


                    </div>
                </li>


            </ul>


        </nav>
    );
}

export default MainNavigation;

const NavGroup = ({ group, subs = [], icon, closeNav }) => {
    const [subMenuIsOpen, setsubMenuIsOpen] = useState(false)
    return (
        <li
            onClick={(e) => { e.stopPropagation(); setsubMenuIsOpen(!subMenuIsOpen) }}
            className="font10 text-white margin20-top">
            <div className="flex-between pointer">
                <span className="text-white">
                    <i className={`fa ${icon} text-white font10 margin10-right`}></i>{group.toUpperCase()
                    }
                </span>
                <i className={`fa fa-angle-${subMenuIsOpen ? "up" : "down"} text-white font14`}></i>


            </div>

            {
                subMenuIsOpen &&
                <ul
                    className="padd10"
                    style={{ backgroundColor: "#415373" }}>

                    {
                        subs.map(info => <li className="margin20-left margin10-bottom">
                            <Link to={`/admin/${info.link}`}
                                onClick={(e) => {
                                    e.stopPropagation(); closeNav()
                                }}
                                className
                                ="text-dark-white font12 nav-hover" >
                                {info.title}
                            </Link>
                        </li>
                        )
                    }

                </ul>
            }
        </li>
    )
}

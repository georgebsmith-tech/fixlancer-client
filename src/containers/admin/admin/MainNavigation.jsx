import React from 'react';
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
            <ul className="padd15" style={{ height: "100%", width: 250, backgroundColor: "#3f4d67", overflow: "auto" }}>
                <li className="font20 text-white margin30-bottom">
                    FixLancer
            </li>
                <li className="margin20-bottom">
                    <i className="fa fa-home text-white font14 margin10-right"></i>
                    <Link to="/admin" className="text-white font13">
                        Dashboard
                </Link>
                </li>
                {
                    navs.map(nav => <NavGroup
                        group={nav.group}
                        icon={nav.icon}
                        subs={nav.subs} />)
                }
                <NavGroup
                    group="Wallet"
                    icon="fa-money"
                    subs={[
                        {
                            title: "User Balances",
                            link: "user-balances"
                        },

                    ]}
                />
                <NavGroup
                    group="messages"
                    icon="fa-envelope"
                    subs={[
                        {
                            title: "All Messages",
                            link: "all-messages"
                        }
                    ]}
                />
                <NavGroup
                    group="Notifications"
                    icon="fa-bell"
                    subs={[
                        {
                            title: "Send Notifications",
                            link: "send-notifications"
                        }
                    ]}
                />
                <NavGroup
                    group="Categories"
                    icon="fa-list"
                    subs={[
                        {
                            title: "Categories",
                            link: "fix-categories"
                        },
                        {
                            title: "Add a SubCategory",
                            link: ""
                        }
                    ]}
                />
                <NavGroup
                    group="Jobs Requests"
                    icon="fa-briefcase"
                    subs={[
                        {
                            title: "All Job Requests",
                            link: "all-job-requests"
                        },

                    ]}
                />
                <NavGroup
                    group="Settings"
                    icon="fa-cog"
                    subs={[
                        {
                            title: "Job fee",
                            link: ""
                        },
                        {
                            title: "Fix Approval",
                            link: ""
                        }

                    ]}
                />
            </ul>


        </nav>
    );
}

export default MainNavigation;

const NavGroup = ({ group, subs = [], icon }) => {
    return (
        <li className="font10 text-white margin20-top">
            <i className={`fa ${icon} text-white font10 margin10-right`}></i>{group.toUpperCase()
            }
            <ul className="">

                {
                    subs.map(info => <li className="margin20-left margin20-top">
                        <Link to={`/admin/${info.link}`} className
                            ="text-dark-white font12 nav-hover">
                            {info.title}
                        </Link>
                    </li>
                    )
                }

            </ul>
        </li>
    )
}

import React from 'react';
import { Link } from 'react-router-dom'

const MainNavigation = ({ closeNav }) => {

    return (
        <nav
            onClick={closeNav}
            style={{ position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", zIndex: 22, top: 0, left: 0, transition: "2s" }}>
            <ul className="padd15" style={{ height: "100%", width: 200, backgroundColor: "#3f4d67", overflow: "auto" }}>
                <li className="font20 text-white margin30-bottom">
                    Fix Lancer
            </li>
                <li className="margin20-bottom">
                    <i className="fa fa-home text-white font14 margin10-right"></i>
                    <Link to="/admin" className="text-white font13">
                        Dashboard
                </Link>
                </li>
                <NavGroup
                    group="fixes"
                    icon="fa-tasks"
                    subs={[
                        "All fixes",
                        "Published fixes"
                    ]}
                />
                <NavGroup
                    group="users"
                    icon="fa-users"
                    subs={[
                        "All users",
                        "Onine Users",
                        "Banned Users"
                    ]}
                />
                <NavGroup
                    group="orders"
                    icon="fa-shopping-cart"
                    subs={[
                        "All Orders",
                        "Published Orders",
                        "Draft Orders"
                    ]}
                />
                <NavGroup
                    group="Wallet"
                    icon="fa-money"
                    subs={[
                        "User Balances"
                    ]}
                />
                <NavGroup
                    group="messages"
                    icon="fa-envelope"
                    subs={[
                        "All messages"
                    ]}
                />
                <NavGroup
                    group="Notifications"
                    icon="fa-bell"
                    subs={[
                        "Send notifications"
                    ]}
                />
            </ul>
        </nav>
    );
}

export default MainNavigation;

const NavGroup = ({ group, subs = [], icon }) => {
    return (
        <li className="font13 text-white margin20-top">
            <i className={`fa ${icon} text-white font13 margin10-right`}></i>{group.toUpperCase()
            }
            <ul className="">

                {
                    subs.map(link => <li className="margin20-left margin20-top">
                        <Link to="/admin/all-fixes" className
                            ="text-white font13 ">
                            {link}
                        </Link>
                    </li>
                    )
                }

            </ul>
        </li>
    )
}

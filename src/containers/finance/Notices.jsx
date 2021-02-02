import React, { useState, useEffect } from 'react'
import UserHeader from "../../components/UserHeader"
import UserFooter from "../../components/UserFooter"
import NoticeList from "./NoticeList"
import FinanceNavigation from "./FinanceNavigations"
import UserHeaderDesktop from '../../components/UserHeaderDesktop'

const Notices = () => {
    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            <main
                classname="main">
                <h1>Finance</h1>
                <div
                    className="grid-2-21">
                    <section

                        className="withdrawal-summary">
                        <header>
                            Notifications
                        </header>
                        <NoticeList />
                    </section>
                    <FinanceNavigation />
                </div>

            </main>
            <UserFooter />
        </>
    )
}

export default Notices
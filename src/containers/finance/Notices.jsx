import React, { useState, useEffect } from 'react'
import UserHeader from "../../components/UserHeader"
import UserFooter from "../../components/UserFooter"
import NoticeList from "./NoticeList"
import FinanceNavigation from "./FinanceNavigations"

const Notices = () => {
    return (
        <>
            <UserHeader />
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
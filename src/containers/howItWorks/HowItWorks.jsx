import React from 'react'
import PageHeader from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import QAndA from './QAndA'
import { questionsAndAnswers } from './questionsAndAnswers'

const HowItWorks = () => {

    let buyersSections = questionsAndAnswers.forBuyers.map(qAndA => {
        return <QAndA qAndA={qAndA} />
    })
    let sellerssSections = questionsAndAnswers.forSellers.map(qAndA => {
        return <QAndA qAndA={qAndA} />
    })
    return (
        <>
            <PageHeader title="Welcome To Fixlancer" background="#f2f2f2" />
            <main class="how-it-works">
                <h1 class="center-text">How it works</h1>

                <section className="how-it-works-section font16">
                    <h2
                        className="center-text">For buyers
                    </h2>
                    <div className="hit-q-holder">
                        {buyersSections}
                    </div>

                </section>

                <section class="how-it-works-section font16">
                    <h2
                        class="center-text">
                        For sellers
                    </h2>
                    <div class="hit-q-holder">
                        {sellerssSections}
                    </div>

                </section>
                <div class="center-text">
                    <Link to="/featured" class="button next-btn font16">Next</Link>
                </div>
            </main>
        </>
    )
}

export default HowItWorks
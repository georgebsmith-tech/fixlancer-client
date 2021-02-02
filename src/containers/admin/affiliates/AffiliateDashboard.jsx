import React, { useState, useEffect } from 'react';
import AffiliatesList from './AffiliatesList';

const AffiliateDashboard = () => {
    const [affiiates, setAffiliates] = useState([{}])
    return (
        <main className="main">
            <section>
                <header>
                    <h2>
                        <span>Statistics</span>
                    </h2>
                </header>
                <AffiliatesList
                    affiiates={affiiates} />
            </section>

        </main>
    );
}
export default AffiliateDashboard;

import React from 'react';
import { AffiliateMobile } from './Affiliate'

const AffiliatesList = ({ affiiates }) => {
    return (
        <ul>
            {
                affiiates.map(affiliate => <AffiliateMobile
                    affiliate={affiliate} />)
            }

        </ul>
    );
}

export default AffiliatesList;

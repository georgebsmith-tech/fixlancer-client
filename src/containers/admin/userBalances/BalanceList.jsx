import React from 'react'
import { BalanceMobile, BalanceDesktop } from './Balance'


const BalanceList = ({ wallets }) => {
    return (
        <>
            <ul className="grid-responsive-max4 mobile">
                {
                    wallets.map(wallet => <BalanceMobile
                        wallet={wallet}
                        key={wallet._id}
                    />)
                }

            </ul>
            <ul className="desktop">
                {
                    wallets.map(wallet => <BalanceDesktop
                        wallet={wallet}
                        key={wallet._id}
                    />)
                }

            </ul>
        </>
    )
}

export default BalanceList;
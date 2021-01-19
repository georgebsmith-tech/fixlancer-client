import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TransactionMobile, TransactionDeskTop } from './Transaction'

const TransactionsList = ({ transactions = [], updateUsers }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-max6 mobile">
                {
                    transactions.map(transaction => <TransactionMobile
                        transaction={transaction}
                        key={transaction._id}
                        updateUsers={updateUsers}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    transactions.map(transaction =>
                        <TransactionDeskTop
                            transaction={transaction}
                            key={transaction._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default TransactionsList;
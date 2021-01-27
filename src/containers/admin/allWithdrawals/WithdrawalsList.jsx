import React, { Children, useState } from 'react'
import { Link } from 'react-router-dom'
import { Withdrawal } from './Withdrawal'
import './WithdrawalsList.css'

const WithdrawalsList = ({ withdrawals = [], updateWithdrawals, children, state = "" }) => {


    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            {children}
            <section style={{ overflow: "auto", }} className="bg-whit">
                <ul
                    className="finance-withdrwa bg-whit">

                    <li  >
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr) 0.5fr", columnGap: 10 }} className="padd10 ">
                            <div className="font15  no-break bold">Username</div>

                            <div
                                style={{ marginRight: 10 }}
                                className="font15 no-break bold">Amount</div>

                            <div className="font15 no-break bold "
                            >Bank</div>
                            <div className="font15 no-break bold">
                                Acc. Name
                            </div>
                            <div className="font15 no-break bold">
                                Acc. No.
                            </div>
                            <div className="font15  no-break bold">Requeted on</div>
                            <div className="font15  no-break bold">Acted on</div>
                            <div className="font15 no-break bold">
                                State
                            </div>


                            <div
                                className={`font15 no-break bold`}>Action</div>

                        </div>
                    </li>

                    {
                        withdrawals.length === 0 ? <div className="bg-white font16 center-text padd20">There are no {state} withdrawals</div> :
                            withdrawals.map(withdrawal => <Withdrawal
                                withdrawal={withdrawal}
                                key={withdrawal._id}
                                updateWithdrawals={updateWithdrawals}


                            />
                            )
                    }
                </ul>
            </section>
        </div>



    )
}

export default WithdrawalsList;
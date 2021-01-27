import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'
import { withRouter } from 'react-router-dom'
import axios from "axios"
import { domain } from '../../../helperFunctions/domain'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }
}


export const Withdrawal = withRouter(({ withdrawal, match, history, updateWithdrawals }) => {

    const style = {
        actionButton: {
            // position: "absolute",
            // right: -10,
            // top: -10,
            // backgroundColor: "rgba(0,0,0,0.04)"
        },
        actionMenu: {
            position: "absolute",
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5
        },
        actionItem: {
            color: "rgba(0,0,0,0.3)",
            marginTop: 5,
            marginBottom: 5

        }
    }
    const handleAction = async (action) => {
        console.log(action)
        action.id = withdrawal._id
        console.log(action)
        const url_withdrawal = `${domain}/api/withdrawals/modify`
        const newData = (await axios.put(url_withdrawal, action, config)).data
        console.log(newData)
        window.scrollTo(0, 0)
        updateWithdrawals(newData.withdrawal)
    }

    let actions
    if (withdrawal.state === "pending") {
        actions =
            <span style={style.actionButton} className=" block border5-radius padd10 padd5-top-bottom">
                <i
                    onClick={() => handleAction({ state: "approved" })}
                    title="Mark as Completed"
                    className="fa fa-check font14 pointer hover-text-black text-green  margin15-right"
                    style={style.actionItem}
                >

                </i>

                <i
                    onClick={() => handleAction({ state: "declined" })}
                    title="Deny Request"
                    className="fa fa-ban font14 pointer hover-text-black"
                    style={style.actionItem}
                    aria-hidden="true"></i>



            </span>
    } else if (withdrawal.state === "declined") {
        actions = <span style={style.actionButton} className=" block border5-radius padd10 padd5-top-bottom">
            <i
                onClick={() => handleAction({ state: "approved" })}
                title="Mark as Completed"
                className="fa fa-check font14 pointer hover-text-black text-green"
                style={style.actionItem}
            >

            </i>


        </span>

    }


    return (


        <li key={withdrawal._id} >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr) 0.5fr", columnGap: 10 }} className="padd10 align-center margin5-bottom bg-white">
                <div
                    style={{ marginRight: 10 }}
                    className="font15 no-break">{withdrawal.username}</div>

                <div
                    style={{ marginRight: 10 }}
                    className="font15 no-break">{withdrawal.amount}</div>

                <div className="font15 no-break ">
                    {withdrawal.bank}</div>
                <div className="font15 no-break">
                    {withdrawal.accName}
                </div>
                <div className="font15 no-break">
                    {withdrawal.accNumber}
                </div>
                <div className="font15  no-break">{getDate(withdrawal.createdAt)}</div>
                <div className="font15  no-break">{getDate(withdrawal.updatedAt)}</div>
                <div className="font15 no-break">
                    {withdrawal.state}
                </div>
                <div
                    data-id={withdrawal._id}
                    // onClick={handleCancellation}
                    className={`font15 text-link-with-hover`}>
                    {
                        true && actions


                    }
                </div>
            </div>
        </li>

    )
})

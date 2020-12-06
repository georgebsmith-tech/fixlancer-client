import React from 'react'
import {getDate} from '../../helperFunctions/getDate'
import {Link} from 'react-router-dom'


const Transaction =({transaction})=>{
    let content;
    let theClass=`no break bold`
    let sign
    if(transaction.type==="deposit"){
        content=<span>Deposit Completed</span>
        theClass +=" test-green"
        sign="+"
    }else if(transaction.type==="order payment"){
        content=   <span>

        Payment for Fix (<Link to="#" className="text-link-with-hover">View Order</Link>).
    </span>
    sign="-"
    theClass +=" fainted-red"
}else if(transaction.type==="milestone"){
    content= <span>
    
    Milestone released (View Order)
 </span>
sign="+"
theClass +=" text-green"
}
    return (
        <li>
         <div class="font14 grid3-221 padd10 a-transaction">
                                    {content}
                                    <span>
                                       {getDate(transaction.createdAt)}
                                    </span>
                                    <span className={theClass}>
                                        {sign}{transaction.amount}
                                    </span>

                                </div>


        </li>
    )
}

export default Transaction
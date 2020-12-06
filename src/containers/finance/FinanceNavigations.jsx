import React from 'react'
import {Link} from 'react-router-dom'

const FinanceNavigation=()=>{
    return (
        <section className="finance-controlers">
                <div>
                <Link to="/dashboard/finance/withdraw" className="button font16" >Request Withdrwal</Link>
            </div>
            <div>
                <Link to="/dashboard/finance/transactions" className="trans-hist button font16"
                    >Transaction
                    History</Link>
            </div>
    </section>
    )
}

export default FinanceNavigation
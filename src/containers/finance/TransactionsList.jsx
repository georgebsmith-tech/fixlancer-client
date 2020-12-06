import React  from 'react'
import Transaction from './Transaction'



const TransactionList =({transactions})=>{
  
    const theTransactions=transactions.map(transaction=><Transaction  key={transaction._id} transaction={transaction} />)


    return (
        <ul  className="transactions">
            {theTransactions}
        </ul>

    )
}


export default TransactionList

import React,{useState,useEffect} from 'react'
import UserFooter from "../../components/UserFooter"
import UserHeader from "../../components/UserHeader"
import FinanceNavigation from "./FinanceNavigations"
import {Link} from 'react-router-dom'
import axios from 'axios'
import {domain} from '../../helperFunctions/domain'


const Withdraw =()=>{
    const[revenue,setRevenue]=useState({amount:0})
    const [isLoading, setIsloading]=useState(true)
    const username="Smith"
    useEffect(()=>{
        async function fetchData(){
            const url =`${domain}/api/revenues/${username}`
            const response= await axios.get(url)
            setRevenue(response.data.data)
            console.log(response.data.data)
            setIsloading(false)
        }
        fetchData()


    },[])

    return (
        
        
        <>
        <UserHeader />
        <main className="main">
            <h1>Finance</h1>
            <div className="grid-2-21 margin20-top">
                <section className="withdrawal-summary">
                    <header> <i className="fa fa-bar-chart"></i>Request Withdrwals</header>
                    <div className="sect"
                        style={{margin:"15px 25px 35px 25px",paddingLeft: 10, borderLeft: "3px solid #1cc88a"}}>
                        <div>Revenues: <span>₦{revenue.amount.toFixed(2)}</span></div>
                    </div>
                    <div className="sect">
                        <fieldset>
                            <label htmlFor=" amount">- Enter Amount</label>
                            <input type="number" placeholder="Amount" name="amount" />
                        </fieldset>
                    </div>
                    <div className="finance-bank-details" style={{paddingTop: 10}}>
                        <div className="border-smooth">
                            <Link className="overlay-bank flex-center block" to="/dashboard/edit" title="Edit Bank details">
                                <span className="text-white"> <i className="fa fa-pencil text-white margin3-right"></i>Edit</span>

                            </Link>
                            <div>
                                <span>Account Name: </span><span></span>
                            </div>
                            <div>
                                <span>Account No.: </span><span></span>
                            </div>
                            <div>
                                <span>Bank: </span><span></span>
                            </div>
                        </div>
                    </div>
                    <div className="sect">
                        <fieldset>
                            <input type="password" placeholder="Current password" name="password" />
                        </fieldset>
                    </div>
                    <div className="sect">
                        <fieldset>
                            <button className="button">Withdraw</button>
                        </fieldset>
                    </div>
                    <div className="sect">
                        <ul className="font13">
                            <li style={{marginBottom: 7}}>* Minimum withdrawal is NGN1,500</li>
                            <li style={{marginBottom: 7}}>* A fee of NGN100 will be charged for every withdrawal to
                                bank</li>
                            <li style={{marginBottom: 7}}>* Withdrawals are processed within 2-3 business days</li>
                        </ul>
                    </div>

                </section>
                <section>
                    <FinanceNavigation />
                </section>
            </div>


            

        </main>
        <UserFooter />
        </>
    )


}

export default Withdraw
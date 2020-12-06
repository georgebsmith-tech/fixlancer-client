import React,{useState} from 'react'
import PageHeader from '../components/PageHeader'
import ShadowCard from '../components/helperComponents/ShadowCard'
import {Input} from '../components/form/Input'


const Reset=()=> {
   const [username, setUsername] = useState("");
    const handleUsername=(e)=>{
        setUsername(e.target.value.trim())
        console.log(username)
    }

    const handleSubmit=(e)=>{
        console.log("Clikced")
        console.log(username)
    }

   
        return ( 
            <div>
                <PageHeader title={"Reset Password"}/>
                <main className="main bg-white">
                <div className="login-wrapper">
                <ShadowCard>
                   
                    
                    <div className="padd20 margin30-bottom">
                         <div className="font14 margin20-bottom">Please enter your details. We will send you a new password.</div>
                        <Input  text={"Username or Emai"}
                                 handleChange={handleUsername}
                        />

                        <div className="margin10-top">
                            <button className="btn full-width font16 text-white bg-dark-blue border-dark-blue" onClick={handleSubmit}>Reset</button>
                        </div>

                    </div>
                   

                </ShadowCard>
                </div>
                </main>

            </div>
         );
  
}
 
export default Reset;
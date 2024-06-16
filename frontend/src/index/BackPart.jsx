
import { useEffect, useState } from 'react'
import './BackPart.css'




export default function BackPart(){
    let [customer,setCustomer]=useState(0);

    useEffect(()=>{

        async function getUsers(){
            await axios.get('http://localhost:8080/getNum')
            .then((res)=>{
             if(res.data.num){
                 setCustomer(res.data.num);
             }
            })
            .catch((er)=>{
             console.log(er);
            })
         }
     
         getUsers();
     
     },[]);

    return(
        
        <div className="bpt">

            <h1>{customer-1}+ Users across globe</h1>
        </div>

    )
}
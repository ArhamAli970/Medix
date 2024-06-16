import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './CartOpt.css'

export default function CartOpt(){

    let[medi,setMedi]=useState([]);
    let nav= useNavigate();

    useEffect(()=>{

        async function getMedi(){
            await axios.get('http://localhost:8080/getRandomMedi')
            .then((res)=>{
                if(res.data.medi){
                    console.log(res.data.medi);
                    setMedi(res.data.medi);
                }
            })
            .catch((e)=>{
                  console.log(e);
            })
        }

        getMedi();

    },[])


   async function handleSearch(id){
      
             await axios.get(`http://localhost:8080/getDataClk/${id}`)
             .then((response)=>{
                console.log(response.data.med);
                if (response.data.med){
                   nav('/Product',{state:response.data.med})
                }
             })
             .catch ((e)=>{
                console.log(e);
             }) 
    
            }

    return(
        <div className="opt">
            {
                medi.map((ele)=>{
                    return(
                        <div onClick={()=>{handleSearch(ele._id)}}  className="product" key={ele._id}>
                            <div className="imProd">
                                <img src={ele.img1} alt="" />
                            </div>
                            <p><b>{ele.name}</b></p>
                            <p>&#8360;<b> {ele.price}</b></p>
                        </div>
                    )
                })
            }
        </div>
    )
}
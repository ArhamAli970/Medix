import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import './Order.css'
export default function Order(){

  let nav=useNavigate();
    let [orders,setOrders]=useState([]);
    let[login,setLogin]=useState({})

    useEffect(()=>{

        let token=localStorage.getItem('token');




       async function getOrd(){

        const resp = await axios.post('http://localhost:8080/getUser',{token:token}); 

        if(resp.data.details=="nf"){
          return nav('/notFound',{state:true})
        }
        
        let {_id}=resp.data.details;

        setLogin(resp.data.details);


        let ord=await axios.get('http://localhost:8080/listOrder',{
            params : {user_id:_id}

        })

        let{order}=ord.data;

        setOrders(order);

    }


        getOrd();

    },[])





     return(
            <div className="Orders">
            
            { 

                orders.map((e)=>{
                    let arr=e.product;
                    {console.log(arr);}
                    return(

                        <div key={e._id} className="order">

                            <div className='det'>
                                <div className="det1">
                                  <div className="ord">
                                    <p className='wt'>Order Placed</p>
                                    <p>{new Date(e.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                  </div>
                                  <div className="ord">
                                    <p className='wt' >ship to</p>
                                    <p>{e.name}</p>
                                  </div>
                                  <div className="ord">
                                    <p className='wt'>Order-Id</p>
                                    <p>{e.razorpay_order_id}</p>
                                  </div>
                                </div>

                                <div className="det2">
                                    <p className='wt'>mobile</p>
                                    <p>{e.mobile}</p>
                                </div>

                            </div>

                            {

                                arr.map((item)=>{
                                  return(
                                    <div className='eprod'>
                                       
                                       <div className="pcOr cm1">
                                        <img src={item.prod.img1} alt="" />
                                       </div>

                                       <p className='cm'>{item.prod.name}</p>

                                       <div className="prcMed cm">
                                        <p>{item.prod.price} x {item.qty}</p>
                                       </div>

                                       <p className='cm'>{item.prod.price*item.qty}</p>


                                    </div>
                                  )
                              })

                            }



                           <div className='det cl'>
                                <div className="det1">
                                  <div className="ord">
                                    <p><span className='wt'>Address: </span> {e.address}</p>
                                  </div>
                                </div>
                                <div className="det2">
                                    <p> <span className='wt'>Total</span> &#8377;{e.amount}</p>
                                </div>

                            </div>
                            

                        </div>
                        
                    )
                })
        
            }
            
            </div>
     )
}
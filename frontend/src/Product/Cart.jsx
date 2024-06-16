
import { useNavigate} from 'react-router-dom';
import { useState ,useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';


import './Cart.css'
// import { set } from 'mongoose';

export default function Cart(){

    const [login,setLogin]=useState({});
    const [cart,setCart]=useState([]);
    const [total,setTotal]=useState(0);
    let nav= useNavigate();

    
  
    useEffect(()=>{
  
      async function chk(){
       
        const token = localStorage.getItem('token');
        // console.log(token)
  
        try{
         const response = await axios.post('http://localhost:8080/getUser',{token})

         if(response.data.details=="nf"){
          nav('/notFound');

         }

          else if(response.data.details){
          // console.log(response.data.details);
             setLogin(response.data.details);
         }
         let mail=response.data.details.email;
         console.log(mail);

         await axios.get(`http://localhost:8080/getCart/${mail}`)
         .then((res)=>{
            setCart(res.data.data.product);

            // console.log(res.data.data);



           let s= res.data.data.product.reduce((sum,ele)=>{
               return  sum+ele.qty*ele.prod.price;
           },0)

          //  console.log(s+s*0.25);

           setTotal(s);
            
         })
         .catch((err)=>{
            console.log(err.message)
         })
  
        }
        catch(e){
          console.log(e.message);
        }
      }
  
      chk();
  
    },[])


    function pay(){
      nav('/address',{state:total})
    }


   async function  removeItem(id){
    let data=cart;
  
    let product=[];
       data.forEach((ele)=>{
             if(ele.prod._id!=id){
              product.push(ele);
             }else{
               ele.qty=ele.qty-1;
               if(ele.qty!=0){
               product.push(ele);
               }
             }
        })
    
    
    //  console.log(product)
    
     await axios.post(`http://localhost:8080/addCart/${login.email}`,{product:product})
     .then((res)=>{
          if(res.data.value){
            setCart(res.data.value);
            let s= res.data.value.reduce((sum,ele)=>{
              return  sum+ele.qty*ele.prod.price;
          },0)
    
          setTotal(s);
          }
     })

    }

   async function AddItem(id){
      
    let data=cart;
  
let product=[];
   data.forEach((ele)=>{
         if(ele.prod._id!=id){
          product.push(ele);
         }else{
           ele.qty=ele.qty+1;
           product.push(ele);
         }
    })


//  console.log(product)

 await axios.post(`http://localhost:8080/addCart/${login.email}`,{product:product})
 .then((res)=>{
      if(res.data.value){
        setCart(res.data.value);
        let s= res.data.value.reduce((sum,ele)=>{
          return  sum+ele.qty*ele.prod.price;
      },0)

      setTotal(s);
      }
 })

  
    }

    return (

      <div className='Paypage'>

<div className="cartItem">
  {cart.map((item) => (

    <div className="items" key={item._id}>
      <div className='imgProd'>
        <img src={item.prod.img1} alt="" />
      </div>
      <div className='cm'>
        <p className='ProdName'>{item.prod.name}</p>
      </div>
      <div className='cm'>
      <button  onClick={()=>{removeItem(item.prod._id)}} className='rmv'><RemoveIcon/></button>
      &nbsp;  {item.qty} &nbsp;
        <button className='add' onClick={()=>{AddItem(item.prod._id)}}><AddIcon/></button>
      </div>
      <div className='cm'>
        {item.prod.price} Rs.
      </div>
    </div>

  ))}
</div>



        <div className="payment">
          <h6>BILL SUMMARY</h6>
          <div className="prc">
             <p>item(s) price</p>
             <p>{total}</p>
          </div>
          <div className="prc">
             <p>gst</p>
             <p>{total*0.25}</p>
          </div>
          <div className="prc">
            <p>total</p>
            <p>{total+total*0.25}</p>
          </div>

          <div className="payBt">

          <Button className='payBtn' onClick={()=>{pay()}} id="crt"  variant="contained" color="primary">Pay&nbsp;&nbsp; 	&#8377;{total+total*0.25}</Button>
          </div>


          </div>
          

      </div>



    );
    
}
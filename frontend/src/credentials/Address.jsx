import { getAccordionDetailsUtilityClass, getCardHeaderUtilityClass } from "@mui/material";
import { useEffect, useState } from "react"
import { useLocation,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Address.css';

// import { findOneAndDelete } from "../../../Backend/models/medicine";



export default function Address(){

    let loc= useLocation();
    let nav=useNavigate();
    // console.log(l)
    let [idAd,setIdAd]=useState('');
    let[total,setTotal]=useState();

    let [det,setDet]=useState([]);
    // let total=Number(loc.state+loc.state*0.25);



    let [add,setAdd]=useState({  name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',})

    // let [selAdd,setSelAdd]=useState({});

    // let 

    let [login,setLogin]=useState({});
    let [addresses,setAddressses]=useState([])
    let order={};

    function chgAdd(e){
    //    console.log(e.target.value);
       setIdAd(e.target.value);
    }

    useEffect(()=>{
        let token=localStorage.getItem('token');

        setTotal(loc.state+loc.state*0.25);



       async function getAdd(){

        const resp = await axios.post('http://localhost:8080/getUser',{token:token}); 

        if(resp.data.details=='nf'){
            return nav('/');
        }

        setLogin(resp.data.details);

        console.log(resp.data.details);
        let cred=resp.data.details;
        await axios.get(`http://localhost:8080/getUserAdd/${cred._id}`)
        .then((res)=>{
            // console.log(res.data.add);
            setAddressses(res.data.add);
        })
        .catch((err)=>{
            console.log(err.message);
        })


        } 

        getAdd();
        // console.log(total);

    },[])


   async function pay(p){

    console.log(p);
    let res=await axios.get('http://localhost:8080/getKey');

   
    
    let key=res.data.key;
    const amountInPaise = Math.round(p * 100);
    console.log(key);


     await axios.post('http://localhost:8080/order',{currency:"INR",amount:amountInPaise})
     .then((res)=>{
        
        order=res.data.order
        // console.log(order,"df");
     })

     

     


     const options = {
        key, // Enter the Key ID generated from the Dashboard
         amount: amountInPaise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image:"https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=600",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: `http://localhost:8080/paymentVerification`,
        prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: login.username, //your customer's name
            email: login.email,
            // contact: //Provide the customer's phone number for better conversion rates 
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        },
        handler: function (response) {
            handlePaymentSuccess(response);
        }
    };

  

    const razor=new window.Razorpay(options);
    razor.open();

    const handlePaymentSuccess = async (response) => {

       let resp=await axios.get(`http://localhost:8080/getAddress`,{
            params:{id:idAd}
        })

        let Order=await axios.get(`http://localhost:8080/getOrder`,{
            params:{mail:login.email}
        })

     

        let{product}=Order.data.order

        let order=[];

        product.forEach((e)=>{
            let obj={prod:e.prod,qty:e.qty};
            order.push(obj);
        })

        // console.log(order);



        let {finAdd}=resp.data
        console.log(finAdd);


        const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            user_id: login._id, 
            product:order,
            status: 'success',
            amount: total,
            currency: 'INR',
            payment_method: 'card',
            name: finAdd.name,
    
        address: finAdd.street + ', ' + finAdd.city + ', ' + finAdd.state + ', ' + finAdd.postalCode + ', ' + finAdd.country,
            mobile: finAdd.phone
        };

        console.log(paymentData);
    

        try {
            const res = await axios.post('http://localhost:8080/paymentVerification', paymentData);
            if(res.data.mess=="okk"){
                nav('/');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };

    }






    function doc(e){
        setAdd({...add,[e.target.name]:e.target.value});
    }

   async function sub(e){

    let take=false;
    let arr=[false,false,false,false,false,false,false];
        e.preventDefault();

        if(add.name.length==0){arr[0]=true;}
        if(add.street.length==0){arr[1]=true;}
        if(add.city.length==0){arr[2]=true;}
        if(add.state.length==0){arr[3]=true;;}
        if(add.postalCode.length==0){arr[4]=true;;}
        if(add.country.length==0){arr[5]=true;;}
        if(add.phone.length==0){arr[6]=true;;}

        console.log(arr);

        for(let i of arr){
            if(i==true){take=true;break;}
        }

        setDet(arr);
    if(!take){
    
    
        await axios.post('http://localhost:8080/saveAdd',{add,login})
        .then((res)=>{
            console.log(res.data);
            setAddressses([...addresses,add]);
            setAdd({  name: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            phone: '',})

            console.log('yes');
        })
        .catch((err)=>{
        
            console.log(arr);
            
        })


        await axios.get(`http://localhost:8080/getUserAdd/${login._id}`)
        .then((res)=>{
            // console.log(res.data.add);
            console.log("yes");
            setAddressses(res.data.add);
            console.log(res.data.add);
        })
        .catch((err)=>{
            console.log(err.message);
        })


    }
    }

    return(

        <>

<div>
      
      <div className="detAdd">


         {

            addresses.map((e)=>{
                return(
                <div className="addresses">
                   <input onChange={chgAdd} type="radio" class="add1" name="add" id={e._id} value={e._id}></input>

                <label class="add2" htmlFor={e._id}>
                    <div class="dt1">
                        <p>{e.name}</p>
                        <p>{e.phone}</p>
                    </div>
                    <div class="dt1">
                           <p>{e.street}</p>
                    </div>
                    <div class="dt1">
                                <p>{e.state}</p>
                                <p>{e.postalCode}</p>
                                <p>{e.country}</p>
                    </div>
                    
                </label>
                
                </div>

                )

            })

         }

     

      </div>

</div>


        <div className="container mt-3 ">
        <div className="row justify-content-center"> 
        <div className="col-md-8">
        <h2>Add new Shipping Address</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" 
                style={{border:det[0]?'1.5px solid red':null}}
                 className="form-control" id="name" onChange={doc} value={add.name} name="name" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street</label>
                <input type="text" className="form-control" id="street"
                style={{border:det[1]?'1.5px solid red':null}}
                  onChange={doc} value={add.street} name="street" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control"
                style={{border:det[2]?'1.5px solid red':null}}
                id="city"  onChange={doc} value={add.city} name="city" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" className="form-control" 
                style={{border:det[3]?'1.5px solid red':null}}
                id="state"  onChange={doc} value={add.state} name="state" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input type="text" className="form-control" id="postalCode"
                style={{border:det[4]?'1.5px solid red':null}}
                onChange={doc} value={add.postalCode} name="postalCode" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control" 
                style={{border:det[5]?'1.5px solid red':null}}
                id="country"  onChange={doc} value={add.country} name="country" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" 
                style={{border:det[6]?'1.5px solid red':null}}
                id="phone"  onChange={doc} value={add.phone} name="phone" required/>
            </div>
            <button onClick={sub} className="btn btn-primary">Add Address </button>
        </form>
        </div>
</div>


<div className="btcntr">
<Button className='payBtn' disabled={idAd.length==0?true:false}  onClick={()=>{pay(total)}} id="crt"  variant="contained" color="primary">Pay &nbsp;&nbsp;&nbsp; 	&#8377;{total}</Button>
</div>
    </div>

    </>

    )
}

import { useLocation ,useNavigate} from 'react-router-dom';
import './Product.css';
import Button from '@mui/material/Button';
import { useState ,useEffect,useRef} from 'react'


export default function Product(){

  const location = useLocation();
  const medi= location.state; 

  const sec1=useRef(null);
  const sec2=useRef(null);
  const sec3=useRef(null);
  const sec4=useRef(null);


  const [login,setLogin]=useState({});
  let [currImg,setCurrImg]=useState(medi.img1);

  let nav= useNavigate();

  useEffect(()=>{
// console.log("er");
    async function chk(){
      console.log("yess");

      const token = localStorage.getItem('token');

      try{
       const response = await axios.post('http://localhost:8080/getUser',{token})

       if(response.data.details!="nf"){
          setCurrImg(medi.img1);
          setLogin(response.data.details);
       }
       else{
        // nav('/login')
        setLogin({nf:true});
       }

      //  nav('/login');

      }
      catch(e){
        console.log(e.message);
        nav('/login');

      }
    }

    setCurrImg(medi.img1);
    chk();

  },[location.state])

  async function add(id){

    if(login.nf){
      let bt=document.querySelector('.dg');
      bt.style.display='block';
      setTimeout(()=>{
        bt.style.display='none';
      },2000);

      return;
    }


     let resp=await axios.post(`http://localhost:8080/cart/${login.email}/${id}`)
     .then((res)=>{
      if(res.data.result=="data add"){
        nav('/cart')
      }
     })
     .catch((err)=>{
      console.log(err.message);
     })
     
  }

  function chgImg(now){
    
    
    if(now!=currImg ){
      setCurrImg(now);
    }

    

  }


  function getToRef(ref){
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }


  // setCurrImg(medi.img1);


     return(
  <>


  <div className="cont">
    <div className="med-image">
      
        <div className="med-img1">
            <img className="im1"

            src={currImg}
             
            alt=""
             />
        </div>

        <div className="im-sli">
            <button onClick={()=>{chgImg(medi.img1)}} className="clk" id="b1"><img src={medi.img1}  className="im1-sli"/></button>
            <button onClick={()=>{chgImg(medi.img2)}}  className="clk" id="b2" ><img src={medi.img2}  className="im2-sli"/></button>
           
        </div>

    </div>

    <div className="price">
      <div className="name">
        <h2 style={{textTransform:'capitalize'}}>{medi.name}</h2>
        <button className="btn off">GET FLAT 50% OFF</button>
      </div>

      <br/>
      <hr />
      <div className="price-mid">
        <div className="pri">
          <h6>MRP: {medi.price}&#8377;</h6>
          <p>Inclusive All Taxes</p>
        </div>
        <br/>

        <div className="dsc">
          <h6>Get this at {medi.price-5}&#8377;</h6>
          <p className="small">
            Simply add items worth ₹1499 to your cart & use the applicable
            coupon at checkout!
          </p>
        </div>

        <div className="info">
          <ul className="small">
            <li>15 tablet(s) in strip</li>
            <li>Mkt: Aristo Pharmaceuticals Pvt Ltd</li>
            <li>Country of Origin: India</li>
            <li>Delivery charges if applicable will be applied at checkout</li>
          </ul>
        </div>

      <form>
        <Button  onClick={()=>{add(medi._id)}} id="crt"  variant="contained" color="primary">
      Add to Cart
    </Button> 
      </form>
      

      </div>
      <br/>
      <hr />


      <div className="membership">
           
        <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Gold Membership</h5>
               <div><ul>
                <li>Get the Fastest Delivery</li>
                <li>Get the Free Delivery On Order Above 99&#8377;</li>
                <li>Get 10% Extra Discount</li>
               </ul></div>
              <form action="/goldmembership" method="get">
              <Button id="crt"  variant="contained" color="primary">
      Get Membership
    </Button>
              </form>
            </div>
          </div>
                  

      </div>


    </div>


  </div>



  <div className="perks">

    <ul>
      <li> <i className="fa-solid fa-tablets"></i> <br/>100% genuine <br/> products</li>
      <li><i className="fa-regular fa-credit-card"></i><br/>Safe & Secure <br/> Payments</li>
      <li><i className="fa-solid fa-truck"></i><br/>Contactless <br/> Delivery</li>
      <li> <i className="fa-solid fa-pump-medical"></i><br/>Full Sanitized <br/> Facilities</li>
    </ul>

  </div>




  <div className="main">


    <div className="sidebar">
   
     <ul>
     <li onClick={()=>{getToRef(sec1)}}>Introduction</li>
     <li onClick={()=>{getToRef(sec2)}}>Uses</li>
     <li onClick={()=>{getToRef(sec3)}}>Side Effects</li>
     <li onClick={()=>{getToRef(sec4)}}>Safety</li>  
     </ul>

    </div>


  
  <div className="description">
    <div className="intro">
         <h6 ref={sec1} id="introduction">INTRODUCTION</h6>
         <section >
          {
            medi.description.map((e,idx)=>{
              return(
                <p key={idx}>{e}</p>
              )
            })

          }
         
         </section>
    </div>

    <hr/>
      
    <div className="use">
      <h6 ref={sec2} id="use">USE</h6>
      <section>
      <ul>
      {
            medi.use.map((e,idx)=>{
              return(
                <p key={idx}>{e}</p>
              )
            })

          }
      </ul>
    </section>
    </div>

    <hr/>

    <div className="sideEff">
      <h6 ref={sec3} id="side">SIDE EFFECTS</h6>
      <section>
        <ul>
        {
            medi.sideEff.map((e,idx)=>{
              return(
                <li key={idx}>{e}</li>

              )
            })

          }
      
        </ul>
    </section>
    </div>

<hr/>

    <div className="safetyAd">
      <h6 ref={sec4} id="safe">SAFETY ADVICE</h6>
      <section>
      <ul>
      {
            medi.safetyAd.map((e,idx)=>{
              return(
                <li key={e.idx}>{e}</li>

              )
            })

          }
       
      </ul>
    </section>
    </div>





  </div>



</div>



    
  <div className="disclaimer">
    <h4>DISCLAIMER</h4>
    <p className="discl">The contents of this website are for informational purposes only and not intended to be a substitute for professional medical advice, diagnosis, or treatment. Please seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
  </div>




    <p className='dg'>You need to Login First</p>
  




  <div className="marketing">
    
    <h4>INDIA'S NEW MEDICINE APP</h4>

     <ul>
      <li><span className="bold">Deliver with in </span><br/> 10 minutes</li>
      <li><span className="bold">24*7</span> <br/> Ready for Service</li>
      <li><span className="bold">India's</span> <br/> new Medicine App</li>
     </ul>
    

  </div>



</>

     )
    }
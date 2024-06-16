import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './Header.css'
export default function Header(){

  const [searchQuery, setSearchQuery] = useState('');
  const[bar,setBar]=useState([]);



  let nav= useNavigate();


  async function handleSrh(id){
      setSearchQuery('');
      setBar([]);
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




  function logout(){
    localStorage.removeItem('token');
    nav('/login');
  }


  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log(searchQuery);
    // setSearchQuery('');
    try {
        const response = await axios.get('http://localhost:8080/', {
            params: { search: searchQuery }
        });

        setSearchQuery('');
      setBar([]);
        console.log(response.data.med);
        if (response.data.med){
           nav('/Product',{state:response.data.med})
        }
    } catch (error) {
        console.error('Error searching for medicine:', error);
    }
};

async function srhBar(e){
  setSearchQuery(e.target.value);
  let ans=e.target.value;
  if(ans.length==0){ans="default"}
  // console.log(ans);
  await axios.get(`http://localhost:8080/getBar/${ans}`)
  .then((res)=>{
    if(res.data.ans){
      // console.log(res.data.ans);
      setBar(res.data.ans);
    }
  })
  .catch((e)=>{
    console.log(e.message);
  })
}



function getOrder(){
  nav('/Orders');
}

    

return(

<>
    
    <nav className="flex">
       <div >
           <h1 onClick={()=>{nav('/')}} className='hd'>MEDIX</h1>
       </div>


        <div >
          <form className="d-flex" role="search" method="get"         action="/">
            <input className="form-control" type="search" placeholder="Search" value={searchQuery}
  onChange={srhBar}  name="medicine" aria-label="Search"/><button onClick={handleSearch} className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>

  { bar.length >0 &&     <div className='srBar'>

{

   bar.map((e)=>{
    return(
      <p className='val' onClick={()=>{handleSrh(e._id)}} key={e._id}>{e.name}</p>
    )
  })
}


</div>
}

        <div className="cred">

          <div>
            <button onClick={getOrder}> <i class="fa-solid fa-box-open"></i> <br/> <b>My Orders</b> </button>
          </div>



          <form action="/cart" method="get">
            <div><button><i className="fa-solid fa-cart-shopping"></i><br/><b>Cart</b></button></div>
          </form>

{

!localStorage.getItem('token') ?
        
        
        <>
        
            <div><button onClick={()=>{nav('/login')}}><i className="fa-solid fa-right-to-bracket"></i><br/><b>LogIn</b></button></div>
          

        
        
            <div><button onClick={()=>{nav('/sign')}}><i className="fa-solid fa-user-plus"></i><br/><b>SignUp</b></button></div>
        
        </>
        

 :
        

        
            <div><button  onClick={logout}><i className="fa-solid fa-right-from-bracket"></i><br/><b>LogOut</b></button></div>
          
          
        


}
        
        </div>


       
      
    </nav>



</>

    




)

    


}
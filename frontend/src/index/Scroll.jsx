import { useState } from 'react';
import './Scroll.css';

export default function Scroll(){

const[idx,setIdx]=useState(0);
let arr=["https://mercury.akamaized.net/i/14d7051747719e750e87e510836e2e8d_232035_0.jpg","https://mercury.akamaized.net/i/b53e51adfe3dd2a458a7d9fbffce6eb5_269197_0.png","https://www.netmeds.com/images/cms/offers/1714646115_Web_Landing_Banner.jpg"]

function lft(){
     let n=arr.length;
     let newIdx=(n+(idx-1))%n;
     setIdx(newIdx);

}
function rht(){
     let n=arr.length;
     let newIdx=(idx+1)%n;
     setIdx(newIdx);

}


     return(

      <div className="sc">
          
      <div style={{backgroundImage:`url(${arr[idx]})`}} className="suc sc1">
      <button className='lf' onClick={lft}><i class="fa-solid fa-arrow-left"></i></button>
      <button className='rh' onClick={rht}><i class="fa-solid fa-arrow-right"></i></button>

      </div>

      </div>
              
     )
}


 {/* <div className="offer">
            <h1>Great Deals are on </h1>
             <h2>Medicine</h2>
          </div>
          <div className="disc">
            <h4>Flat 25% discount</h4>
          </div> */}
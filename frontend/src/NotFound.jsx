
import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';

import './NotFound.css'


export default function NotFound(){
    let loc=useLocation();

    let [data,setData]=useState(false);
    
    useEffect(()=>{
        setData(loc.state);
    },[])


    return(
        <div className="nf">
            {data?<h3>No Orders Found</h3>:<h3>Login / SignUp First to Add Medicine to cart </h3>}
           &nbsp; &nbsp; &nbsp; <i id='fc' class="fa-regular fa-face-sad-cry"></i>
        </div>
    )
}
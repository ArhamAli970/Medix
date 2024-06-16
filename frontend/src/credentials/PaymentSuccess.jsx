import { useSearchParams } from "react-router-dom"
import './PaymentSuccess.css'

export default function PaymentSuccess(){

    let query=useSearchParams()[0];
    

    return (
        <div className="paysuc">
        
        <h1>payment successsfull</h1>
        <p>id: <b>{query}</b> </p>

        </div>
    )
}
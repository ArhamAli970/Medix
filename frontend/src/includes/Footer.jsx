import './Footer.css'
export default function Footer(){
    return(
        <footer>

   <div className="footer-up">
     <div className="company">
        <ul>
            <li className="head">About Company</li>
            <li>Customer Speak</li>
            <li>In the news</li>
            <li>Career</li>
        </ul>
     </div>



     <div className="policy">
        <ul>
            <li className="head">Terms & Conditions</li>
            <li>Privacy & policy</li>
            <li>Shipping & Delivery Policy</li>
            <li>Return, Refund and Cancellation Policy</li>
        </ul>

     </div>




     <div className="social">
        <ul>
            <li className="head">Social</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
        </ul>
     </div>

   
    </div> 

    <hr/>

    <h5> All the Copyrights	&#169; 2023 Are Rights Reserved.</h5>


</footer>
    )
}
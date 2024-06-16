import { Outlet } from 'react-router-dom'
import Header from './includes/Header.jsx'
import Footer from './includes/Footer.jsx'
import './Home.css'

export default function Home(){
    return(
        <>
        <div className='mn'>
           <Header/>
           <Outlet/>
           <Footer/>
        </div>

        </>
    
    )
}
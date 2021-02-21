import React from 'react'
import './Home.css'
import { Logo } from '../logo/Logo'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <form className='home__page'>
            <div className='logo'>
                <Logo/>
            </div>

            <div className='wlkm__area'>
                    <Link to = '/Login'>
                        <button className='login__btn'>LOGIN</button>
                    </Link>
                    
                    <Link to = '/Register'>
                        <button className='reg__btn'>REGISTER</button>
                    </Link>
            </div>
        </form>
    )
}

export default Home
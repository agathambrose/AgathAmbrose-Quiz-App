import React from 'react';
import {Logo} from '../logo/Logo'
import './Header.css'


export const Header = () => {
return (
            <header className = 'header__container mx-auto mt-5 mb-3'>
                    <div className = 'card-body'>
                        <div className = 'card-title'>
                            <Logo/>
                        </div>
                        <h5 className='mb-2 text-muted'>
                            Random questions with no intent in particular
                        </h5>
                    </div>           
            </header>      
    )
}


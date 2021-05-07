import React from 'react'
import './Header.scss'

const Header = ()=>{
    return (
       <>
            <header>
                <div className='toggle-bar'>
                    <span className='icon-bar'/>
                    <span className='icon-bar'/>
                    <span className='icon-bar'/>
                </div>
                <div className='block-location'>
                    <p>myENV</p>
                    <span>Current Location</span>
                </div>
                <div className='block-icon'>
                    <img src="./../bell.png"></img>
                </div>
            </header>
       </>
    );
}
export default Header;
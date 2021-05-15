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
                    <img src="./../white-down-arrow.png"/>
                </div>
                <div className='block-icon'>
                    <img src="./../bell.png"/>
                </div>
            </header>
       </>
    );
}
export default Header;
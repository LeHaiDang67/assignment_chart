import React from 'react'
import './WeatherParams.scss'

const WeatherParams = (props) =>{
    return (
        <>
            <div className='weather-params'>
                <div className='weather-params-child'>
                    <div className="weather-params-title">PSI</div>
                    <div className="btn-number">23</div>
                    <div className="weather-params-blur">Good</div>
                </div>
                <div className='weather-params-child'>
                    <div className="weather-params-title">RAIN</div>
                    <div className="btn-normal">0</div>
                    <div className="weather-params-blur">mm</div>
                </div>
                <div className='weather-params-child'>
                    <div className="weather-params-title">DENGUE</div>
                    <div className="btn-cicle"></div>
                    <div></div>
                </div>
                <div className='weather-params-child last-child'>
                    <a href="#"><img src='./../icon-plus.png'></img></a>
                    <div>Add</div>
                </div>
            </div>
        </>
    );

};

export default WeatherParams;
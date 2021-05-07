import React from 'react'
import './WeatherStatus.scss'

const WeatherStatus = (props) =>{
    return (
        <>
            <div className='weather-status'>
                <div className='weather-icon'>
                    <img src='./../cloud.png'></img>
                </div>
                <div className='weather-status-center'>
                    <p>Cloudy</p>
                    
                    <p><img src="./../thermometer.png"></img> 29.2 °C
                    
                    </p>
                </div>
                <div className='humidity-percent'>
                    <img src='./../humidity.png'></img> 73%
                </div>
            </div>
            
        </>
    );

};

export default WeatherStatus;
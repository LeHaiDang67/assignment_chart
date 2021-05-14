import React, { useState, useEffect, useRef, useCallback } from 'react'
import './WeatherStatus.scss'
import {getWeatherInfo} from './../../services/mockData.js'

const WeatherStatus = (props) =>{
    const [dataState, setDataState] = useState(0);
    useEffect( () =>{
        if(dataState === 0){
            getWeatherInfo().then(
                (data) =>{
                    setDataState(data);
                }
            )
        }
       
    },[]);
    return (
        <>
            <div className='weather-status'>
                <div className='weather-icon'>
                    <img src='./../cloud.png'></img>
                </div>
                <div className='weather-status-center'>
                    <p>{dataState.status}</p>
                    
                    <p><img src="./../thermometer.png"></img> {dataState.temp} °C
                    
                    </p>
                </div>
                <div className='humidity-percent'>
                    <img src='./../humidity.png'></img> {dataState.humidity}%
                </div>
            </div>
            
        </>
    );

};

export default WeatherStatus;
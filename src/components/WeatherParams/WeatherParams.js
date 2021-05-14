import React, { useState, useEffect, useRef, useCallback } from 'react'
import './WeatherParams.scss'
import {getWeatherInfo} from './../../services/mockData.js'

const WeatherParams = (props) =>{
    const [dataState, setDataState] = useState(0);
    
    useEffect( () =>{
        if(dataState === 0){
            getWeatherInfo().then(
                (data)=>{
                    setDataState(data);
                }
            )
        }

    } ,[]);
    return (
        <>
            <div className='weather-params'>
                <div className='weather-params-child'>
                    <div className="weather-params-title">PSI</div>
                    <div className="btn-number">{dataState.psi}</div>
                    <div className="weather-params-blur">{dataState.psiStatus}</div>
                </div>
                <div className='weather-params-child'>
                    <div className="weather-params-title">RAIN</div>
                    <div className="btn-normal">{dataState.rain}</div>
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
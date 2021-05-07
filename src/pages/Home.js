import React from 'react'
import Header from '../components/Header/Header'
import WeatherStatus from '../components/WeatherStatus/WeatherStatus'
import WeatherParams from '../components/WeatherParams/WeatherParams'
import ChartWeather from '../components/ChartWeather/ChartWeather'
import './Home.scss'

const Home = () =>{
    return (
       <> 
          <div className='top-content'>
             <div className='container-top'>
               <Header></Header>
               <WeatherStatus></WeatherStatus>
               <WeatherParams></WeatherParams>
             </div>
             <div className='container-chart'>
                <ChartWeather></ChartWeather>
             </div>
            
          </div>
           
       </>
    );
};

export default Home;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChartWeather.scss'
import * as d3 from 'd3';
import { getTideAndSunData } from '../../services/mockData.js';



const ChartWeather = () => {
    const [size, setSize] = useState(0);
    const [scrollBar, setScroll] = useState(0);
    const [currentDate, setCurrentDate] = useState();
    const [tideAndSunData, setTideAndSunData] = useState();
    const myRef = useRef();
    const containerRef = useRef(); 
    const sunRef = useRef();
    const canvasWidth = 6 * window.innerWidth;
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const resizeWindow = ()=>{
      setSize(window.innerWidth);
    }
    
    const formatTime = (hour, minute)=>{
      if(hour > 12){
         let newHour = hour - 12;
         return `${newHour}:${minute} pm`; 
      }
      return `${hour}:${minute} am`; 
   }

    const chartBackground = ({ widthChart, ctx}) => {
      
      //water
      ctx.beginPath();

      ctx.moveTo(0, 290);
      ctx.lineTo(0, 240);
      ctx.quadraticCurveTo(widthChart/8, 260, widthChart/2 - widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart/2, 100, widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart-widthChart/8, 260, widthChart, 260);
      ctx.lineTo(widthChart, 290);

      ctx.moveTo(widthChart, 290);
      ctx.lineTo(widthChart, 260);
      ctx.quadraticCurveTo(widthChart + widthChart/8, 260, widthChart + widthChart/2 - widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart + widthChart/2, 100, widthChart + widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*2 -widthChart/8, 260, widthChart*2, 260);
      ctx.lineTo(widthChart*2, 290);

      ctx.moveTo(widthChart*2, 290);
      ctx.lineTo(widthChart*2, 260);
      ctx.quadraticCurveTo(widthChart*2 + widthChart/8, 260, widthChart*2 + widthChart/2 - widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*2 + widthChart/2, 100, widthChart*2 + widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*3 - widthChart/8, 260, widthChart*3, 260);
      ctx.lineTo(widthChart*3, 290);

      ctx.moveTo(widthChart*3, 290);
      ctx.lineTo(widthChart*3, 260);
      ctx.quadraticCurveTo(widthChart*3 + widthChart/8, 260, widthChart*3 + widthChart/2 - widthChart/4, 200); 
      ctx.quadraticCurveTo(widthChart*3 + widthChart/2, 100, widthChart*3 + widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*4 - widthChart/8, 260, widthChart*4, 260); 
      ctx.lineTo(widthChart*4, 290);

      ctx.moveTo(widthChart*4, 290);
      ctx.lineTo(widthChart*4, 260);
      ctx.quadraticCurveTo(widthChart*4 + widthChart/8, 260, widthChart*4 + widthChart/2 - widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*4 + widthChart/2, 100, widthChart*4 + widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*5 - widthChart/8, 260, widthChart*5, 260); 
      ctx.lineTo(widthChart*5, 290);

      ctx.moveTo(widthChart*5, 290);
      ctx.lineTo(widthChart*5, 260);
      ctx.quadraticCurveTo(widthChart*5 + widthChart/8, 260, widthChart*5 + widthChart/2 - widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*5 + widthChart/2, 100, widthChart*5 + widthChart/2 + widthChart/4, 200);
      ctx.quadraticCurveTo(widthChart*6 - widthChart/8, 260, widthChart*6, 260); 
      ctx.lineTo(widthChart*6, 290);

      ctx.lineWidth = 40;
      ctx.fillStyle = 'rgb(150, 222, 250)';
      ctx.strokeStyle = 'rgb(150, 222, 250)';
      ctx.fill();
      ctx.stroke();

      // a day
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(widthChart/2, 280);
      ctx.quadraticCurveTo(widthChart, -60, widthChart + widthChart/2, 280);
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(widthChart*3 - widthChart/2, 280);
      ctx.quadraticCurveTo(widthChart*3, -60, widthChart*3 + widthChart/2, 280);
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(widthChart*5 - widthChart/2, 280);
      ctx.quadraticCurveTo(widthChart*5, -60, widthChart*5 + widthChart/2, 280);
      ctx.lineWidth = 3;
      ctx.stroke();
     
      // a night
      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(0, 0, widthChart/2, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(widthChart + widthChart/2, 0, widthChart, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(widthChart*3 + widthChart/2, 0, widthChart, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(widthChart*5 + widthChart/2, 0, widthChart/2, 280);
      ctx.stroke();

      //time
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.font = "16px Times New Roman";
     // ctx.fillText(tideAndSunData,0,200); 
     // console.log(currentDate);
     // console.log(`${data.days[1].sunriseTime.getDate()}`);

    } ;

    

     const scrollWindow = () =>{
      let currentScroll = document.getElementById('chart-container').scrollLeft;
     // let widthScroll = document.getElementById('chart-container').scrollWidth;
      if(currentScroll < (window.innerWidth*2 - window.innerWidth/28))
      { 
        setScroll(1);
        let currentMouth = tideAndSunData.days[0].sunriseTime.getMonth();
        setCurrentDate(`${tideAndSunData.days[0].sunriseTime.getDate()}th ${months[currentMouth]}`);
      } else if( currentScroll>= (window.innerWidth*2 - window.innerWidth/28) && currentScroll <= (window.innerWidth*4 - window.innerWidth/28)){
        setScroll(2);
        let currentMouth = tideAndSunData.days[1].sunriseTime.getMonth();
        setCurrentDate(`${tideAndSunData.days[1].sunriseTime.getDate()}th ${months[currentMouth]}`);
      } else {
        setScroll(3);
        let currentMouth = tideAndSunData.days[2].sunriseTime.getMonth();
        setCurrentDate(`${tideAndSunData.days[2].sunriseTime.getDate()}th ${months[currentMouth]}`);
      }
     
    }

    useEffect( ()=>{
      getTideAndSunData()
      .then(
        (data) =>{
           let currentMouth = data.currentTime.getMonth();
          setTideAndSunData(data);
          setCurrentDate(`${data.currentTime.getDate(0)}th ${months[currentMouth]}`); 
          
         // console.log(tideAndSunData.days[2].sunriseTime.getDate());
         
        }
      ); 
      console.log(currentDate);
    
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      const ctx = myRef.current.getContext('2d');
      if (ctx){
         myRef.current.width = canvasWidth;
         myRef.current.height = 280;
         chartBackground({widthChart: size, ctx});
         
      }

      return () => window.removeEventListener('resize', resizeWindow);

    },[  size ]);
   
  return (
      <>
       <div className='chart-weather' ref={containerRef} id='chart-container' onScroll={scrollWindow} >
        
          <canvas ref={myRef} id='myCanvas'/>
          
          <div></div>
           <div className='title-chart-weather'>
                <span className='text-light-blue'>Tide</span>
                <span className='text-dot'></span>
                <span className='text-orange'>Sunrise & Sunset</span>
                {scrollBar}
            </div>
          
            <img ref={sunRef} src='./../sun.png' name='sun' width={45} height={45}/>
            <div className='text-day'>{currentDate}</div>
       </div>
        
      </>
  )
}

export default ChartWeather;
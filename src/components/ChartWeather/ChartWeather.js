import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChartWeather.scss'
import * as d3 from 'd3';



const ChartWeather = () => {
    const myRef = useRef();
    const containerRef = useRef(); 
    const sunRef = useRef();
    const canvasWidth = 6 * window.innerWidth;
    
    const chartBackground = useCallback(({ startXAxis, endXAxis, chartHeight, ctx }) => {
      
      //water
      let XAxis = parseInt(window.innerWidth);
      ctx.beginPath();
     
      ctx.moveTo(0, 290);
      ctx.lineTo(0, 240);
      ctx.quadraticCurveTo(80, 260, 320, 200);
      console.log(window.innerWidth);
      ctx.lineTo(540, 130);
      ctx.quadraticCurveTo(640, 100, 740, 130);
      ctx.lineTo(960, 200);
      ctx.quadraticCurveTo(1180, 260, 1280, 260);
      ctx.lineTo(1280, 290);

      ctx.moveTo(1280, 290);
      ctx.lineTo(1280, 260);
      ctx.quadraticCurveTo(1360, 260, 1600, 200);
      ctx.lineTo(1820, 130);
      ctx.quadraticCurveTo(1920, 100, 2020, 130);
      ctx.lineTo(2200, 200);
      ctx.quadraticCurveTo(2360, 260, 2560, 260);
      ctx.lineTo(2560, 290);

      ctx.moveTo(2560, 290);
      ctx.lineTo(2560, 260);
      ctx.quadraticCurveTo(2640, 260, 2860, 200);
      ctx.lineTo(3080, 130);
      ctx.quadraticCurveTo(3180, 100, 3280, 130);
      ctx.lineTo(3460, 200);
      ctx.quadraticCurveTo(3640, 260, 3840, 260);
      ctx.lineTo(3840, 290);

      ctx.moveTo(3840, 290);
      ctx.lineTo(3840, 260);
      ctx.quadraticCurveTo(3920, 260, 4140, 200); // 80 220
      ctx.lineTo(4360, 130);//220
      ctx.quadraticCurveTo(4460, 100, 4560, 130);// 100 100
      ctx.lineTo(4740, 200); //180
      ctx.quadraticCurveTo(4920, 260, 5120, 260); //180 200
      ctx.lineTo(5120, 290);

      ctx.moveTo(5120, 290);
      ctx.lineTo(5120, 260);
      ctx.quadraticCurveTo(5200, 260, 5420, 200);
      ctx.lineTo(5640, 130);
      ctx.quadraticCurveTo(5740, 100, 5840, 130);
      ctx.lineTo(6020, 200);
      ctx.quadraticCurveTo(6200, 260, 6400, 260); 
      ctx.lineTo(6400, 290);

      ctx.moveTo(6400, 290);
      ctx.lineTo(6400, 260);
      ctx.quadraticCurveTo(6480, 260, 6700, 200);
      ctx.lineTo(6920, 130);
      ctx.quadraticCurveTo(7020, 100, 7120, 130);
      ctx.lineTo(7300, 200);
      ctx.quadraticCurveTo(7480, 260, 7680, 260); 
      ctx.lineTo(7680, 290);

      ctx.lineWidth = 40;
      ctx.fillStyle = 'rgb(150, 222, 250)';
      ctx.strokeStyle = 'rgb(150, 222, 250)';
      ctx.fill();
      ctx.stroke();

      // a day
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(640, 280);
      ctx.quadraticCurveTo(1280, -80, 1920, 280);
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(3200, 280);
      ctx.quadraticCurveTo(3840, -80, 4480, 280);
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(216, 162, 38)';
      ctx.moveTo(5760, 280);
      ctx.quadraticCurveTo(6400, -80, 7040, 280);
      ctx.lineWidth = 3;
      ctx.stroke();
     
      // a night
      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(0, 0, 640, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(1920, 0, 1280, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(4480, 0, 1280, 280);
      ctx.stroke();

      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgb(173, 173, 173)';
      ctx.fillRect(7040, 0, 6480, 280);
      ctx.stroke();


    } , []) ;

   
    useEffect( ()=>{
      const ctx = myRef.current.getContext('2d');
      if (ctx){
         myRef.current.width = canvasWidth;
         myRef.current.height = 280;
       
          chartBackground({startXAxis:0 , endXAxis: 208, chartHeight:280,ctx});

      }

    },[myRef, containerRef, canvasWidth ]);
   
  return (
      <>
       <div className='chart-weather' ref={containerRef} >
           <div className='canvas-container'>
             <canvas ref={myRef} id='myCanvas'></canvas>
           </div>
           <div className='title-chart-weather'>
                <span className='text-light-blue'>Tide</span>
                <span className='text-dot'></span>
                <span className='text-orange'>Sunrise & Sunset</span>
            </div>
            <img ref={sunRef} src='./../sun.png' name='sun' width={45} height={45}></img>
            <div className='text-day'>Day</div>
       </div>
        
      </>
  )
}

export default ChartWeather;
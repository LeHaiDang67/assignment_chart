import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChartWeather.scss'
import {chartData} from './../../helpers/mockData.js'
import useWeatherChart from './useWeatherChart.js';


const POSITION_TYPE = {
  START: 'START',
  MIDDBLE: 'MIDDLE',
  END: 'END'
}



const ChartWeather = () => {
    const [state, dispatch] = useWeatherChart();
    const chartLength = chartData.length;
    const canvasWidth = (chartLength/2) * state.windowWidth;
    const myRef = useRef();
    const containerRef = useRef(); 
    const sunRef = useRef();
    const MILLIMETER = 100;

    const _waterLevel = (index) => chartData[index].waterLevel;
    const _timeLevel = (index) => chartData[index].timeLevel
    const transformDataToXYAxis = ({ chartHeight, water, time, pxPerHr }) => ({ x: time * pxPerHr, y: chartHeight - water * MILLIMETER });

    const _fillBackground = ({ startXAxis, endXAxis, chartHeight, ctx }) => {
      ctx.lineTo(endXAxis, chartHeight);
      ctx.lineTo(startXAxis, chartHeight);
  
      ctx.fillStyle = 'rgb(150, 222, 250)';
      ctx.strokeStyle = 'rgb(150, 222, 250)';
      ctx.fill();
    };

    const _drawChart = useCallback( (ctx, chartHeight) =>{
       ctx.beginPath();

       const startPoint = (index) => transformDataToXYAxis({
         chartHeight,
         water: _waterLevel(index).start,
         time: _timeLevel(index).start,
         pxPerHr: state.pxPerHr ,
       })

       const endPoint = (index) => transformDataToXYAxis ({
          chartHeight,
          water: _waterLevel(index).end,
          time: _timeLevel(index).end,
          pxPerHr: state.pxPerHr,
       });

       const targetXAxis = (index) => (endPoint(index).x - startPoint(index).x)/2 + startPoint(index).x;
       const targetYAxis = (index) => (chartHeight - startPoint(index).y - (chartHeight - endPoint(index).y)) / 2 + startPoint(index).y;
  
       const targetPoint = (index) => ({ x: targetXAxis(index), y: targetYAxis(index)});
       for( let i = 0; i < chartLength; i++){
         if( i === 0){
           ctx.moveTo(-targetPoint(i).x, targetPoint(i).y);
           ctx.quadraticCurveTo(
             startPoint(i).x,
             startPoint(i).y,
             endPoint(i).x,
             endPoint(i).y
            );
            _fillBackground({startXAxis: startPoint(i).x, endXAxis: endPoint(i).x,chartHeight,ctx});

         }

         if (i <= chartLength -2){
           const currentIndex = i + 1;
           ctx.moveTo(targetPoint(i).x, targetPoint(i).y);
           ctx.quadraticCurveTo(
              startPoint(currentIndex).x,
              endPoint(currentIndex).y,
              targetPoint(currentIndex).x,
              targetPoint(currentIndex).y
           );
           _fillBackground({startXAxis: targetPoint(i).x, endXAxis: targetPoint(currentIndex).x, chartHeight, ctx });
         }

         if (i === chartLength - 1){
           ctx.moveTo(targetPoint(i).x, targetPoint(i).y);
           ctx.quadraticCurveTo(
             endPoint(i).x,
             endPoint(i).y,
             endPoint(i).x + (endPoint(i).x - startPoint(i).x),
             startPoint(i).y
           )
           _fillBackground({ startXAxis: targetPoint(i).x, endXAxis: endPoint(i).x, chartHeight, ctx});

         }

       }
       ctx.stroke();

    }, [state.pxPerHr, chartLength]);

  //   const paint = () => {
  //       const ctx = myRef.current.getContext('2d');
  //       ctx.beginPath();
  //       ctx.moveTo(-200,200);
  //       ctx.bezierCurveTo(400, 100, 600, 120, 1000, 200);
  //       ctx.fillStyle = 'rgb(150, 222, 250)';
  //       ctx.fill();
       
        
  //  }
    useEffect( ()=>{
      const ctx = myRef.current?.getContext('2d');
      const chartHeight = containerRef.current?.offsetHeight;
      if (ctx){
        myRef.current.width = canvasWidth;
        myRef.current.height = chartHeight;
        _drawChart(ctx, chartLength);
      }

    },[myRef, containerRef, _drawChart]);
   
  return (
      <>
       <div className='chart-weather' ref={containerRef} >
            <canvas ref={myRef}  id='myCanvas'></canvas>
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
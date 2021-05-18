import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChartWeather.scss'
import { getTideAndSunData } from '../../services/mockData.js';



const ChartWeather = () => {
  const [size, setSize] = useState(0);
  const [scrollBar, setScroll] = useState(`6:00 am`);
  const [currentDate, setCurrentDate] = useState();
  const [tideAndSunData, setTideAndSunData] = useState(0);
  const [sunCoordinate, setSunCoordinate] = useState({ bottom: -35, left: 0 });
  const myRef = useRef();
  const containerRef = useRef();
  const sunRef = useRef();
  const canvasWidth = 6 * window.innerWidth;
  const canvasHeight = window.innerHeight / 3;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const resizeWindow = () => {
    setSize(window.innerWidth);
  }

  const formatTime = (time) => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    if (hour > 12) {
      let newHour = hour - 12;
      if (minute < 10) {

        return `${newHour}:0${minute} pm`;
      }
      return `${newHour}:${minute} pm`;
    } else {
      if (minute < 10) {
        return `${hour}:0${minute} am`;
      }
      return `${hour}:${minute} am`;
    }

  }

  const chartBackground = useCallback(({ widthChart, ctx }) => {
    //water
    ctx.beginPath();

    ctx.moveTo(0, canvasHeight);
    ctx.lineTo(0, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart / 8, canvasHeight - 30, widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart / 2, canvasHeight - 190, widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart - widthChart / 8, canvasHeight - 30, widthChart, canvasHeight - 30);
    ctx.lineTo(widthChart, canvasHeight);

    ctx.moveTo(widthChart, canvasHeight);
    ctx.lineTo(widthChart, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart + widthChart / 8, canvasHeight - 30, widthChart + widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart + widthChart / 2, canvasHeight - 190, widthChart + widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 2 - widthChart / 8, canvasHeight - 30, widthChart * 2, canvasHeight - 30);
    ctx.lineTo(widthChart * 2, canvasHeight);

    ctx.moveTo(widthChart * 2, canvasHeight);
    ctx.lineTo(widthChart * 2, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart * 2 + widthChart / 8, canvasHeight - 30, widthChart * 2 + widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 2 + widthChart / 2, canvasHeight - 190, widthChart * 2 + widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 3 - widthChart / 8, canvasHeight - 30, widthChart * 3, canvasHeight - 30);
    ctx.lineTo(widthChart * 3, canvasHeight);

    ctx.moveTo(widthChart * 3, canvasHeight);
    ctx.lineTo(widthChart * 3, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart * 3 + widthChart / 8, canvasHeight - 30, widthChart * 3 + widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 3 + widthChart / 2, canvasHeight - 190, widthChart * 3 + widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 4 - widthChart / 8, canvasHeight - 30, widthChart * 4, canvasHeight - 30);
    ctx.lineTo(widthChart * 4, canvasHeight);

    ctx.moveTo(widthChart * 4, canvasHeight);
    ctx.lineTo(widthChart * 4, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart * 4 + widthChart / 8, canvasHeight - 30, widthChart * 4 + widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 4 + widthChart / 2, canvasHeight - 190, widthChart * 4 + widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 5 - widthChart / 8, canvasHeight - 30, widthChart * 5, canvasHeight - 30);
    ctx.lineTo(widthChart * 5, canvasHeight);

    ctx.moveTo(widthChart * 5, canvasHeight);
    ctx.lineTo(widthChart * 5, canvasHeight - 30);
    ctx.quadraticCurveTo(widthChart * 5 + widthChart / 8, canvasHeight - 30, widthChart * 5 + widthChart / 2 - widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 5 + widthChart / 2, canvasHeight - 190, widthChart * 5 + widthChart / 2 + widthChart / 4, canvasHeight - 90);
    ctx.quadraticCurveTo(widthChart * 6 - widthChart / 8, canvasHeight - 30, widthChart * 6, canvasHeight - 30);
    ctx.lineTo(widthChart * 6, canvasHeight);

    ctx.lineWidth = 40;
    ctx.fillStyle = 'rgb(150, 222, 250)';
    ctx.strokeStyle = 'rgb(150, 222, 250)';
    ctx.fill();
    ctx.stroke();

    const aHour = widthChart / 12;
    const aMinute = widthChart / 720;
    // sun on top( 12:00 PM)
    const [xSunOnTop, ySunOnTop] = [widthChart, canvasHeight - 300];

    // a day - 1st day
    // start 6:15 AM  to 6:23 PM
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    // 6:15 AM
    ctx.moveTo(6 * aHour + 15 * aMinute, canvasHeight);
    // 6:23 PM
    ctx.quadraticCurveTo(xSunOnTop + (15*aMinute+23*aMinute)/2, ySunOnTop, 18 * aHour + 23 * aMinute, canvasHeight);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // a day - 2nd day
    // start 5:55 AM  to 5:53 PM
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    // 5:55 AM
    ctx.moveTo(29 * aHour + 55 * aMinute, canvasHeight);
    // 5:53 PM
    ctx.quadraticCurveTo(xSunOnTop * 3 + (5*aMinute + 7*aMinute), ySunOnTop, 41 * aHour + 53 * aMinute, canvasHeight);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // a day - 3rd day
    // start 6:10 AM  to 6:05 PM
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    // 6:10 AM
    ctx.moveTo(54 * aHour + 10 * aMinute, canvasHeight);
    // 6:05 PM
    ctx.quadraticCurveTo(xSunOnTop * 5, ySunOnTop, 66 * aHour + 5 * aMinute, canvasHeight);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // a night**********************************************
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(0, 0, 6 * aHour, canvasHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(18 * aHour, 0, 12 * aHour, canvasHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(42 * aHour, 0, 12 * aHour, canvasHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(66 * aHour, 0, 6 * aHour, canvasHeight);
    ctx.stroke();

    //time***************************************************
    // day 1
    // 1st
    // 1h = w/12
    // 1m = w/720
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((aHour + 15 * aMinute) - 4, canvasHeight - 90, 56, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "15px Times New Roman";
    // ctx.fillText( text, x, y);
    // 3.7 m
    // 1:15 AM
    ctx.fillText(`${tideAndSunData.days[0].tide[0].value} m`, (aHour + 15 * aMinute) + 8, canvasHeight - 75);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[0].time), aHour + 15 * aMinute, canvasHeight - 60);


    //2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((6 * aHour + 23 * aMinute) - 4, canvasHeight - 160, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 2.4m
    // 6.23 AM
    ctx.fillText(`${tideAndSunData.days[0].tide[1].value} m`, (6 * aHour + 23 * aMinute) + 8, canvasHeight - 145);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[1].time), 6 * aHour + 23 * aMinute, canvasHeight - 130);


    //3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((13 * aHour + 45 * aMinute) - 4, canvasHeight - 110, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    //3.1 m
    // 1.45 PM
    ctx.fillText(`${tideAndSunData.days[0].tide[2].value} m`, (13 * aHour + 45 * aMinute) + 8, canvasHeight - 95);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[2].time), 13 * aHour + 45 * aMinute, canvasHeight - 80);


    //4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((21 * aHour + 26 * aMinute) - 4, canvasHeight - 110, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    //1.9 m
    // 9:26 PM
    ctx.fillText(`${tideAndSunData.days[0].tide[3].value} m`, (21 * aHour + 26 * aMinute) + 8, canvasHeight - 95);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[3].time), 21 * aHour + 26 * aMinute, canvasHeight - 80);


    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[0].sunriseTime), 6 * aHour + 15 * aMinute, canvasHeight + 10);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[0].sunsetTime), 18 * aHour + 23 * aMinute, canvasHeight + 10);

    // day 2
    // 1st
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((26 * aHour + 15 * aMinute) - 2, canvasHeight - 140, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 2.9 m
    // 2:15 AM
    ctx.fillText(`${tideAndSunData.days[1].tide[0].value} m`, (26 * aHour + 15 * aMinute) + 8, canvasHeight - 125);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[0].time), 26 * aHour + 15 * aMinute, canvasHeight - 110);

    // 2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((32 * aHour + 42 * aMinute) - 2, canvasHeight - 164, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 2.1 m
    // 8:45 AM
    ctx.fillText(`${tideAndSunData.days[1].tide[1].value} m`, (32 * aHour + 42 * aMinute) + 8, canvasHeight - 145);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[1].time), 32 * aHour + 42 * aMinute, canvasHeight - 130);


    // 3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((38 * aHour + 45 * aMinute) - 2, canvasHeight - 160, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 3.1 m
    // 2: 45 pm
    ctx.fillText(`${tideAndSunData.days[1].tide[2].value} m`, (38 * aHour + 45 * aMinute) + 8, canvasHeight - 140);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[2].time), 38 * aHour + 45 * aMinute, canvasHeight - 125);

    // 4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((45 * aHour + 26 * aMinute) - 2, canvasHeight - 120, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 1.8m
    // 9:26 PM
    ctx.fillText(`${tideAndSunData.days[1].tide[3].value} m`, (45 * aHour + 26 * aMinute) + 8, canvasHeight - 100);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[3].time), 45 * aHour + 26 * aMinute, canvasHeight - 85);

    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[1].sunriseTime), 29 * aHour + 55 * aMinute, canvasHeight + 10);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[1].sunsetTime), 41 * aHour + 53 * aMinute, canvasHeight + 10);


    // day 3
    // 1st
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((52 * aHour + 58 * aMinute) - 2, canvasHeight - 130, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    //2.9m
    // 4:58 AM
    ctx.fillText(`${tideAndSunData.days[2].tide[0].value} m`, (52 * aHour + 58 * aMinute) + 8, canvasHeight - 115);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[0].time), 52 * aHour + 58 * aMinute, canvasHeight - 100);

    // 2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((57 * aHour + 20 * aMinute) - 2, canvasHeight - 110, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    //2.3m
    //9:20 AM
    ctx.fillText(`${tideAndSunData.days[2].tide[1].value} m`, (57 * aHour + 20 * aMinute) + 8, canvasHeight - 95);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[1].time), 57 * aHour + 20 * aMinute, canvasHeight - 80);

    // 3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect((63 * aHour + 16 * aMinute) - 4, canvasHeight - 150, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    //2.7 m
    // 3:16 PM
    ctx.fillText(`${tideAndSunData.days[2].tide[2].value} m`, (63 * aHour + 16 * aMinute) + 8, canvasHeight - 130);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[2].time), 63 * aHour + 16 * aMinute, canvasHeight - 115);


    // 4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(68 * aHour - 2, canvasHeight - 150, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    // 2.2m
    // 8:00 PM
    ctx.fillText(`${tideAndSunData.days[2].tide[3].value} m`, 68 * aHour + 8, canvasHeight - 130);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[3].time), 68 * aHour, canvasHeight - 115);
    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[2].sunriseTime), 54 * aHour + 10 * aMinute, canvasHeight + 10);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[2].sunsetTime), 66 * aHour + 5 * aMinute, canvasHeight + 10);

    //the sun scroll
    // ctx.beginPath();
    //  ctx.drawImage(sunImage, 100 ,10);



  }, [tideAndSunData, size]);

  const formatMinuteCurrent = (currentMinute, countTime) => {
    if (currentMinute >= 60) {
      let newCurrentMinute = currentMinute - 60 * countTime;
      if (newCurrentMinute < 10) {
        return `0${newCurrentMinute}`;
      }
      return newCurrentMinute;
    } else {
      if (currentMinute < 10) {
        return `0${currentMinute}`;
      }
      return currentMinute;
    }
  };

  const formatHourCurrent = (currentHour, countTime) => {
    if (currentHour > 12) {
      let newCurrentHour = currentHour - 12 * (Math.floor(countTime / countTime));
      return newCurrentHour;
    } else {
      return currentHour;
    }
  };


  const formatTimeCurrent = (currentHour, currentMinute, countTimeMinute, countTimeHour, startTime) => {
    let newCurrentHour = currentHour + startTime;
    if (newCurrentHour >= 12) {
      return setScroll(`${formatHourCurrent(newCurrentHour, countTimeHour)}:${formatMinuteCurrent(currentMinute, countTimeMinute)} pm`);
    } else {
      return setScroll(`${formatHourCurrent(newCurrentHour, countTimeHour)}:${formatMinuteCurrent(currentMinute, countTimeMinute)} am`);
    }

  }

  const sunScroll = (ySun, xSun) => {
    // let topLine =  document.getElementById('text-line').offsetTop;
   // let leftLine = document.getElementById('text-line').offsetLeft;
    //console.log(ySun);
    setSunCoordinate({ bottom: ySun, left: xSun });


  }
  function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
    return {
      x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
      y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
    };
  }

  const scrollWindow = () => {
    const widthWindow = window.innerWidth;
    let currentScroll = document.getElementById('chart-container').scrollLeft;
    let currentMinute = Math.floor(currentScroll / (widthWindow / 720));
    let currentHour = Math.floor(currentScroll / (widthWindow / 12));
    let countTimeMinute = Math.floor(currentScroll / (widthWindow / 12));
    let countTimeHour = Math.floor((currentScroll * 12) / (widthWindow));
    let aHour = size / 12;
    let aMinute = size / 720;
    let xSun = document.getElementById('text-line').offsetLeft - 20;
    sunScroll(-35);
    if (currentScroll < (widthWindow + widthWindow / 2)) {
      let getQuadratic = getQuadraticXY(0.5, 15*aMinute, canvasHeight, size/2, canvasHeight , 12*aHour + 23*aMinute, canvasHeight)
      if (currentScroll <= (12 * aHour + 23 * aMinute) && currentScroll >= (15 * aMinute)) {
        let ySun = 0.00035*(Math.pow(xSun,2));
       // console.log(ySun);
        sunScroll( ySun, xSun);
        let startTime = 6;
        formatTimeCurrent(currentHour, currentMinute, countTimeMinute, countTimeHour, startTime);
        let currentMouth = tideAndSunData.days[0].sunriseTime.getMonth();
        setCurrentDate(`${tideAndSunData.days[0].sunriseTime.getDate()}th ${months[currentMouth]}`);
      }
      let startTime = 6;
      formatTimeCurrent(currentHour, currentMinute, countTimeMinute, countTimeHour, startTime);
      let currentMouth = tideAndSunData.days[0].sunriseTime.getMonth();
      setCurrentDate(`${tideAndSunData.days[0].sunriseTime.getDate()}th ${months[currentMouth]}`);

    } else if (currentScroll >= (widthWindow + widthWindow / 2) && currentScroll < (widthWindow + widthWindow / 2 + 2 * widthWindow)) {

      let startTime = -18;
      formatTimeCurrent(currentHour, currentMinute, countTimeMinute, countTimeHour, startTime);
      let currentMouth = tideAndSunData.days[1].sunriseTime.getMonth();
      setCurrentDate(`${tideAndSunData.days[1].sunriseTime.getDate()}th ${months[currentMouth]}`);
    } else {
      let startTime = -42;
      formatTimeCurrent(currentHour, currentMinute, countTimeMinute, countTimeHour, startTime);
      let currentMouth = tideAndSunData.days[2].sunriseTime.getMonth();
      setCurrentDate(`${tideAndSunData.days[2].sunriseTime.getDate()}th ${months[currentMouth]}`);
    }

  }

  useEffect(() => {
    if (tideAndSunData === 0) {
      getTideAndSunData()
        .then(
          (data) => {
            let currentMouth = data.currentTime.getMonth();
            setTideAndSunData(data);
            setCurrentDate(`${data.currentTime.getDate(0)}th ${months[currentMouth]}`);

          }
        );
    }



    if (tideAndSunData !== 0) {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      myRef.current.width = canvasWidth;
      myRef.current.height = canvasHeight + 15;
      const ctx = myRef.current.getContext('2d');
      chartBackground({ widthChart: size, ctx });

    }

    return () => window.removeEventListener('resize', resizeWindow);

  }, [size, chartBackground]);

  return (
    <>
      <div className='chart-weather' ref={containerRef} id='chart-container' onScroll={scrollWindow} >

        <canvas ref={myRef} id='myCanvas' />
        <img id="sun-icon" src="./../sun.png" width={40} height={40} style={sunCoordinate} />
        <span className='text-time'>{scrollBar}</span>

        <span className='text-line' id='text-line'></span>
        <span className='triangle-up' />

        <div className='title-chart-weather'>
          <span className='text-light-blue'>Tide</span>
          <span className='text-dot'></span>
          <span className='text-orange'>Sunrise & Sunset</span>

        </div>


        <div className='text-day'>{currentDate}</div>

      </div>

    </>
  )
}

export default ChartWeather;
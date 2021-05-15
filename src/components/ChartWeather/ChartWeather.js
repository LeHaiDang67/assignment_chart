import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChartWeather.scss'
import { getTideAndSunData } from '../../services/mockData.js';



const ChartWeather = () => {
  const [size, setSize] = useState(0);
  const [scrollBar, setScroll] = useState(`6:00 am`);
  const [currentDate, setCurrentDate] = useState();
  const [tideAndSunData, setTideAndSunData] = useState(0);
  const myRef = useRef();
  const containerRef = useRef();
  const sunRef = useRef();
  const canvasWidth = 6 * window.innerWidth;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const resizeWindow = () => {
    setSize(window.innerWidth);
  }

  const formatTime = (time) => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    if (hour > 12) {
      let newHour = hour - 12;
      return `${newHour}:${minute} pm`;
    }
    return `${hour}:${minute} am`;
  }

  const chartBackground = useCallback(({ widthChart, ctx }) => {



    //water
    ctx.beginPath();

    ctx.moveTo(0, 260);
    ctx.lineTo(0, 210);
    ctx.quadraticCurveTo(widthChart / 8, 230, widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart / 2, 80, widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart - widthChart / 8, 230, widthChart, 230);
    ctx.lineTo(widthChart, 260);

    ctx.moveTo(widthChart, 260);
    ctx.lineTo(widthChart, 230);
    ctx.quadraticCurveTo(widthChart + widthChart / 8, 230, widthChart + widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart + widthChart / 2, 70, widthChart + widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 2 - widthChart / 8, 230, widthChart * 2, 230);
    ctx.lineTo(widthChart * 2, 260);

    ctx.moveTo(widthChart * 2, 260);
    ctx.lineTo(widthChart * 2, 230);
    ctx.quadraticCurveTo(widthChart * 2 + widthChart / 8, 230, widthChart * 2 + widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 2 + widthChart / 2, 70, widthChart * 2 + widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 3 - widthChart / 8, 230, widthChart * 3, 230);
    ctx.lineTo(widthChart * 3, 260);

    ctx.moveTo(widthChart * 3, 260);
    ctx.lineTo(widthChart * 3, 230);
    ctx.quadraticCurveTo(widthChart * 3 + widthChart / 8, 230, widthChart * 3 + widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 3 + widthChart / 2, 70, widthChart * 3 + widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 4 - widthChart / 8, 230, widthChart * 4, 230);
    ctx.lineTo(widthChart * 4, 260);

    ctx.moveTo(widthChart * 4, 260);
    ctx.lineTo(widthChart * 4, 230);
    ctx.quadraticCurveTo(widthChart * 4 + widthChart / 8, 230, widthChart * 4 + widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 4 + widthChart / 2, 70, widthChart * 4 + widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 5 - widthChart / 8, 230, widthChart * 5, 230);
    ctx.lineTo(widthChart * 5, 260);

    ctx.moveTo(widthChart * 5, 260);
    ctx.lineTo(widthChart * 5, 230);
    ctx.quadraticCurveTo(widthChart * 5 + widthChart / 8, 230, widthChart * 5 + widthChart / 2 - widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 5 + widthChart / 2, 70, widthChart * 5 + widthChart / 2 + widthChart / 4, 170);
    ctx.quadraticCurveTo(widthChart * 6 - widthChart / 8, 230, widthChart * 6, 230);
    ctx.lineTo(widthChart * 6, 260);

    ctx.lineWidth = 40;
    ctx.fillStyle = 'rgb(150, 222, 250)';
    ctx.strokeStyle = 'rgb(150, 222, 250)';
    ctx.fill();
    ctx.stroke();

    // a day
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    ctx.moveTo(25 * widthChart / 48, 260);
    ctx.quadraticCurveTo(widthChart, -50, 1103 * widthChart / 720, 260);
    ctx.lineWidth = 1.5;
    ctx.stroke();


    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    ctx.moveTo(359 * widthChart / 144, 260);
    ctx.quadraticCurveTo(widthChart * 3, -50, 2513 * widthChart / 720, 260);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(216, 162, 38)';
    ctx.moveTo(325 * widthChart / 72, 260);
    ctx.quadraticCurveTo(widthChart * 5, -50, 793 * widthChart / 144, 260);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // a night
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(0, 0, widthChart / 2, 260);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(widthChart + widthChart / 2, 0, widthChart, 260);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(widthChart * 3 + widthChart / 2, 0, widthChart, 260);
    ctx.stroke();

    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(widthChart * 5 + widthChart / 2, 0, widthChart / 2, 260);
    ctx.stroke();

    //time
    // day 1
    // 1st
    // 1h = w/12
    // 1m = w/720
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(widthChart / 48 - 4, 170, 56, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "15px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[0].tide[0].value} m`, widthChart / 48 + 8, 185);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[0].time), widthChart / 48, 200);


    //2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(383 * widthChart / 720 - 4, 100, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[0].tide[1].value} m`, 383 * widthChart / 720 + 8, 115);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[1].time), 383 * widthChart / 720, 130);


    //3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(55 * widthChart / 48 - 4, 150, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[0].tide[2].value} m`, 55 * widthChart / 48 + 8, 165);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[2].time), 55 * widthChart / 48, 180);


    //4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(643 * widthChart / 360 - 4, 150, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[0].tide[3].value} m`, 643 * widthChart / 360 + 8, 165);
    ctx.fillText(formatTime(tideAndSunData.days[0].tide[3].time), 643 * widthChart / 360, 180);


    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[0].sunriseTime), 25 * widthChart / 48, 267);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[0].sunsetTime), 1103 * widthChart / 720, 267);

    // day 2
    // 1st
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(35 * widthChart / 16 - 4, 130, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[1].tide[1].value} m`, 35 * widthChart / 16 + 8, 145);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[1].time), 35 * widthChart / 16, 160);

    // 2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(1963 * widthChart / 720 - 4, 96, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[1].tide[1].value} m`, 1963 * widthChart / 720 + 8, 115);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[1].time), 1963 * widthChart / 720, 130);


    // 3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(155 * widthChart / 48 - 4, 100, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[1].tide[2].value} m`, 155 * widthChart / 48 + 8, 120);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[2].time), 155 * widthChart / 48, 135);

    // 4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(1363 * widthChart / 360 - 4, 140, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[1].tide[3].value} m`, 1363 * widthChart / 360 + 8, 160);
    ctx.fillText(formatTime(tideAndSunData.days[1].tide[3].time), 1363 * widthChart / 360, 175);

    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[1].sunriseTime), 359 * widthChart / 144, 267);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[1].sunsetTime), 2513 * widthChart / 720, 267);


    // day 3
    // 1st
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(1589 * widthChart / 360 - 4, 130, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[2].tide[0].value} m`, 1589 * widthChart / 360 + 8, 145);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[0].time), 1589 * widthChart / 360, 160);

    // 2nd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(43 * widthChart / 9 - 4, 150, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[2].tide[1].value} m`, 43 * widthChart / 9 + 8, 165);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[1].time), 43 * widthChart / 9, 180);

    // 3rd
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(949 * widthChart / 180 - 4, 110, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[2].tide[2].value} m`, 949 * widthChart / 180 + 8, 130);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[2].time), 949 * widthChart / 180, 145);


    // 4th
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgb(173, 173, 173)';
    ctx.fillRect(17 * widthChart / 3 - 4, 110, 58, 40);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(`${tideAndSunData.days[2].tide[3].value} m`, 17 * widthChart / 3 + 8, 130);
    ctx.fillText(formatTime(tideAndSunData.days[2].tide[3].time), 17 * widthChart / 3, 145);
    //sunrise time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[2].sunriseTime), 325 * widthChart / 72, 267);

    //sunset time
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(180, 100, 30)';
    ctx.font = "16px Times New Roman";
    ctx.fillText(formatTime(tideAndSunData.days[2].sunsetTime), 793 * widthChart / 144, 267);



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

  const scrollWindow = () => {
    const widthWindow = window.innerWidth;
    let currentScroll = document.getElementById('chart-container').scrollLeft;
    let currentMinute = Math.floor(currentScroll / (widthWindow / 720));
    let currentHour = Math.floor(currentScroll / (widthWindow / 12));
    let countTimeMinute = Math.floor(currentScroll / (widthWindow / 12));
    let countTimeHour = Math.floor((currentScroll * 12) / (widthWindow));

    if (currentScroll < (widthWindow + widthWindow / 2)) {
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
            // console.log(tideAndSunData.days[2].sunriseTime.getDate());

          }
        );
    }


    if (tideAndSunData !== 0) {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);

      //console.log('a');

      myRef.current.width = canvasWidth;
      myRef.current.height = 270;
      const ctx = myRef.current.getContext('2d');
      chartBackground({ widthChart: size, ctx });

    }




    return () => window.removeEventListener('resize', resizeWindow);

  }, [size, chartBackground]);

  return (
    <>
      <div className='chart-weather' ref={containerRef} id='chart-container' onScroll={scrollWindow} >

        <canvas ref={myRef} id='myCanvas' />

        <span className='text-time'>{scrollBar}</span>
        <div className='text-line-container'>
           <span className='text-line'></span>
        </div>
   
        <div className='title-chart-weather'>
          <span className='text-light-blue'>Tide</span>
          <span className='text-dot'></span>
          <span className='text-orange'>Sunrise & Sunset</span>

        </div>

        <img ref={sunRef} src='./../sun.png' name='sun' width={45} height={45} />
        <div className='text-day'>{currentDate}</div>

      </div>

    </>
  )
}

export default ChartWeather;
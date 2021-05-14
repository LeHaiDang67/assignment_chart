// Just use for mock data
const newDateWithTime = (date, addDay, hour, minute) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + addDay,
      hour,
      minute,
    );
  };
  
  const getWeatherInfo = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'Cloudy',
          temp: 29.2,
          humidity: 73,
          psi: 23,
          psiStatus: 'Good',
          rain: 0,
        });
      }, 1000);
    });
    return promise;
  };
  
  const getTideAndSunData = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        const currentTime = new Date();
        resolve({
          currentTime,
          days: [
            // day 1
            {
              sunriseTime: newDateWithTime(currentTime, 0, 6, 15),
              sunsetTime: newDateWithTime(currentTime, 0, 18, 23),
              tide: [
                {
                  time: newDateWithTime(currentTime, 0, 1, 15),
                  value: 3.7,
                },
                {
                  time: newDateWithTime(currentTime, 0, 6, 23),
                  value: 2.4,
                },
                {
                  time: newDateWithTime(currentTime, 0, 13, 45),
                  value: 3.1,
                },
                {
                  time: newDateWithTime(currentTime, 0, 21, 26),
                  value: 1.9,
                },
              ],
            },
            // day 2
            {
              sunriseTime: newDateWithTime(currentTime, 1, 5, 55),
              sunsetTime: newDateWithTime(currentTime, 1, 17, 53),
              tide: [
                {
                  time: newDateWithTime(currentTime, 1, 2, 15),
                  value: 2.9,
                },
                {
                  time: newDateWithTime(currentTime, 1, 8, 43),
                  value: 2.1,
                },
                {
                  time: newDateWithTime(currentTime, 1, 14, 45),
                  value: 3.1,
                },
                {
                  time: newDateWithTime(currentTime, 1, 21, 26),
                  value: 1.8,
                },
              ],
            },
            // day 3
            {
              sunriseTime: newDateWithTime(currentTime, 2, 6, 10),
              sunsetTime: newDateWithTime(currentTime, 2, 18, 5),
              tide: [
                {
                  time: newDateWithTime(currentTime, 2, 4, 58),
                  value: 2.9,
                },
                {
                  time: newDateWithTime(currentTime, 2, 9, 20),
                  value: 2.3,
                },
                {
                  time: newDateWithTime(currentTime, 2, 15, 16),
                  value: 2.7,
                },
                {
                  time: newDateWithTime(currentTime, 2, 20, 0),
                  value: 2.2,
                },
              ],
            },
          ],
        });
      }, 10);
    });
    return promise;
  };
  
  export { getWeatherInfo, getTideAndSunData };
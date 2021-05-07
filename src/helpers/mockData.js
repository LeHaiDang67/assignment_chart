const mockWaterData = [
    {
        waterLevel: {
          start: 0.6,
          end: 2,
        },
      },
      {
        waterLevel: {
          start: 2,
          end: 0.4,
        },
      },
      {
        waterLevel: {
          start: 0.4,
          end: 0,
        },
      },
      {
        waterLevel: {
          start: 0,
          end: 0.2,
        },
      },
      {
        waterLevel: {
          start: 0.2,
          end: 2,
        },
      },
      {
        waterLevel: {
          start: 2,
          end: 0.3,
        },
      },
      {
        waterLevel: {
          start: 0.3,
          end: 2,
        },
      },
      {
        waterLevel: {
          start: 2,
          end: 0.3,
        },
      },
      {
        waterLevel: {
          start: 0.3,
          end: 2,
        },
      },
      {
        waterLevel: {
          start: 2,
          end: 0.3,
        },
      },
      {
        waterLevel: {
          start: 0.3,
          end: 1,
        },
      },
      {
        waterLevel: {
          start: 1,
          end: 0.3,
        },
      }
]

export const calulateTimeLevel = (n) =>{
    return {
        timeLevel :{
            start: n * 6,
            end: (n + 1) * 6,
        },
    };
};

const generatetimeLevel = (n) =>{
    let res = [];
    for( let i = 0; i < n; i++){
        res.push(calulateTimeLevel(i));
    }
    return res;
}

const mockTimeLevelData = generatetimeLevel(mockWaterData.length);

export const chartData = mockWaterData.map((item, index) =>({
    ...item,...mockTimeLevelData[index],
}))
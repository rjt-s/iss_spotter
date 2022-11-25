// index file

const { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work:", error);
//     return;
//   }

//   console.log("It worked! IP returned:", IP);
// });

// fetchCoordsByIP('97.108.188.40', (error, data) => {
//   if (error) {
//     console.log(error);
//   }

//   console.log(data);
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
//   if (error) {
//     console.log(error);
//   }

//   console.log(data);
// });

nextISSTimesForMyLocation((error, passtimes) => {
  if (error) {
    return console.log("Error: ", error);
  }

  console.log(passtimes);
})
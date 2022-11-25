// const { fetchMyIP, fetchCoordsByIP, fetchFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');

// // fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('41', (error, longitude, latitude) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
// console.log("longitude: " + longitude, "latitude: " + latitude)});

// const coords = {latitude: '43.5890452', longitude: '-79.6441198'};

// const coords = {latitude: '3', longitude: '2323'};

// fetchFlyoverTimes(coords, ((error, data) => {
//   if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//   console.log(data);
// }));

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
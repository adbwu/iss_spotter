// iss_promised.js

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(response => (JSON.parse(response).ip))
    .then(ip => fetchCoordsByIP(ip))
    .then((whois) => {
      const { latitude, longitude } = JSON.parse(whois);
      return { latitude, longitude }})
    .then((coords) => fetchFlyoverTimes(coords))
    .then((passes) => console.log(JSON.parse(passes).response))
    .catch((error) => console.log("It didn't work: ", error.message))
    .finally();
};




const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = (ip) => request(`http://ipwho.is/${ip}`);

const fetchFlyoverTimes = (coords) => request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);

module.exports = { nextISSTimesForMyLocation };
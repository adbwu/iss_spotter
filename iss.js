const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null, null);
      return;
    }
    // if non-200 status, assume server error
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const msg = `ERROR: ` + parsedBody.message;
      callback(Error(msg), null, null);
      return;
    }
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
};

const fetchFlyoverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Flyover Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchFlyoverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, passes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchFlyoverTimes, nextISSTimesForMyLocation };
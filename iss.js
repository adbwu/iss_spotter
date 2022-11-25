const request = require('request');

const fetchMyIP = (callback) => { 
  request('https://api.ipify.org?format=json', (error, response, body) => {
    let ip = JSON.parse(body).ip;
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
    callback(error, ip);
  });
};

module.exports = { fetchMyIP };
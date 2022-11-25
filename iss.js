const request = require('request');

// fetching the IP of the computer
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      return callback(error, null);
    }

    // if status code is not 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body)['ip'];
    return callback(null, IP);
  });
};

// fetchCoordsByIP will return lat,long when provided with ip address of user
const fetchCoordsByIP = function(ip, callback) {
  // using req lib to get co-oridnates
  const url = `http://ipwho.is/${ip}`;
  request(url, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }

    const data = JSON.parse(body);

    // since this api still gives status code 200 if it;s an incorrect ip address
    if (!(data.success)) {
      const msg = `${data['message']} while fetching co-ordinates of IP address`;
      callback(Error(msg), null);
      return;
    }
    
    const coordinates = {latitude:data['latitude'], longitude: data['longitude']};
    return callback(null, coordinates);
  });

};

// fetching the ISS fly over times for a particular location
const fetchISSFlyOverTimes = function(coords, callback) {
  // getting iss flyover time through iss flyover api
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`;
  request(url, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }

    // if status code is not 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover timings`;
      callback(Error(msg), null);
      return;
    }

    const issData = JSON.parse(body);
    return callback(null, issData['response']);
  });
};

// a single function that will call/chain all 3 different api calls within itself
const nextISSTimesForMyLocation = function(callback) {
  // calling first function to get ip address
  fetchMyIP((error, IP) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(IP, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, data);
      })
    })
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
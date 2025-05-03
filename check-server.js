// Script to check if the server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5173,
  path: '/',
  method: 'GET'
};

console.log('Checking if the server is running at http://localhost:5173/...');

const req = http.request(options, res => {
  console.log(`Server status: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('Server is running correctly!');
  } else {
    console.log('Server is running but returned an unexpected status code.');
  }
  
  res.on('data', d => {
    // Just consume the data
  });
});

req.on('error', error => {
  console.error('Server check failed:', error.message);
});

req.end();

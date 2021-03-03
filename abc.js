const axios = require('axios');

const config = {
  method: 'get',
  url: 'http://245c824011f0.ngrok.io/api/v1/projects?',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0YzQyNjA5LTViYzQtNDAwMy1hMDQwLWY4ZmQ5ZGIzNzliZiIsInVzZXJJZCI6MSwiY2xpZW50SWQiOiJ0ZXN0X2NsaWVudF9pZCIsImlhdCI6MTYxNDc0NDA3NSwiZXhwIjoxNjE0NzgwMDc1fQ.s_03U6I2wKNNh3dGKm_xuX7zFwbwswF2l_JE4j9SBFQ'
    ,origin: "10.10.4.235"
}
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  })
import axios from 'axios';

export const writeTrade  = (params) => {
    const url = 'http://localhost:8000/api/ticket/create'
    axios.post(url, params)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
      });
  };

  export const getTrade  = (params, type) => {
    let url = `http://localhost:8000/api/ticket/${params}`
    if(type){
     url = `http://localhost:8000/api/ticket/${params}/${type}`
    } 
    return axios.get(url);

  };

  export const loginUser  = (params) => {
    const url = 'http://localhost:8000/api/users/signin'
    return axios.post(url, params)
  };
import axios from "axios";

export const API_URL = 'https://nitalifebackend-production.up.railway.app'


export const cardCakefetch = async () => {
  const response = await axios({
    url: API_URL + "/stores/cakes",
    method: "get",
  });

  return response.data;
};


export const cardGroceryFetch = async () => {
  const response = await axios({
    url: API_URL + "/stores/grocery",
    method: "get",
  });

  return response.data;
};


export const cardmedicalFetch = async () => {
  const response = await axios({
    url: API_URL + "/stores/medical",
    method: "get",
  });

  return response.data;
};

export const cardrestauantFetch = async () => {
  const response = await axios({
    url: API_URL + "/stores/restaurant",
    method: "get",
  });

  return response.data;
};


 
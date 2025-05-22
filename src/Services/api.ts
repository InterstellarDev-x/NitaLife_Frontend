import axios from "axios";
import type { poststore } from "../types";

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

export const PostStore = async (props: poststore) => {



  const token = localStorage.getItem("token");
  const response = await axios({
    url: API_URL + "/admin/create/store",
    method: "post",
    data: props,
    headers: {
      token: token
    },
  });

  return response.data;
};


export const UpdateStore = async(props : poststore)=>{
//  const token = localStorage.getItem("token");
  const response = await axios({
    url: API_URL + "/admin/store/" + props.id,
    method: "put",
    data: props,
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjNjODEyMDRhODI5ZjNjZGNkMjExYSIsImlhdCI6MTc0NzE3NTQ2MH0.6Bj5bezhJ-3tqqrpkV0Vu5g7Gt7GUOcK8mxusv0tBgU"
    },
  });

  return response.data
}
 
import { useRef, type RefObject } from "react";
import Input from "./Input";
import axios from "axios";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../Services/api";

interface poststore {

  name : string,
  address : string,
  imageUrl : string,
  phoneno : number,
  Descrption : string

}

 const PostStore = async (props : poststore) => {

  
  console.log(props)
    const response = await axios({
      url: API_URL + "/admin/create/store",
      method: "post",
      data: props,
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjNjODEyMDRhODI5ZjNjZGNkMjExYSIsImlhdCI6MTc0NzE3NTQ2MH0.6Bj5bezhJ-3tqqrpkV0Vu5g7Gt7GUOcK8mxusv0tBgU",
      },
    });

    return response.data;
  };




const Form = () => {
 

const queryclient = useQueryClient()

  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLSelectElement>(null);




  

 const { error , mutate , status}  = useMutation<poststore , Error ,  poststore>({
     mutationFn : PostStore,
     onSuccess: ()=>{
       queryclient.invalidateQueries({queryKey : ["cake"]  })
       queryclient.invalidateQueries({queryKey : ["medical"]})
       queryclient.invalidateQueries({queryKey : ["grocery"]})
       queryclient.invalidateQueries({queryKey : ["restaurant"]})

       

     }
 })


const PostStoreFunction = () => {
    const postdata: poststore = {
      name: nameRef.current?.value || "",
      address: addressRef.current?.value || "",
      imageUrl: urlRef.current?.value || "",
      phoneno: parseInt(phoneRef.current?.value || "0") ,
      Descrption: descriptionRef.current?.value || "",
    };

    mutate(postdata);
  };





  return (
  <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 mt-10 text-black">
    <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Store</h2>

    <Input
      type="text"
      placeholder="Enter Store Name"
      label="Name"
      ref={nameRef as RefObject<HTMLInputElement>}
    />
    <Input
      type="text"
      placeholder="Enter Store Address"
      label="Address"
      ref={addressRef as RefObject<HTMLInputElement>}
    />
    <Input
      type="text"
      placeholder="Enter the image URL"
      label="Image URL"
      ref={urlRef as RefObject<HTMLInputElement>}
    />
    <Input
      type="number"
      placeholder="Enter the phone number"
      label="Phone Number"
      ref={phoneRef as RefObject<HTMLInputElement>}
    />

    <label htmlFor="Descrption" className="block font-medium text-gray-700 mt-2">Category</label>
    <select
      name="Descrption"
      id="Descrption"
      ref={descriptionRef}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
    >
      <option value="medical">Medical</option>
      <option value="grocery">Grocery</option>
      <option value="restaurant">Restaurant</option>
      <option value="cake">Cake</option>
    </select>

    <button
      onClick={PostStoreFunction}
      className="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition active:scale-95"
    >
      {status === 'pending' ? 'Posting...' : 'Post'}
    </button>

    {error && <div className="text-red-500 text-center">An error occurred. Please try again.</div>}
  </div>
);
};

export default Form;

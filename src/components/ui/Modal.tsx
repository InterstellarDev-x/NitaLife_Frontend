import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useEffect, useRef  } from "react"
import type { poststore } from "../../types"
import {  UpdateStore } from "../../Services/api"
import type { cardInterface } from "./Card"


interface ModalInterface {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  store : cardInterface| null
}







const Modal = (props : ModalInterface) => {


    useEffect(() => {
  if (props.store) {
    if (nameRef.current) nameRef.current.value = props.store.name || "";
    if (addressRef.current) addressRef.current.value = props.store.address || "";
    if (urlRef.current) urlRef.current.value = props.store.imageUrl || "";
    if (phoneRef.current) phoneRef.current.value = props.store.phoneno?.toString() || "";
    if (descriptionRef.current) descriptionRef.current.value = props.store.Descrption || "medical";
  }
}, [props.store]);


  const queryclient = useQueryClient()

  const nameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLSelectElement>(null);
    

const { error, mutate, status } = useMutation<poststore, Error, poststore>({
    mutationFn: UpdateStore,
    onSuccess: () => {

      queryclient.invalidateQueries({ queryKey: ["cake"] })
      queryclient.invalidateQueries({ queryKey: ["medical"] })
      queryclient.invalidateQueries({ queryKey: ["grocery"] });
      queryclient.invalidateQueries({ queryKey: ["restaurant"] });


      props.setIsOpen(false )
    },
    onError: (err) => {
      console.error("Error posting store:", err);
      // You might want to use a toast notification here as well for errors
      // For example: toast(`Failed to add store: ${err.message}`);
    },
  });

  const PostStoreFunction = () => {
    const postdata: poststore = {
      id : props.store?._id,
      name: nameRef.current?.value || "",
      address: addressRef.current?.value || "",
      imageUrl: urlRef.current?.value || "",
      phoneno: parseInt(phoneRef.current?.value || "0"),
      Descrption: descriptionRef.current?.value || "", // This should probably be 'category'
    };

    mutate(postdata);
  };






  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button onClick={() => props.setIsOpen(true)} className="bg-teal-400 text-black rounded-lg px-4 py-3">
        Open
      </button>

      {props.isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center"
          onClick={() => props.setIsOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
           
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg w-full mx-4 border-2 rounded-lg border-white p-6 bg-white text-black shadow-xl"
          >
            

            {/* Input for Store Name */}
      <div className="relative">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Store Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="e.g., Delicious Cakes"
          ref={nameRef}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Input for Store Address */}
      <div className="relative">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="e.g., 123 Main St, City"
          ref={addressRef}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Input for Image URL */}
      <div className="relative">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          placeholder="e.g., https://example.com/store.jpg"
          ref={urlRef}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Input for Phone Number */}
      <div className="relative">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="number"
          id="phone"
          placeholder="e.g., 1234567890"
          ref={phoneRef}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Dropdown for Category */}
      <div className="relative">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          id="category"
          ref={descriptionRef} 
          defaultValue="medical" 
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 bg-white appearance-none pr-8" // Added appearance-none and pr-8 for custom arrow
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="medical">Medical</option>
          <option value="grocery">Grocery</option>
          <option value="restaurant">Restaurant</option>
          <option value="cake">Cake</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
       onClick={PostStoreFunction}
        className="w-full py-3 mt-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition duration-200 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center"
        disabled={status === 'pending'} 
      >
        {status === 'pending' ? (
          <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Update Store'
        )}
      </button>





            <button onClick={() => props.setIsOpen(false)} className="bg-red-500 text-white px-3 py-1 rounded">
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Modal
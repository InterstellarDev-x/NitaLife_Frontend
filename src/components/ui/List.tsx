import { motion } from 'framer-motion'
import type { cardInterface } from './Card';
import Modal from './Modal';
import { useState } from 'react';
import { useMutation,  useQueryClient } from '@tanstack/react-query';
import  { DeleteStore } from '../../Services/api';
import type { poststore } from '../../types';
import { useToast } from './Toast';

interface  ListProps  {
  Stores : cardInterface[]
}

const List = (props : ListProps) => {

  
  const queryclient = useQueryClient()
  const [isOpen , setisOpen ] = useState<boolean>(false)
  const [selectedStore, setSelectedStore] = useState<cardInterface | null>(null);


  const { mutate , isError , isPending } =  useMutation<string , Error , string>({
    mutationKey :  ['Delete'],
    mutationFn : DeleteStore,
     onSuccess: () => {

      queryclient.invalidateQueries({ queryKey: ["cake"] })
      queryclient.invalidateQueries({ queryKey: ["medical"] })
      queryclient.invalidateQueries({ queryKey: ["grocery"] });
      queryclient.invalidateQueries({ queryKey: ["restaurant"] });



    },
    onError: (err) => {
      console.error("Error posting store:", err);
      // You might want to use a toast notification here as well for errors
      // For example: toast(`Failed to add store: ${err.message}`);
    },
   })
  

  const handleUpdate = (store : cardInterface) => {
         setSelectedStore(store)
      setisOpen(true);
  };

  const handleDelete = (store : string) => {
    mutate(store)
  };

  return (<>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {props.Stores.map((store) => (
        <motion.div
          key={store._id}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 transition duration-200 ease-in-out"
        >
          <img
            src={store.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={store.name || "Store Image"}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">{store.name || "N/A"}</h2>
            <p className="text-sm text-gray-600"><strong>Address:</strong> {store.address || "N/A"}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {store.phoneno || "N/A"}</p>
            <p className="text-sm text-gray-600"><strong>Description:</strong> {store.Descrption || "N/A"}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() =>  ( 

                handleUpdate(store) )}

              className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(store._id)}
              className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
           
          </div>
         
        </motion.div>

      ))}
    </div> {isOpen && <Modal isOpen={isOpen} setIsOpen={setisOpen} store={selectedStore} />}
     </>
  );
  
};

export default List;
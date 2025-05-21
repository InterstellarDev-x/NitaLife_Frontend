import { motion } from 'framer-motion'
import type { cardInterface } from './Card';

interface  ListProps  {
  Stores : cardInterface[]
}

const List = (props : ListProps) => {
  

  const handleUpdate = (id: string) => {
    console.log("Update:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
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
              onClick={() => handleUpdate(store._id)}
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
    </div>
  );
};

export default List;
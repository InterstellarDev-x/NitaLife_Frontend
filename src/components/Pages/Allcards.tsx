import { useQueries } from "@tanstack/react-query";
import "../../App.css"; 

import { motion } from "framer-motion";
import { Card, type cardInterface } from "../ui/Card"; 
import {
  cardCakefetch,
  cardGroceryFetch,
  cardmedicalFetch,
  cardrestauantFetch,
} from "../../Services/api";
import Serachbar from "../ui/Serachbar"; 

function Allcards() {
  const data = useQueries({
    queries: [
      {
        queryKey: ["cake"],
        queryFn: cardCakefetch,
      },
      {
        queryKey: ["medical"],
        queryFn: cardmedicalFetch,
      },
      {
        queryKey: ["grocery"],
        queryFn: cardGroceryFetch,
      },
      {
        queryKey: ["restaurant"],
        queryFn: cardrestauantFetch,
      },
    ],
  });

  const [cake, medical, grocery, restaurant] = data;

  // Loading state
  if (
    cake.isLoading ||
    medical.isLoading ||
    grocery.isLoading ||
    restaurant.isLoading
  ) {
    return (
      <div className="flex justify-center items-center space-x-2 h-screen w-screen bg-gray-900">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-10 h-10 bg-indigo-500 rounded-full" 
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  // Error state
  if (cake.isError || medical.isError || grocery.isError || restaurant.isError) {
    return (
      <div className="bg-gray-900 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center text-red-400 text-xl md:text-2xl px-4 text-center space-y-6 font-sans">
        <p className="text-3xl font-bold mb-4">Oops! Something went wrong.</p>
        <p className="text-lg">
          It seems there was an error fetching data. Please check your network
          connection or try again later.
        </p>
        <button
          onClick={() => window.location.reload()} 
          className="px-6 py-3 rounded-xl active:scale-95 bg-indigo-600 text-white text-lg font-medium shadow-lg hover:bg-indigo-700 transition duration-200"
        >
          Reload Page
        </button>
      </div>
    );
  }

  const allStores = [
    ...cake.data.allCakesStore,
    ...medical.data.allMedicalStore,
    ...grocery.data.allgroceryStore,
    ...restaurant.data.allrestaurantStore,
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
//@ts-ignore
      <Serachbar data={data} />

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 overflow-x-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.5, duration: 0.8 }}
          className="text-center text-4xl sm:text-5xl font-extrabold p-4 mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600" // Modern gradient and font
        >
          Campus Stores
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {allStores.length > 0 ? (
            allStores.map((s: cardInterface) => (
              <motion.div
                key={s._id}
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  _id={s._id}
                  Descrption={s.Descrption}
                  address={s.address}
                  name={s.name}
                  phoneno={s.phoneno}
                  imageUrl={s.imageUrl}
                />
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-4 text-center text-gray-600 text-xl py-10">
              No stores available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allcards;

import List from "../../ui/List";
import Form from "../../ui/Form";
import { useEffect, useState } from "react";
import { Club, MapPin, Store, LogOut } from "lucide-react"; // Added LogOut icon
import { motion } from "framer-motion";
import Staggerd from "../../ui/Staggerd";
import { useNavigate } from "react-router-dom";
import {
  cardCakefetch,
  cardGroceryFetch,
  cardmedicalFetch,
  cardrestauantFetch,
} from "../../../Services/api";
import { useQueries } from "@tanstack/react-query";
import type { cardInterface } from "../../ui/Card";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [showbutton, setshowbutton] = useState<number>(1);

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

  const [query, setquery] = useState<string>("");
  const [querydata, setquerydata] = useState<cardInterface[]>([]);

  useEffect(() => {
    if (
      !cake.data ||
      !medical.data ||
      !grocery.data ||
      !restaurant.data
    ) {
      return;
    }

    if (query.trim() === "") {
      setquerydata([
        ...cake.data.allCakesStore,
        ...medical.data.allMedicalStore,
        ...grocery.data.allgroceryStore,
        ...restaurant.data.allrestaurantStore,
      ]);
      return;
    }

    const filterdata = [
      ...cake.data.allCakesStore,
      ...medical.data.allMedicalStore,
      ...grocery.data.allgroceryStore,
      ...restaurant.data.allrestaurantStore,
    ].filter(
      (store) =>
        store.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        store.Descrption.toLocaleLowerCase().includes(
          query.toLocaleLowerCase()
        ) ||
        store.address?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    setquerydata(filterdata);
  }, [query, cake.data, medical.data, grocery.data, restaurant.data]);

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
            className="w-10 h-10 bg-indigo-500 rounded-full" // Changed color
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

  if (
    cake.isError ||
    medical.isError ||
    grocery.isError ||
    restaurant.isError
  ) {
    return (
      <div className="bg-gray-900 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center text-red-400 text-xl md:text-2xl px-4 text-center space-y-6">
        <p className="text-3xl font-bold mb-4">Oops! Something went wrong.</p>
        <p className="text-lg">
          It seems there was an error fetching data. Please check your network
          connection or try again later.
        </p>
        <button
          onClick={() => Navigate("/")}
          className="px-6 py-3 rounded-xl active:scale-95 bg-indigo-600 text-white text-lg font-medium shadow-lg hover:bg-indigo-700 transition duration-200"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  const handleAddStore = () => setshowbutton(1);
  const handleAddClub = () => setshowbutton(2);
  const handleAddPlace = () => setshowbutton(3);
  const handleLogout = () => (localStorage.removeItem("token"), Navigate("/"));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative font-sans">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out flex items-center space-x-2"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

      <section className="mb-10 pt-12">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <button
            onClick={handleAddStore}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
          >
            <Store className="text-indigo-500 mb-3 group-hover:text-indigo-600 transition duration-200" size={32} />
            <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition duration-200">
              Add New Store
            </span>
          </button>
          <button
            onClick={handleAddClub}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
          >
            <Club className="text-green-500 mb-3 group-hover:text-green-600 transition duration-200" size={32} />
            <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition duration-200">
              Add New Club
            </span>
          </button>
          <button
            onClick={handleAddPlace}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
          >
            <MapPin className="text-purple-500 mb-3 group-hover:text-purple-600 transition duration-200" size={32} />
            <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition duration-200">
              Add New Place
            </span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
        <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-lg">
          {showbutton === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Add New Store
              </h2>
              <Form />
            </div>
          )}
          {showbutton === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 py-10"
            >
              <Staggerd
                name="Coming Soon..."
                straggerdtime={0.1}
                color="text-gray-500" // Changed color for 'Coming Soon'
                stringsize="text-4xl" // Increased size
              />
              <p className="mt-4 text-lg">
                We're working hard to bring you this feature!
              </p>
            </motion.div>
          )}
          {showbutton === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 py-10"
            >
              <Staggerd
                name="Coming Soon..."
                straggerdtime={0.1}
                color="text-gray-500"
                stringsize="text-4xl"
              />
              <p className="mt-4 text-lg">
                We're excited to launch this feature soon!
              </p>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Existing{" "}
            {showbutton === 1
              ? "Stores"
              : showbutton === 2
              ? "Clubs"
              : "Places"}
          </h2>
          {showbutton === 1 && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg py-3 px-5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 mb-6"
              placeholder="Search Stores..."
              onChange={(e) => setquery(() => e.target.value)}
            />
          )}
          {query && querydata.length === 0 && showbutton === 1 && (
            <div className="text-red-500 bg-red-50 p-3 rounded-lg text-center font-medium mb-6">
              No matching {showbutton === 1 ? "stores" : ""}{" "}found.
            </div>
          )}
          {showbutton === 1 && <List Stores={querydata} />}

          {showbutton === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 py-10"
            >
              <Staggerd
                name="Coming Soon..."
                straggerdtime={0.1}
                color="text-gray-500"
                stringsize="text-4xl"
              />
              <p className="mt-4 text-lg">
                Stay tuned for updates on new clubs!
              </p>
            </motion.div>
          )}
          {showbutton === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 py-10"
            >
              <Staggerd
                name="Coming Soon..."
                straggerdtime={0.1}
                color="text-gray-500"
                stringsize="text-4xl"
              />
              <p className="mt-4 text-lg">
                Exciting new places are on their way!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
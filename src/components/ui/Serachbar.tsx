import { useEffect, useState } from "react";

import { Card, type cardInterface } from "./Card";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";



type data = {
  data: {
    allCakesStore: cardInterface[];
    allMedicalStore: cardInterface[];
    allrestaurantStore: cardInterface[];
    allgroceryStore: cardInterface[];
  };
};

interface searchbar {
  data: data[];
}

const Serachbar = (props: searchbar) => {
  const cake = props.data[0]?.data.allCakesStore;
  const medical = props.data[1]?.data.allMedicalStore;
  const grocery = props.data[2]?.data.allgroceryStore;
  const restaurant = props.data[3].data.allrestaurantStore;
  const Navigate = useNavigate();

  const [query, setquery] = useState<string>("");
  const [querydata, setquerydata] = useState<cardInterface[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setquerydata([]);
      return;
    }

    const filterdata = [...cake, ...medical, ...grocery, ...restaurant].filter(
      (store) =>
        store.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        store.Descrption.toLocaleLowerCase().includes(
          query.toLocaleLowerCase()
        ) ||
        store.address?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    setquerydata(filterdata);
  }, [query, cake, medical, grocery, restaurant]);

  return (
    <div className="w-full bg-white py-6 text-black px-4 sm:px-6 md:px-10">
      <div className="mb-6">
        <button
          onClick={() => Navigate("/")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
        <ArrowLeft/>
          Back to Home
        </button>
      </div>
      <h2 className="text-center text-xl font-semibold mt-4">
        Search Campus Stores
      </h2>
     <input
          type="text"
          placeholder="Search for restaurants, medical stores, groceries, and more..."
          onChange={(e) => setquery(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
          aria-label="Search campus stores"
        />
      {query.trim() !== "" && querydata.length === 0 && (
        <div className="text-center text-lg text-red-600 p-4 bg-red-50 rounded-md max-w-md mx-auto shadow-sm">
          <p>No matching stores found for "{query}". Try a different search term.</p>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 mt-4 px-4 overflow-y-auto max-h-[60vh]">
        {querydata?.map((s: cardInterface) => (
          <div key={s._id}>
            <Card
              _id={s._id}
              Descrption={s.Descrption}
              address={s.address}
              name={s.name}
              phoneno={s.phoneno}
              imageUrl={s.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Serachbar;

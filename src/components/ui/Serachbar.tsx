import {  useEffect, useState } from "react";

import { Card, type cardInterface } from "./Card";

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

const   Serachbar = (props: searchbar) => {
  const cake = props.data[0].data.allCakesStore;
  const medical = props.data[1].data.allMedicalStore;
  const grocery = props.data[2].data.allgroceryStore;
  const restaurant = props.data[3].data.allrestaurantStore;





  const [query, setquery] = useState<string>("");
  const [querydata , setquerydata ] = useState<cardInterface[]>([])
  
    

  useEffect(()=>{

    if(query.trim()===""){
      setquerydata([]);
      return;
    }

    const  filterdata = [...cake , ...medical , ...grocery , ...restaurant].filter((store) => (
        store.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || store.Descrption.toLocaleLowerCase().includes(query.toLocaleLowerCase())  || store.address?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ))

    setquerydata(filterdata)

     


  }, [query , cake ,medical , grocery , restaurant] )


 



  return (
    <div className="w-full bg-white py-6 text-black px-4 sm:px-6 md:px-10">
      <a href="/">Home</a>
      <h2 className="text-center text-xl font-semibold mt-4">Search Campus Stores</h2>
      <input
        type="text"
        placeholder="Search Stores"
        onChange={(e) => setquery(() => e.target.value)}
        className="w-full max-w-md mx-auto block mt-4 p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
      />
      {query && querydata.length === 0 && (
        <div className="text-red-500 px-4 py-2  text-center">No matching stores found.  </div>
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

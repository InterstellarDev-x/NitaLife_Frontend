import { useQueries  } from "@tanstack/react-query";
import "../../App.css";



import { motion } from "framer-motion";
import { Card, type cardInterface } from "../ui/Card";
import { cardCakefetch, cardGroceryFetch, cardmedicalFetch, cardrestauantFetch } from "../../Services/api";
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



   

  if (
    cake.isLoading ||
    medical.isLoading ||
    grocery.isLoading ||
    restaurant.isLoading
  ) {
     return (
     <div className="flex justify-center items-center space-x-2 h-screen w-screen">
    {[...Array(3)].map((_ , index)=>(
        <motion.div  
        key={index}
        className="w-10 h-10 bg-teal-500 rounded-full"
        animate={{
            y: [0 , -15 , 0]
        }}
        transition={{
            duration :  .6,
            ease : 'easeInOut',
            repeat : Infinity,
            repeatDelay: index*0.2

        }}/>
    ))}
    </div>
  )
  }

  if (cake.isError || medical.isError || grocery.isError || restaurant.isError) {
    return <div className="bg-black h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center text-red-500 text-2xl px-4 text-center space-y-6">Error Happend in network 
  <hr />
    <button className="px-4 py-2 rounded-xl active:scale-90 bg-white text-black text-lg">Go back to home </button> </div>;
  }


 


  const allStores = [...cake.data.allCakesStore , ...medical.data.allMedicalStore , ...grocery.data.allgroceryStore , ...restaurant.data.allrestaurantStore ]



    


  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 overflow-x-hidden">
    <Serachbar data={data}/>

    


      <div className="text-white border-white  rounded-lg mb-4 ">
      <motion.h1   
      initial={{
        opacity : 0
      }} 
      animate ={{
        opacity: 1
      }}

      transition={{
        ease : 'easeInOut',
      delay: .5      }}
      
      className="border-white text-center text-3xl sm:text-4xl font-semibold p-4 text-[#f3a900]"> Campus Stores </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {allStores.map((s: cardInterface) => (
          <div id={s._id} key={s._id} className="w-full max-w-sm">
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


    </div>
  );
}

export default Allcards;

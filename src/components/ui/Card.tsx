import { motion } from "framer-motion";


export interface cardInterface {
  _id: string;
  Descrption: string;
  name: string;
  phoneno: number;
  imageUrl: string;
  address: string;
}

export const Card = (props: cardInterface) => {
  return (
    <motion.div
    initial={{
      y: 50,
      opacity: 0,

    }}

   


whileInView={{
      y:0,
      opacity: 1
    }}

      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 1,
        ease : 'easeInOut'      }}

      className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm w-full p-4  hover:scale-105"
    >
      <img
        src={props.imageUrl}
        alt={props.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{<span className="text-[#27b089]">Shop</span>}: {<span className="text-[#f3a900]">{props.name}</span>}</h2>
        <p className="text-gray-600 text-sm">Description: {props.Descrption}</p>
        <p className="text-gray-700 font-medium">📞 {props.phoneno}</p>
        <p className="text-gray-600 text-sm">📍 {props.address}</p>
      </div>
    </motion.div>
  );
};
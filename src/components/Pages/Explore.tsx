import { motion, useScroll, useTransform } from "framer-motion";
import  { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";

const ExploreSection = () => {
  const typedRef = useRef<HTMLSpanElement>(null);

  const { scrollY } = useScroll();

  // Adjusted scroll range for a potentially more subtle effect initially
  const scale = useTransform(scrollY, [300, 800], [1, 1.2]); // Reduced max scale for less aggressive zoom
  const y = useTransform(scrollY , [300 , 800] , [50 , 0])
  const opacity = useTransform(scrollY , [300 , 800] , [.5 , 1])


  useEffect(() => {
    const typed = new Typed(typedRef.current!, {
      strings: [
        "the campus stores",
        "the campus places",
        "the campus clubs",
        "the amazing events",
        "the student communities",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,

    });

    return () => typed.destroy();  
  }, []);

  return (
    <section className="bg-white py-20 text-center px-4">
      <h2 className=" font-bold text-gray-800 mb-6 text-lg md:text-lg lg:text-6xl font-Brand">
        Explore <span className="text-purple-600 " ref={typedRef}></span>
      </h2>
      <motion.p 

      initial={{
    
         y: 100,
         opacity : 0,
      }}

      whileInView={{
        y : 0,
        opacity : 1,
      }}

      transition={{
        duration : 1,
        ease : 'easeIn'
      }}
      
      
      className=" text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base lg:text-lg font-SemiBrand">
        Dive deep into campus life — from student-run stores and hangout spots to clubs, events, and everything in between.
      </motion.p>
      <motion.div  
      
      style={{scale , y  , opacity}} 
      transition={{
        ease : 'easeInOut'
      }}
      
      
      className="flex flex-wrap justify-center gap-6 font-SemiSemiBrand">
        <Link to="/stores" className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
          Campus Stores
        </Link>
        <Link to="/places" className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:bg-pink-700 transition">
          Campus Places
        </Link>
        <Link to="/clubs" className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
          Campus Clubs
        </Link>
        <Link to="/more" className="px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition">
          Campus Events
        </Link>
      </motion.div>
    </section>
  );
};

export default ExploreSection;
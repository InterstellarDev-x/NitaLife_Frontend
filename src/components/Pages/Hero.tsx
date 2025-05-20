import { motion, useScroll, useTransform } from "framer-motion";

const scrollToBottom = () => {
  // Consider making this scroll to a specific section ID for more robustness
  // e.g., document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  window.scrollTo({
    top: 2300, // This value might need to be dynamic or linked to a component's ref
    behavior: 'smooth',
  });
};

const Hero = () => {
  const { scrollY } = useScroll();

  // Adjusted scroll range for a potentially more subtle effect initially
  const scale = useTransform(scrollY, [0, 800], [1, 1.8]); // Reduced max scale for less aggressive zoom
  const opacity = useTransform(scrollY, [0, 600], [1, 0]); // Fade out a bit sooner

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative text-white">
      {/* Background Image */}
      <motion.img
        className="absolute inset-0 w-full h-full object-cover" // Ensure image is behind text
        src={"IMG_20220818_180626770.jpg"} // Ensure this path is correct and image is in public folder or imported
        alt="NITA Campus" // Added alt text for accessibility
        style={{ scale, opacity }}
      />


      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>



      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 md:p-8 text-center">

        {/* Hero Section Text */}
        <div className="mb-4">
        <motion.span
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-3 md:mb-4 text-base md:text-lg lg:text-6xl font-medium text-[#FFD700] p-4" // Adjusted font size and margin
        >
          Explore More.  
        </motion.span>

         <motion.span
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8  , delay : .5}}
          className="mb-3 md:mb-4 text-base md:text-lg lg:text-6xl font-medium text-[#FFD700] p-4" // Adjusted font size and margin
        > 
          Know More.
        </motion.span>

         <motion.span
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8  , delay : 1}}
          className="mb-3 md:mb-4 text-base md:text-lg lg:text-6xl font-medium text-[#FFD700] p-4" // Adjusted font size and margin
        >
         Be More.
        </motion.span>
</div>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          // Removed whileInView scale to simplify and rely on initial load animation
          className="text-5xl md:text-7xl lg:text-6xl font-bold mb-6 md:mb-8 font-Brand bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent" // Increased bottom margin
        >
          NITA Life
        </motion.div>

        <motion.p // Changed to <p> for semantic correctness
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="max-w-xl md:max-w-2xl lg:max-w-3xl text-sm md:text-base lg:text-lg font-light text-[#E0E7FF] mb-8 md:mb-12" // Adjusted font size, weight, max-width for better readability and increased margin
        >
          Step into the heart of campus life. From hidden gems to helpful guides, explore everything your college has to offer – because the best years of your life deserve the perfect start.
        </motion.p>

        {/* Explore Button */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="mb-8 md:mb-12" // Added margin bottom
        >
          <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg w-fit mx-auto shadow-lg"> {/* Slightly larger rounding and shadow */}
            <button
              className="bg-slate-900 hover:bg-slate-800 text-white py-3 px-8 md:py-4 md:px-10 font-semibold text-base md:text-lg rounded-md transition-colors duration-300" // Adjusted padding, font size, background, and added hover effect
              onClick={scrollToBottom}
            >
              Explore Now
            </button>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start slightly lower and faded
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5, // Delay its appearance
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse", // Makes the yoyo effect smoother
            ease: "easeInOut",
          }}
          className="absolute bottom-10 md:bottom-12 text-xs md:text-sm font-light text-gray-300" // Positioned at bottom, adjusted styling
        >
          Scroll Down
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-auto mt-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
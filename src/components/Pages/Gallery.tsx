import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { motion  } from "framer-motion"
import Staggerd from "../ui/Staggerd"



const Gallery = () => {
 

  const  tagetref = useRef(null)

  const { scrollYProgress } = useScroll({
    target : tagetref
  })


  const x = useTransform(scrollYProgress , [0 , 1] , ['1%' , '-55%'] )


  return (
    <div className="h-[250vh] relative bg-neutral-900" ref={tagetref}>

        <motion.img
        className="absolute inset-0 w-full h-full object-cover" // Ensure image is behind text
        src={"https://images.unsplash.com/photo-1741356474365-5f0041f89eaa?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} // Ensure this path is correct and image is in public folder or imported
        alt="NITA Campus" // Added alt text for accessibility

      />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex gap-4 " style={{x}}>
           <Staggerd name="Explore " straggerdtime={.2} color="red-500" stringsize="9xl"/>

            <div className="group relative w-[30rem] h-[30rem] overflow-hidden bg-neutral-200">
              <div style={{
                backgroundImage : `URL(https://lh3.googleusercontent.com/pw/AP1GczMLhv7VQigBw413x6ZC_uaSgRlPON0Q6jMIk0csjHTjeFKZU5gzS4u82Jr3jLp8gsVpiZ9vd7D-EZ-4YQVCJeMh8qfquodRAb_Q7zh_t3wAxml5gz65BjnVPBELc0dnx9rpbXr9n7FQldrFvUCyOfdWQ02kPv6RTyaHj8Y71Lvm8Yq3RtHNzEGsbvuLj1GAge5h5J22UP2h5lK-XUQM352Qs2fzvsp33MRrAdB879j165t8V6FyQjH6vYJzwGQU3XbTRnFFOpqcHkMUDFR8apIHIu1bGP9ie6h2sDZU-O71JqoAopTgVn2o-AG62g7SkmO3iX2Sdq1wu1J2x0TJwOY49TjN0OWg4TEDtwTHwODD2zICnhHB1iZ-cqmdhJT-baU1s8f4D0zkN7cRZiL0ECfxoloWA6Nml_B6yBKXmPKyTNeT6YE0iuDhk74LfM7B8Qg3ZNL1j_3E2z7X8MMrWwumETmrWFVKxgjGFLogNfgCSrKmWXnkhKaUBxtwSLQx8-mjJn2QyK04JslM5VauPdLgWRnzgKGKZvwbInJBYhcMVVlHsR-PAqdh59Fv-MU0mMuVlpkT19Ynh0g8EAC8vzPlWsX5vWO535SvlZN5K0zl2r9_7Zxq8lvdbQmKuIjIOdJxFjWtKivtCuOXrRJ73A222NoNHX4hPQq_CjDDusc1oIZJ78fjABPI4PFCyHXyRs22u6jOlE2NBJAwnUMqSPZ3yXCnLXtqlrPo63yVcLJpZv7D8O1bcAnKyRdBWlLHupG3NKRPT1wfxNdu-TW1RNMUbGqItGZgd57ewItwbZFLcu8Ttmkx1FGHnxpyD2yx8LKEJC5Lkf7YSblU5scMMnJfAP796xyBmCHr97CNfNQCmdio9V6NHqt0PWqebMB1nB_S_GZTYxE57gZH9Bg5ZT_S691nukOnBOuusLbHw9apkxn0USPTxahPn0vcSh_mHxOiL0oyuF8X1a_BaTc_sd8hG40OCoprBRvoU0rqyFm0DYO-eVA8YMRYZQ=w377-h282-no?authuser=0)`,
                backgroundPosition : 'center',
                backgroundSize : 'cover'
              }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
            </div>
                      <div className="group relative w-[30rem] h-[30rem] overflow-hidden bg-neutral-200">
              <div style={{
                backgroundImage : `URL(NIt_Building.jpg)`,
                backgroundPosition : 'center',
                backgroundSize : 'cover'
              }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
            </div>
                        <div className="group relative w-[30rem] h-[30rem] overflow-hidden bg-neutral-200">
              <div style={{
                backgroundImage : `URL(cse1.jpg)`,
                backgroundPosition : 'center',
                backgroundSize : 'cover'
              }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
            </div>
                       <div className="group relative w-[30rem] h-[30rem] overflow-hidden bg-neutral-200">
              <div style={{
                backgroundImage : `URL(https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8)`,
                backgroundPosition : 'center',
                backgroundSize : 'cover'
              }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
            </div>
              <div className="group relative w-[30rem] h-[30rem] overflow-hidden bg-neutral-200">
              <div style={{
                backgroundImage : `URL(https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8)`,
                backgroundPosition : 'center',
                backgroundSize : 'cover'
              }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
            </div>
            
            

            

        </motion.div>
      </div>

 
      
    </div>
  )
}

export default Gallery

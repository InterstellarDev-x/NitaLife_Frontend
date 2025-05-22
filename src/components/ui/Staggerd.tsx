import {  motion } from "framer-motion";



interface straggerdinterface {
    name : string
    straggerdtime : number
    color : string
    stringsize? : string
}


const straggerdvariants = {
    hidden : {
        opacity : 0 ,

    },
    visible : {
        opacity : 1,

    }
}

const Staggerd = (props :straggerdinterface) => {
 
    const name = props.name

  return (
    <motion.h1 

    initial = "hidden"

    whileInView ='visible'

    variants={{
        visible : {
            transition : {staggerChildren : props.straggerdtime}
        }
    }}
    
    
    className={`font-Brand text-${props.stringsize} text-${props.color}`}>
        {name.split("").map((char , index ) => (
            <motion.span key={index} variants={straggerdvariants}>
                {char}
            </motion.span>
        )) }
      
    </motion.h1 >
  )
}

export default Staggerd

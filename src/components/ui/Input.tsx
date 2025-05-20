import type {  RefObject } from "react"

type inputsize =   'sm'  |  'md'  |  'lg'


interface inputInterface {
    size? : inputsize
    type : string,
    label? : string,
    placeholder : string
    ref : RefObject< HTMLInputElement>
}



const Input = (props : inputInterface) => {
  return (
  

       <input ref={props.ref} type={props.type} placeholder={props.placeholder} id={props.label}  className="rounded-lg px-4 py-2 text-black"/>
       

  )
}

export default Input

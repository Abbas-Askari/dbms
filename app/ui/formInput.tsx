import React from 'react'

function FormInput({placeholder, type = "text", className, name} : {name: string, placeholder: string, type: string, className: string}) {
  return (
    <div className=" relative group w-full ">
        <input id={name} type={type} name={name} placeholder=' ' className={`${className} w-full peer placeholder-shown:placeholder:static placeholder:absolute placeholder:top-1  placeholder:text-neutral-700 placeholder:text-xs bg-inherit p-3 pt-6 pb-2  placeholder-shown:pt-4 placeholder-shown:pb-4 border-[1px] border-neutral-400 focus:border-blue-500 outline-none rounded-lg text-sm transition-all`} />            
        <label htmlFor={name} className='  text-xs absolute  peer-placeholder-shown:text-sm peer-placeholder-shown:text-white inset-0 peer-placeholder-shown:pt-4 peer-placeholder-shown:pb-4  pt-2 pl-3  transition-all text-neutral-500 '>{placeholder}</label>
    </div>
  )
}

export default FormInput
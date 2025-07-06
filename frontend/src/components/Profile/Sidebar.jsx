import React from 'react'

const Sidebar = ({data}) => {
  return <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-cnter'>
    <img src= {data.avatar} className='h-[12vh]'/>
    <p className='mt-3 text-xl text-zinc-100 font-semibold'>
        {data.username}
    </p>
    <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>

    <p className='mt-1 text-normal text-zinc-300 '>
        {data.email}
    </p>
  </div>
  
}

export default Sidebar

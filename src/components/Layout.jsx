import React, { useContext } from 'react'
import { useData } from '../context/data';

export default function Layout({children}) {
  let data = useData();
  return (
    <div className="text-content min-h-dvh w-full bg-[url('../bg.jpg')] bg-center bg-cover bg-no-repeat">
      {children}
    </div>
  )
}

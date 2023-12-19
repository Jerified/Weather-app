"use client"
import React, { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { CiSearch } from 'react-icons/ci'

export default function Search({  handleClick }: any) {
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)
  const debouncedValue = useDebounce(value, 500)
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (debouncedValue == "") {
      setShow(false)
      return
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${debouncedValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.results.length == 0) {
          setShow(false)
          setCities([])
          return
        }

        setCities(data.results)
        setShow(true)
      })
  }, [debouncedValue])

  function handleClickEvent(city: any) {
    handleClick(city)
    setCity(city.name)
    setShow(false)
    setToggle(true)
  }

  return (
    <div className="">
    <div className="w-full flex md:gap-6 gap-3 items-center text-white my-5">
      {!toggle ? (
        <div className="w-full flex relative">
            <CiSearch className='absolute top-[0.65rem] left-3 text-3xl' />
            <input
              className="p-3 flex-1 pl-12 w- rounded-full bg-black shadow-lg focus:border-gray-200 outline-none shadow-gray text-gray-50 placeholder:text-gray-400"
              placeholder="Search for your preffered city"
              onInput={(e) => setValue(e.target.value)}
              value={value}
            />
        </div>
      ) : (
        <div onClick={()=>setToggle(false)} className="p-2 w-full rounded-md bg-white border border-gray-400 focus:border-gray-200 outline-none shadow shadow-gray-300 text-gray-50 placeholder:text-gray-400">
          {city}
        </div>
      )}
      <div className="w-[50%]">
        <button className="bg-green-600 px-3 py-4 rounded-full font-semibold tracking-wider text-[0.8rem] md:text-sm flex items-center gap-2">
            <FaLocationCrosshairs className='text-black text-xl' /> Current Location
        </button>
      </div>
    </div>
    <ul className="bg-gray-800 divide-y divide-gray-500 rounded-md ">
        {show &&
          cities.map((city: any) => (
            <li onClick={() => handleClickEvent(city)} className="p-3 hover:bg-black transition-all ease-in-out duration-100 text-gray-50" key={city.id}>
              {city.name}, {city.country}
            </li>
          ))}
      </ul>
    </div>
  )
}
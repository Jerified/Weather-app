"use client"
import React, { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { CiSearch } from 'react-icons/ci'
import DailyForecast from './DailyForecast'

interface InputProps {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void
  setLocation: React.Dispatch<React.SetStateAction<string>>
  handleClick: (event: React.KeyboardEvent<HTMLInputElement>) => void
  location: string
}
export default function Search({ handleClick, handleSearch, setLocation, location }: InputProps) {
  // const [value, setValue] = useState("")
  const [show, setShow] = useState(false)
  const debouncedValue = useDebounce(location, 500)
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")

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
        // console.log(cities)
        setShow(true)
      })
  }, [debouncedValue])

  function handleClickEvent(city: any) {
    // console.log(city)
    handleClick(city.name)
    setCity(city.name)
    setShow(false)
  }
  console.log(city)
  return (
    <div className="">
    <div className="w-full flex md:gap-6 gap-3 items-center text-white my-5">
        <div className="w-full flex relative">
            <CiSearch className='absolute top-[0.65rem] left-3 text-3xl' />
            <input
              className="p-3 flex-1 pl-12 w- rounded-full min-w-[100%,20rem] bg-gray-400 shadow-lg focus:border-gray-200 outline-none shadow-gray text-gray-50 placeholder:text-black"
              placeholder="Search for your preffered city"
              onKeyDown={handleSearch}
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
        </div>
    </div>
    <ul className="bg-gray-800 divide-y fixed divide-gray-500 rounded-md ">
        {show &&
          cities.map((city: any) => (
            <li onClick={() => handleClickEvent(city)} className="p-3 hover:bg-black transition-all ease-in-out duration-100 text-gray-50" key={city.id}>
              {city.name}, {city.country}
            </li>
          ))}
      </ul>

      <div className="fixed bottom-3  right-3">
        <button className="bg-green-600 hover:bg-green-700 text-white transition duration-300 px-3 py-4 rounded-full font-semibold tracking-wider text-[0.8rem] md:text-sm flex items-center gap-2">
            <FaLocationCrosshairs className='text-white text-xl' /> Current Location
        </button>
      </div>

      {/* <DailyForecast data={data}  city={city} /> */}
    </div>
  )
}
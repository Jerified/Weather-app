'use client'

import Image from 'next/image'
import Search from './components/Search'
import { useCallback, useState } from 'react'
import DailyForecast from './components/DailyForecast'

export default function Home() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(location)
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };

  const handleClick = useCallback((city: any) => {
    // const { latitude, longitude, timezone } = city
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${city}&days=7&aqi=yes&alerts=yes`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
        console.log(data?.location)
      })
  }, [])

  return (
   <main className=" min-h-screen px-4 relative ">
    <Search handleClick={handleClick} handleSearch={handleSearch} setLocation={setLocation} location={location} />
    <DailyForecast data={data} />
   </main>
  )
}

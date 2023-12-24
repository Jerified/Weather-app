'use client'

import Image from 'next/image'
import Search from './components/Search'
import { useCallback, useState } from 'react'
import DailyForecast from './components/DailyForecast'
import WeekForecast from './components/WeekForecast'
import HourForecast from './components/HourForecast'

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
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${city}&days=7&aqi=yes&alerts=yes`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
        console.log(data?.forecast)
      })
  }, [])

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Weather App</h2>
        <p className="text-xl">Enter a city name to get the weather forecast</p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">City not found</h2>
        <p className="text-xl">Please enter a valid city name</p>
      </div>
    );
  } else {
    content = (
      <>
          <DailyForecast data={data} />
          <div className="flex flex-col lg:flex-row gap-8  mt-10">
            <WeekForecast data={data} />
            <HourForecast data={data} />
          </div>
      </>
    );
  }


  return (
    <>
     <main className=" min-h-screen px-4 max-w-5xl mx-auto relative overflow-y-hidden">
          <Search handleClick={handleClick} handleSearch={handleSearch} setLocation={setLocation} location={location} />
          {content}
          
        </main>
    </>
  )
}

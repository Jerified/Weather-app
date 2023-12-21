"use client"
import React, { useEffect, useState } from "react"
import Moment from 'react-moment';

export default function DailyForecast({ data, city }: any) {
    console.log(data)
    const time = data[0]?.time
  return (
    <div className="pt-5 lg:flex lg:flex-row gap-16">
        <div className='text-white max-w-[60%] w-full lg:max-w-[40%] flex flex-col pt-10  pb-7 items-center justify-center shadow-[10px_10px_20px_5px_black] mx-auto  lg:mx-0  rounded-xl'>
          <h1  className='text-xl font-semibold pb-6  pt-2'>{city}</h1>
          {/* {city} */}
          {/* <Moment unix format="dddd, DD MMM">{timestamp}</Moment> */}
          <p className='text-6xl font-bold'><Moment format="HH:mm">{time}</Moment></p> 
          <p className='text-sm'><Moment format="dddd, DD MMM">{time}</Moment></p> 
          {/* <p>{data[0]?.temperature_2m}</p>   */}
        </div>
        <div className='text-white max-w-[80%] mt-12 lg:max-w-[60%] w-full flex flex-col pt-10  pb-7 items-center justify-center shadow-[10px_10px_20px_5px_black] mx-auto rounded-xl'>

        </div>
    </div>
  )
}
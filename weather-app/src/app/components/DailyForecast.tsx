/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react"
import moment from 'moment';
import Image from 'next/image'


interface CurrentProps {
  data: {
    current?: {
      last_updated_epoch: number,
      last_updated: string,
      condition: {
        icon: string;
        text: string;
      };
      temp_c: number;
      humidity: number,
      feelslike_c: number,
      wind_mph: number,
      pressure_mb: number,
      uv: number
    };
    location?: {
      name: string;
      region: string;
      country: string,
      localtime_epoch: number,
      localtime: string
    };
  };
}

export default function DailyForecast({ data }: CurrentProps) {
  // console.log(data)
  const weatherIcon = data.current ? data.current.condition.icon : null
  const time = data?.location?.localtime
  // const sunrise = data[0]?.sunrise
  // const sunset = data[0]?.sunset
  return (
    <div className="pt-5 lg:flex lg:flex-row gap-16">
      <div className='text-white max-w-[60%] w-full lg:max-w-[30%] flex flex-col pt-10  pb-7 items-center justify-center shadow-[10px_10px_20px_5px_black] mx-auto h-[15rem] lg:mx-0  rounded-xl'>
        <h1 className='text-2xl font-semibold pb-6 flex flex-wrap justify-center pt-2'>{data.location?.name}, <span className="text-slate-600"> {data.location?.country}</span></h1>
        <p className='text-6xl font-bold'>{moment(time).format("HH:mm")}</p>
        <p className='text-sm'>{moment(time).format("dddd, DD MMM")}</p>
        {/* <p>{data[0]?.temperature_2m}</p>   */}
      </div>
      <div className='text-white max-w-[100%] mt-12 lg:mt-0 lg:max-w-[70%] w-full flex items-cente justify-between  p-4 shadow-[10px_10px_20px_5px_black] mx-auto rounded-xl h-[15rem]'>
        <div className="">
          <p className='text-4xl lg:text-5xl font-bold'>{data?.current?.temp_c}<span className="text-slate-600">°C</span></p>
          <p className='text-xs'>Feels like: <span className='text-sm font-semibold'>{ data?.current?.feelslike_c}°C</span></p>
          <div>
            <div className='flex gap-2 pt-5 text-[0.85rem]'>
              <Image src='/sunrise.png' width={40} height={40} alt='' className='object-contain' />
              <div >
                <h3 className='semibold'>Sunrise</h3>
                <p> {moment().format("HH:mm")}</p>
              </div>
            </div>
            <div className='flex gap-2 pt-5 text-[0.85rem]'>
              <Image src='/sunset.png' width={40} height={40} alt='' className='object-contain' />
              <div >
                <h3 className='semibold'>Sunrise</h3>
                <p> {moment().format("HH:mm")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-">
            {weatherIcon && (
              <div>
                <img className="w-[150px] object-cover" src={weatherIcon} alt="Weather Icon" />
              </div>
            )}
            <p className="font-semibold text-2xl">{data?.current?.condition.text}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              <img className="w-[60px] object-cover" src='/water.png' alt="humidity Icon" />
              <p className="">{data.current?.humidity}%</p>
              <p className="text-xs">Humidity</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[60px] object-cover" src='/windy.png' alt="wind Icon" />
              <p className="">{data.current?.wind_mph}km/h</p>
              <p className="text-xs">Wind Speed</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[60px] object-cover" src='/weight-scale.png' alt="humidity Icon" />
              <p className="">{data.current?.pressure_mb}hPa</p>
              <p className="text-xs">Pressure</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[60px] object-cover" src='/radiation.png' alt="humidity Icon" />
              <p className="">{data.current?.uv}</p>
              <p className="text-xs">uv</p>
            </div>
          </div>
      </div>
    </div>
  )
}
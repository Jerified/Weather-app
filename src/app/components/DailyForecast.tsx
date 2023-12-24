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
    forecast?: {
      forecastday: {
        astro: {
          sunrise: string;
          sunset: string;
        };
      }[];
    };
  };
}

export default function DailyForecast({ data }: CurrentProps) {
  if (!data.forecast) {
    return null;
  }
  console.log(data)
  const weatherIcon = data.current ? data.current.condition.icon : null
  const time = data?.location?.localtime
  return (
    <div className="pt-5 lg:flex lg:flex-row gap-16">
      <div className='text-white w-[80%] sm:max-w-[60%] lg:max-w-[35%] flex flex-col pt-10  pb-7 items-center justify-center shadow-[10px_10px_20px_5px_black] mx-auto h-[15rem] lg:mx-0  rounded-xl'>
        <h1 className='text-2xl font-semibold pb-6 flex flex-wrap justify-center pt-2'>{data.location?.name}, <span className="text-slate-600 indent-1"> {data.location?.country}</span></h1>
        <p className='text-6xl font-bold'>{moment(time).format("HH:mm")}</p>
        <p className='text-sm'>{moment(time).format("dddd, DD MMM")}</p>
      </div>
      <div className='text-white max-w-[100%] mt-12 lg:mt-0 lg:max-w-[65%] w-full flex justify-between gap-3  p-4 shadow-[10px_10px_20px_5px_black] mx-auto rounded-xl h-[15rem]'>
        <div className="">
          <p className='text-4xl lg:text-5xl font-bold'>{data?.current?.temp_c}<span className="text-slate-600">°C</span></p>
          <p className='text-xs whitespace-nowrap'>Feels like: <span className='text-sm font-semibold'>{ data?.current?.feelslike_c}°C</span></p>
          <div>
            <div className='flex gap-2 pt-5 text-[0.85rem]'>
              <Image src='/sunrise.png' width={40} height={40} alt='' className='object-contain' />
              <div >
                <h3 className='semibold'>Sunrise</h3>
                <p className="whitespace-nowrap"> {data.forecast?.forecastday[0]?.astro.sunrise}</p>
              </div>
            </div>
            <div className='flex gap-1 sm:gap-2 pt-3 sm:pt-5 text-[0.85rem]'>
              <Image src='/sunset.png' width={40} height={40} alt='' className='object-contain' />
              <div >
                <h3 className='semibold'>Sunrise</h3>
                <p className="whitespace-nowrap"> {data.forecast?.forecastday[0]?.astro.sunset}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-">
            {weatherIcon && (
              <div>
                <img className="w-[80px] sm:w-[150px] object-cover" src={weatherIcon} alt="Weather Icon" />
              </div>
            )}
            <p className="font-semibold text-lg sm:text-2xl">{data?.current?.condition.text}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="flex flex-col items-center justify-center">
              <img className="w-[40px] sm:w-[60px] object-cover" src='/water.png' alt="humidity Icon" />
              <p className="text-xs sm:text-sm font-semibold">{data.current?.humidity}%</p>
              <p className="text-[0.7rem] whitespace-nowrap">Humidity</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[40px] sm:w-[60px] object-cover" src='/windy.png' alt="wind Icon" />
              <p className="text-xs sm:text-sm font-semibold">{data.current?.wind_mph}km/h</p>
              <p className="text-[0.7rem] whitespace-nowrap">Wind Speed</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[40px] sm:w-[60px] object-cover" src='/weight-scale.png' alt="humidity Icon" />
              <p className="text-xs sm:text-sm font-semibold">{data.current?.pressure_mb}hPa</p>
              <p className="text-[0.7rem] whitespace-nowrap">Pressure</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[40px] sm:w-[60px] object-cover" src='/radiation.png' alt="humidity Icon" />
              <p className="text-xs sm:text-sm font-semibold">{data.current?.uv}</p>
              <p className="text-[0.7rem] whitespace-nowrap">uv</p>
            </div>
          </div>
      </div>
    </div>
  )
}
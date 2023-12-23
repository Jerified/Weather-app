/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import React from 'react'

interface hourForecast {
    time: string,
    condition: {
        icon: string,
        temp_c: number,
        wind_dir: string,
        wind_mph: number
    }
}

interface DayForecast {
    date: string;
    day: {
      condition: {
        icon: string;
        text: string;
      };
      maxtemp_f: number;
      mintemp_c: number;
    };
    hour: hourForecast[]
  }
  
  interface WeekForecastProps {
    data: {
      forecast?: {
        forecastday: DayForecast[];
      };
    };
  }

const WeekForecast = ( {data}: WeekForecastProps ) => {
    if (!data.forecast) {
        return null;
      }
  return (
    <div className='text-white sm:w-[60%] lg:w-[30%] h-[16rem] items-center justify-center shadow-[10px_10px_20px_5px_black] mx-auto lg:mx-0 p-3  rounded-xl'>
        <h1 className="text-center font-semibold text-2xl">3 Days Forecast:</h1>
        {data.forecast.forecastday.map((day, index) => (
            <div className="flex items-center gap-2 justify-between" key={index}>
                 <img
            className="w-50 h-50"
            src={day.day.condition.icon}
            alt={day.day.condition.text}
            aria-label={day.day.condition.text}
          />
          <p className="">{day.day.mintemp_c}°C</p>
          <p className="">{moment(day.date).format("dddd, DD MMM")}</p>
            </div>
        ))}
    </div>
  )
}

export default WeekForecast
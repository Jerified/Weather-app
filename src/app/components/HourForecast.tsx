/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import React from 'react'

interface hourForecast {
    time: string,
    condition: {
        icon: string,
        text: string
    },
    temp_c: number,
    wind_dir: string,
    wind_mph: number
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

const HourForecast = ({ data }: WeekForecastProps) => {

    const regex = /^(00|15|18|21|12):00$/
    let filtered: hourForecast[] = []

    // const hourData = () => {
    const filteredData = data?.forecast?.forecastday[0]?.hour.map((filteredHour) => {
        const filt = [filteredHour]
        console.log(filt)
        for (let hour of filt) {
            let hourString = moment(hour.time).format('HH:mm');
            if (regex.test(hourString)) {
                filtered.push(hour);
            }
        }
        console.log(filtered)
    })

    if (!data.forecast) {
        return null;
    }
    return (
        <div className='text-white w-[100%] lg:w-[70%] h-[16rem] items-center justify-center shadow-[10px_10px_20px_5px_black] lg:px-12 px-6  p-3  rounded-2xl '>
            <h1 className="text-center font-semibold text-2xl">Hourly Forecast:</h1>
            <div className="flex gap-2 sm:justify-between">
                {filtered.map((hour, index) => (
                    <div className="flex flex-col items-center justify-center w-[20%] my-4 bg-black/70 rounded-[2rem] py-2" key={index}>
                        <p className="font-semibold">{moment(hour.time).format("HH:mm")}</p>
                        <img
                            className="w-50 h-50"
                            src={hour.condition.icon}
                            alt={hour.condition.text}
                            aria-label={hour.condition.text}
                        />
                        <p className="text-[0.8rem] font-semibold">{hour.temp_c}°C</p>
                        <p className="text-[0.6rem] font-semibold">{hour.wind_mph}km/h</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HourForecast
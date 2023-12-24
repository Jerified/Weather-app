'use client'

import React, { useEffect, useState } from 'react'
import DailyForecast from '../components/DailyForecast'
import WeekForecast from '../components/WeekForecast'
import HourForecast from '../components/HourForecast'

const Location = () => {
    const [lat, setLat] = useState<any>([])
    const [long, setLong] = useState<any>([])
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords
                    console.log(latitude, longitude);

                    setLat(latitude)
                    setLong(longitude)
                    console.log(lat, long);
                    (error: any) => {
                        setError(error.message)
                    }
                })
            } else {
                setError('Geolocation is not supported by your browser')
            }

            await fetch(`https://api.weatherapi.com/v1/forecast.json?key=538023bd3c43455084733202231905&q=${lat},${long}&days=7&aqi=yes&alerts=yes`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);

                })
        }
        fetchData()
    }, [lat, long])

    return (
        <div>
            {data ? (
                <div className="min-h-screen px-4 max-w-5xl mx-auto relative overflow-y-hidden">
                    
                    <DailyForecast data={data} />
                    <div className="flex flex-col lg:flex-row gap-8  mt-10">
                        <WeekForecast data={data} />
                        <HourForecast data={data} />
                    </div>
                </div>) : (
                <p>Loading</p>
            )}
        </div>
    )
}

export default Location
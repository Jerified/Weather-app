import React, { useEffect, useState } from 'react'

const Location = () => {
    const [location, setLocation] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                console.log(latitude, longitude);
                
                // setLocation({latitude, longitude})
            })
        }
    })
  return (
    <div>location</div>
  )
}

export default Location
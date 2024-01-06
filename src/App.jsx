import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './assets/Css/App.css'
import axios from 'axios'
import Spinner from './components/Spinner';


function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [ backgroundClass, setBackgroundClass ] = useState('')

  

  
  const success = pos => {

    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
    
  }

  const error = (err) => {
    console.log(err);
    setIsLoading(false)
  }


 
        // weather

    useEffect(() => {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    useEffect(() => {
      if (weather && weather.weather[0]) {
        const weatherMain = weather.weather[0].main.toLowerCase();

        if (weatherMain.includes('clear')) {
          setBackgroundClass('clear-sky')
        } else if (weatherMain.includes('clouds')){
           setBackgroundClass('clouds');
        } else if ( weatherMain.includes('rain')){
          setBackgroundClass('rain')
        } else if ( weatherMain.includes('snow')){
          setBackgroundClass('snow')
        } else if ( weatherMain.includes('mist')){
          setBackgroundClass('mist')
        }
         else {
          setBackgroundClass('')
        }
      }
    }, [weather])


    const handleCity = (searchCity) => {
      const API_KEY = 'fb6245cc236a4e961b37f7450fd1835f'
      const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`
      setIsLoading(true)
      axios.get(searchUrl)
      .then((res) => {
        setWeather(res.data);
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        };
        setTemp(obj)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000);
      })
    }
    
  
    useEffect(() => {
      if (coords) {
          const API_KEY = 'fb6245cc236a4e961b37f7450fd1835f'
          const { lat, lon } = coords;
  
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es`
          
          setIsLoading(true)
          axios.get(url)
          .then(res => {
            setWeather(res.data)
  
            const obj = {
              celsius: (res.data.main.temp - 273.15).toFixed(1),
              fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
            }
            setTemp(obj)
            
          })
          .catch(err => console.log(err))
          .finally(() => {
            setTimeout(() => {
              setIsLoading(false)
            }, 2000);
          })
          
      }
    }, [coords])

    console.log(weather)


  
  
  



  return (
    <div className={`app ${backgroundClass}`}>
      <div className={`${weather?.weather[0].main.toLowerCase()}`}>
        {
        isLoading ? (
        <Spinner/>
         ) : (
         <WeatherCard 
        weather={weather}
        temp={temp}
        loadingData={isLoading}
        onSearch={handleCity}
        /> 
          
        )}

        </div> 
    </div>
  )
}

export default App

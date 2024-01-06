import { useEffect, useState } from 'react'
import '../assets/Css/WeatherCard.css'




const WeatherCard = ({ weather, temp, onSearch }) => {

    const [changeTemp, setChangeTemp] = useState(true)
    const [ search, setSearch ] = useState('')
   
    const handleChangeTemp = () => {
        setChangeTemp(state => !state)
      }

      const handleCityChange = (event) => {
        setSearch(event.target.value);
      }
      
      const handleCitySubmit = (event) => {
        event.preventDefault()
        onSearch(search)

      }



    

  return (

    
       <article className="weather">
          <h1 className="weather__title">Weather App</h1>
          <h2 className="weather__subtitle">{weather?.name}, {weather?.sys.country}</h2>
          <section className="weather__body">
              <header className="weather__img__container">
                <img className="weather__img" src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Nubes limpias" />
              </header>
              <article className="weather__info">
                <h3 className="weather__description">"<b>{weather?.weather[0].description}</b>"</h3>
                <ul className="weather__list">
                  <li className="weather__item">
                    <span className="weather__label">Wind Speed</span>
                    <span className="weather__value">{weather?.wind.speed} m/s</span>
                  </li>
                  <li className="weather__item">
                    <span className="weather__label">Humidity</span>
                    <span className="weather__value">{weather?.main.humidity} %</span>
                  </li>
                  <li className="weather__item">
                    <span className="weather__label">Clouds</span>
                    <span className="weather__value">{weather?.clouds.all} %</span>
                  </li>
                  <li className="weather__item">
                    <span className="weather__label">Pressure</span>
                    <span className="weather__value">{weather?.main.pressure} hPa</span>
                  </li>
                </ul>
              </article>
          </section>
          <footer className="weather__footer">
              <div className="weather__temp">
                  <h2>{
                    changeTemp ?
                      `${temp?.celsius} °C`
                      : `${temp?.fahrenheit} °F`
                  }
                  </h2>
                  <button className='weather__btn' onClick={handleChangeTemp}>Change Temperature</button>
              </div> 
              
            <form onSubmit={handleCitySubmit} className='search-form'> 
                <input type="text" value={search} onChange={handleCityChange} required/>
                <label className='lbl-search'>
                  <span className='text-city'>Search City</span>
                </label>
              <button type='submit' className='btn-search'>Search</button>
            </form>
        
          </footer>
      
        
        </article> 
    
    
  
  
  
  )
}

export default WeatherCard
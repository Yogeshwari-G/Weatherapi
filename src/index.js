import React, { useState } from "react";
import "./style.css";
import backgroundImage from "weatherbackground.jpg";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const apiKey = "2fcf5e0e6ffe83e7a78698aacffcb9fd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
      } else {
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="title">Weather App</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="check-button" onClick={fetchWeather}>Check</button>
      </div>
      {weather && (
        <div className="weather-info">
          <img src={weather.icon} alt="weather icon" className="weather-icon" />
          <p className="weather-text">Weather: {weather.description}</p>
          <p className="temperature">Temperature: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

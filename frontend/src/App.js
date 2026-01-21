import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [info, setInfo] = useState(null);
  const [weather, setWeather] = useState([]);
  const [geography, setGeography] = useState(null);
  const [wildlife, setWildlife] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [infoRes, weatherRes, geoRes, wildlifeRes] = await Promise.all([
          fetch(`${API_BASE}/api/info`),
          fetch(`${API_BASE}/api/weather`),
          fetch(`${API_BASE}/api/geography`),
          fetch(`${API_BASE}/api/wildlife`)
        ]);

        const [infoData, weatherData, geoData, wildlifeData] = await Promise.all([
          infoRes.json(),
          weatherRes.json(),
          geoRes.json(),
          wildlifeRes.json()
        ]);

        setInfo(infoData);
        setWeather(weatherData);
        setGeography(geoData);
        setWildlife(wildlifeData);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Greenland data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>🇬🇱 Greenland Simulation</h1>
          <p className="subtitle">Explore the Arctic Nation of Kalaallit Nunaat</p>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          📍 Overview
        </button>
        <button 
          className={activeTab === 'weather' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('weather')}
        >
          🌡️ Weather
        </button>
        <button 
          className={activeTab === 'geography' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('geography')}
        >
          🏔️ Geography
        </button>
        <button 
          className={activeTab === 'wildlife' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('wildlife')}
        >
          🐻‍❄️ Wildlife
        </button>
      </nav>

      <main className="content">
        {activeTab === 'overview' && info && (
          <div className="section overview">
            <h2>Country Overview</h2>
            <div className="cards">
              <div className="card">
                <h3>Official Name</h3>
                <p className="highlight">{info.name}</p>
              </div>
              <div className="card">
                <h3>Capital</h3>
                <p className="highlight">{info.capital}</p>
              </div>
              <div className="card">
                <h3>Population</h3>
                <p className="highlight">{info.population.toLocaleString()}</p>
              </div>
              <div className="card">
                <h3>Area</h3>
                <p className="highlight">{info.area_km2.toLocaleString()} km²</p>
              </div>
              <div className="card">
                <h3>Languages</h3>
                <p className="highlight">{info.languages.join(', ')}</p>
              </div>
              <div className="card">
                <h3>Currency</h3>
                <p className="highlight">{info.currency}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="section weather">
            <h2>Current Weather Conditions</h2>
            <div className="cards weather-cards">
              {weather.map((w, idx) => (
                <div className="card weather-card" key={idx}>
                  <h3>📍 {w.location}</h3>
                  <div className="temperature">{w.temperature_celsius}°C</div>
                  <div className="condition">{w.condition}</div>
                  <div className="wind">💨 Wind: {w.wind_speed_kmh} km/h</div>
                  <p className="description">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'geography' && geography && (
          <div className="section geography">
            <h2>Geographic Features</h2>
            <div className="cards">
              <div className="card large">
                <h3>Ice Sheet Coverage</h3>
                <div className="stat-large">{geography.ice_sheet_coverage_percent}%</div>
                <p>of the country is covered by ice</p>
              </div>
              <div className="card large">
                <h3>Coastline</h3>
                <div className="stat-large">{geography.coastline_length_km.toLocaleString()} km</div>
                <p>One of the world's longest coastlines</p>
              </div>
              <div className="card">
                <h3>Highest Peak</h3>
                <p className="highlight">{geography.highest_peak}</p>
                <p>{geography.highest_peak_elevation_m.toLocaleString()} meters</p>
              </div>
              <div className="card">
                <h3>Major Cities</h3>
                <ul className="city-list">
                  {geography.major_cities.map((city, idx) => (
                    <li key={idx}>{city}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wildlife' && wildlife && (
          <div className="section wildlife">
            <h2>Arctic Wildlife</h2>
            <div className="cards wildlife-cards">
              {wildlife.species.map((animal, idx) => (
                <div className="card wildlife-card" key={idx}>
                  <h3>{animal.name}</h3>
                  <p className="scientific-name">{animal.scientific_name}</p>
                  <div className="wildlife-info">
                    <div className="info-row">
                      <span className="label">Population:</span>
                      <span className="value">{animal.population_estimate}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Status:</span>
                      <span className={`status ${animal.status.toLowerCase().replace(' ', '-')}`}>
                        {animal.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🇬🇱 Greenland Simulation API - Built with Rust & React</p>
      </footer>
    </div>
  );
}

export default App;

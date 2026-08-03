import {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Details from "./components/Details.jsx";
import Forecast from "./components/Forecast.jsx";

function App() {
    const [currentWeather, setCurrentWeather] = useState({});
    const [currentForecast, setCurrentForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [city, setCity] = useState('Москва');
    const [lat, setLat] = useState(55.7558);
    const [lon, setLon] = useState(37.6173);

    const CodeToWeather = (code) => {
        if (code === 0)
            return 'Ясно';
        if (code === 1 || code === 2)
            return 'Облачно';
        if (code === 3)
            return 'Пасмурно';
        if ([45, 48].includes(code))
            return 'Туман';
        if ([51, 53, 55, 61, 63, 65].includes(code))
            return 'Дождь';
        if ([71, 73, 75, 77, 85, 86].includes(code))
            return 'Снег';
        if ([95, 96, 99].includes(code))
            return 'Гроза';
        return 'Кошмар какойто видимо';
    }
    function mapWeather(data) {
        const mapForecast = data.daily.time.map((date, index) => ({
            date: date,
            max: Math.round(data.daily['temperature_2m_max'][index]),
            min: Math.round(data.daily['temperature_2m_min'][index]),
            code: data.daily['weather_code'][index],
            humidity: Math.round(data.daily['relative_humidity_2m_mean'][index]),
        }))
        setCurrentForecast(mapForecast)
        return {
            temp: Math.round(data.current['temperature_2m']),
            long: data.longitude,
            lat: data.latitude,
            text: CodeToWeather(data.current['weather_code']),
            vlaga: Math.round(data.current['relative_humidity_2m']),
            wind: data.current['wind_speed_10m'],
            pressure: Math.round(data.current['surface_pressure'] * 0.76),
            feels: Math.round(data.current['apparent_temperature'])
        };
    }

    async function onSearch(city="Москва") {
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`)
            const data = await res.json();
            setCity(city);
            const place = data.results[0];
            setLat(place.latitude);
            setLon(place.longitude);
            setCity(place.name);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        const CACHE_KEY = `weather_${lat}_${lon}`;
        const CACHE_MINUTES = 30;

        async function fetchWeather() {
            try {
                setLoading(true);
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const {data, time} = JSON.parse(cached);
                    const age = Date.now() - time;
                    const maxAge = CACHE_MINUTES * 60 * 1000;

                    if (age < maxAge) {
                        console.log('Взял из кэша');
                        setCurrentWeather(mapWeather(data))
                        return;
                    }
                }
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,weather_code,wind_speed_10m' +
                    '&daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean' +
                    '&timezone=auto&forecast_days=7'
                );
                const data = await res.json();
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data,
                    time: Date.now()
                }));
                setCurrentWeather(mapWeather(data))
                return;
            } catch (er) {
                setError(er.message);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [lat, lon])

    if (loading) return <div className="p-10 text-white">Загружаем погоду...</div>;
    if (error) return <div className="p-10 text-red-300">Ошибка: {error}</div>;

    return (
        <div className="bg-gradient-to-b from-blue-400 via-cyan-600 to-blue-500 text-white min-h-screen overflow-hidden">
            <Header onSearch={onSearch}/>
            <CurrentWeather
                temp={currentWeather.temp}
                coords={`${currentWeather.lat}, ${currentWeather.long}`}
                text={currentWeather.text}
                city={city}
            />
            <Details
                vlaga={currentWeather.vlaga}
                wind={currentWeather.wind}
                pressure={currentWeather.pressure}
                feels={currentWeather.feels}
            />
            <Forecast days={currentForecast}/>
        </div>
    )
}

export default App

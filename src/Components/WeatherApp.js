import React, { useEffect, useState } from "react";
import './Css/Style.css'
import rainyBackground from './imgs/rain-img.jpg';
import sunnyBackground from './imgs/sunny-img.jpg';
import coldBackground from './imgs/cold-img.jpg';

const WeatherApp = () => {

    const [city, setCity] = useState();
    const [search, setSearch] = useState("Bangalore");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchApi = async () => {
            const Url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=7aabdc85ae0b29ace1871013fccae01a`;
            const response = await fetch(Url);
            const respJson = await response.json();
            setCity(respJson.main);
        }
        fetchApi();
    }, [search]);

    useEffect(() => {
        if (city) {
            if (city.temp >= 25) {
                document.body.style.backgroundImage = `url(${sunnyBackground})`;
            } else if (city.temp <= 18) {
                document.body.style.backgroundImage = `url(${coldBackground})`;
            } else {
                document.body.style.backgroundImage = `url(${rainyBackground})`;
            }
        }
    }, [city]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" className="inputField" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>

                {!city ? (<p className="errorMsg">No Data Found</p>) : (

                    <div>
                        <div className="info">
                            <h2 className="location">
                                <span> <i className="fa-solid fa-street-view"></i> {search}</span>
                            </h2>

                            <div className="temp"> {city.temp}°C </div>

                            <h3 className="tempmin_max">Min: {city.temp_min}°C | Max: {city.temp_max}°C </h3>

                            <div className="time-date">
                                <h3 className="time">{currentTime.toLocaleTimeString()}</h3>
                                <h3 className="date">{currentTime.toLocaleDateString()}</h3>
                            </div>

                            <div className="forcast">
                                </div>

                        </div>

                        <div className="wave -one"></div>
                        <div className="wave -two"></div>
                        <div className="wave -three"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WeatherApp;

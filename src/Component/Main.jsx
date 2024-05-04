import React, {useEffect, useState} from 'react';

const Main = () => {
    let [city, setCity] = useState("");
    let [data, setData] = useState([]);
    let [search, setSearch] = useState(false);

    useEffect(() => {
        let fetchData = async () => {
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b868db9e0d6e243fbd1ffe0d4dff998&units=metric`);
            let j_data = await res.json();
            setData([j_data]);
            console.log([j_data]);
        }
        if (search) {
                fetchData();
            }
            setSearch(false);
        },[search]);
    
        let handleSubmit = e => {
        e.preventDefault();
        console.log("submitted");
                setSearch(true);
            };
        
          return (
    <section className='main-block'>
        <article>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Search Your City...'
                onChange={e => {
                    setCity(e.target.value);
                }}
                ></input>
                <button>🔍</button>
            </form>

            <article>
                {data.map(value => {
                        return (
                                <div className='card' key={Math.random}>
                        <h1>{value.name} ( {value.sys.country} )</h1>
                        <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}/>
                        <br/>
                        <p className='description'>{value.weather[0].description}</p>
                        <br/>

                        <p className='temp'> 🌡 : {value.main.temp} <sup>o</sup>C</p>

                        <p className='hum'>humidity : {value.main.humidity}%</p>

                        <p className='lon'>Lon : {value.coord.lon} | Lat : {value.coord.lat} </p>
                        <p className='mtemp'>Min Temp : {value.main.temp_min}<sup>o</sup>C <br/>
                        Max Temp : {value.main.temp_max}<sup>o</sup>C
                        </p>

                        <p className='wind'>💨 {value.wind.speed}</p>
                        
                        <p className='vis'>visibility : {value.visibility} m</p>
                        
                        <a className='ownerinfo' href='https://github.com/abhishekth0203'>Created By Mr. Abhishek</a>
                        {/* <p className='ownerinfo'>Created By Mr. Abhishek</p> */}
                        </div>
                    );
                })}
            </article>
        </article>
    </section>
  )
}

export default Main;
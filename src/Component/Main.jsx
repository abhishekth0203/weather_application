import React, { useEffect, useState } from 'react'

const Main = () => {
let [city, setCity] = useState("");
let [data, setData] = useState([]);
let [search, setSearch] = useState(false);

useEffect(() => {
    let fetchData = async () => {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b868db9e0d6e243fbd1ffe0d4dff998&units=metric`);
        // let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b868db9e0d6e243fbd1ffe0d4dff998&units=metric`);
        
        let j_data = await res.json();
        setData([j_data]);
        // console.log([j_data]);
    };
    if (search) {
        fetchData();
    }
    setSearch(false);
}, [search]);


let handleSubmit = e => {
    setSearch(true);
};

  return (
    <section className='main-block'>
        <article>
            <form onSubmit={handleSubmit}>
            <input
             type="text"
            placeholder='Search City'
            onChange={e => {
                setCity(e.target.value);
            }}
            ></input>

            <button>🔍</button>
            </form>


            <article>
                {data.map(value => {
                    return (
                        <div className='card' key={Math.random()}>
                        <h1>{value.name}</h1>
                        <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                            width="100px"
                        />
                        <br/>

                        <p>{value.weather[0].description}</p>
                        <br/>

                        <p>Lon : { value.coord.lon} | Lat : {value.coord.lat}</p>

                        <p>Temp : {value.main.temp} <sup>o</sup>C</p>

                        <p>Humidity : {value.main.humidity}</p>

                        <p>Min Temp : {value.main_min} <br/>

                        Max Temp : { value.main.temp_max}
                        </p>

                        </div>
                    );
                })}
            </article>
        </article>
    </section>
  );
}

export default Main


//   0b868db9e0d6e243fbd1ffe0d4dff998



//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0b868db9e0d6e243fbd1ffe0d4dff998
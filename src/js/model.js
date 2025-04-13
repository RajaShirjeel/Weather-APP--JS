import { API_URL, API_KEY, GEO_API_KEY } from "./config";

export const state = {
    city: '',
    country: '',
    weather: [],
    day: {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    },
}

export const getWeeklyWeather = async function() {
    try {
        const res = await fetch(`${API_URL}/forecast?q=${state.city}&units=metric&appid=${API_KEY}`);
        if (!res.ok) throw new Error(`Unable to get weather info for you location(${state.city}) please check and try again!`);

        const data = await res.json();
        state.country = data.city.country;
        const weatherList = data.list;
        const weatherArr = [];


        let prevDay = '';        
        for (let i = 0; i < weatherList.length; i++){
            const weekDay = new Date(weatherList[i].dt_txt.split(' ')[0]).getDay();
            const day = state.day[weekDay];
            if (prevDay === day) {}
            else {
                const newObj = {
                    weather: `${weatherList[i].weather[0].main !== 'Clear'? weatherList[i].weather[0].main : 'Sunny'}`,
                    day: day,
                    temp: Math.trunc(weatherList[i].main.temp),
                }
                weatherArr.push(newObj);
            }
            prevDay = day;
        }
        state.weather = weatherArr;

    }
    catch (err){
        throw err;
    }

}

// get's the city name from the user's location and stores it in the state
export const getCurrentLocation = async function() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${GEO_API_KEY}`);
                if (!res.ok)  throw new Error('Unable to get your location!')

                const data = await res.json();
                state.city = data.results[0].city;
                resolve();
            }
            catch(e){
                reject(e);
            }

        }, reject)
    })
}

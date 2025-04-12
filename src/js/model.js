import { API_URL, API_KEY } from "./config";

export const state = {
    city: '',
    country: '',
    weather: []
}

export const getWeeklyWeather = async function() {
    try {
        const res = await fetch(`${API_URL}/forecast?q=${state.city}&units=metric&appid=${API_KEY}`);
        if (!res.ok) throw new Error(`Unable to get weather info for you location(${state.city}) please check and try again!`);

        const data = await res.json();
        const weatherList = data.list;

        for (let i = 0; i < 7; i++){
            const newObj = {
                weather: weatherList[i].weather[0].main,
                day: i+1
            }
            state.weather.push(newObj);
        }

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

                const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=871f201fcc3d431c8ed2cd2428e81abc`);
                if (!res.ok)  throw new Error('Unable to get your location')

                const data = await res.json();
                state.city = data.results[0].city;
                state.country = data.results[0].country;
                resolve();
            }
            catch(e){
                reject(e)
            }

        }, reject)
    })
}

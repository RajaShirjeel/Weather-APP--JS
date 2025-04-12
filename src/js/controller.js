import { state, getCurrentWeather, getWeeklyWeather, getCurrentLocation } from "./model";

const getWeatherController = async function() {
    try {
        await getCurrentLocation();
        await getWeeklyWeather();
        console.log(state)
    }
    catch(e) {
        console.log(e)
    }
}

const init = function(){
    getWeatherController()
}

init();
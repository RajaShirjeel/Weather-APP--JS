import { state, getCurrentWeather, getWeeklyWeather, getCurrentLocation } from "./model";
import WeatherView from "./views/WeatherView";

const showWeatherController = async function() {
    try {
        await getCurrentLocation();
        await getWeeklyWeather();
        WeatherView.__data = state;
        WeatherView.render()

    }
    catch(e) {
        console.log(e)
    }
}

const init = function(){
    showWeatherController();
}

init();
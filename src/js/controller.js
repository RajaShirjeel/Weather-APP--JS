import { state, getWeeklyWeather, getCurrentLocation } from "./model";
import WeatherView from "./views/WeatherView";

const showWeatherController = async function() {
    try {
        WeatherView.renderLoader();
        await getCurrentLocation();
        await getWeeklyWeather();
        WeatherView.render(state);

    }
    catch(err) {
        WeatherView.renderError(err.message)
    }
}

const cityFormController = async function(cityName) {
    try {
        WeatherView.renderLoader();
        state.city = cityName;
        await getWeeklyWeather();
        WeatherView.render(state);
    }
    catch (err) {
        WeatherView.renderError(err.message)
    }

}

const init = function(){
    showWeatherController();
    WeatherView.addFormHandler(cityFormController);
}

init();
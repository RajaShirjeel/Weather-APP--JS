import Sunny from 'url:../../images/Sunny.png';
import Rain from 'url:../../images/Rain.png';
import Clouds from 'url:../../images/Clouds.png';

const weatherImages = {
  Sunny: Sunny,
  Rain: Rain,
  Clouds: Clouds
};

class WeatherView {
    __parentEl = document.querySelector('.weather-card--container');
    __data;

    render() {
        let totalMarkup = `
            <div class="weather-card--content">
                <div class="heading-location">${this.__data.city}, ${this.__data.country}</div>
            `

        this.__data.weather.forEach((obj, i) => {
            if (i === 0) {
                const markup = `
                <div class="day-card">
                    <div class="day-card--content">
                        <div class="day-card--weather--info">
                            <div class="day-card-helper">
                                <h2 class="day-card--day">${obj.day}</h2>
                                <h2 class="day-card--weather">${obj.weather}</h2>
                            </div>
                            <img src="${weatherImages[obj.weather]}" alt="weather img" class="day-card--weather-img">
                        </div>
                        <div class="day-card--info">
                            <div class="day-card-info--temp">
                                <p class="temp">${obj.temp}&deg;</p>
                                <p class="info">Temp</p>
                            </div>
                            
                            <div class="day-card--info--location">
                                <p class="city">${this.__data.city}</p>
                                <p class="country">India</p>
                            </div>
                        </div>
                    </div>
                </div>
                `
                totalMarkup += markup;
            }
            else {
                const markup = `
                <div class="weather-card--weather--info">
                    <div class="weather--info-details">
                        <p class="weather-info--day">${obj.day}</p>
                        <p class="weather--info-weather">${obj.weather}</p>
                    </div>
                    <div class="weather--info-show">
                        <img src="${weatherImages[obj.weather]}" alt="weather img" class="weather-img">
                        <p class="weather-info--temp">${obj.temp}&deg;</p>
                    </div>
                </div>
                ${i != this.__data.weather.length - 1 ? '<hr>' : ''}
                `
                totalMarkup += markup
            }
        });
        totalMarkup += '</div>'

        this.__parentEl.insertAdjacentHTML('afterbegin', totalMarkup);
    }
}

export default new WeatherView();
const api = (() => {
  const key = "2f1512133a79a7adc6d6c4c6965bfa2d";

  const _consultWeather = async (lat, lon) => {
    try {
      const fetchString = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
      const response = await fetch(fetchString, { mode: "cors" });
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      return error;
    }
  };

  const _consultCity = async (city) => {
    try {
      const fetchString = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
      const response = await fetch(fetchString, { mode: "cors" });
      const locationData = await response.json();
      if (locationData) return locationData;
      return false;
    } catch (error) {
      return error;
    }
  };

  const _degreeToCompass = (num) => {
    const val = parseInt(num / 45 + 0.5, 10);
    const arr = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest",
    ];
    return arr[val];
  };

  const _firstLetterToUpperCase = (sentence) => {
    const result = sentence.replace(sentence[0], sentence[0].toUpperCase());

    return result;
  };

  const _checkIconName = (icon) => {
    if (icon.endsWith("n")) {
      const newIcon = icon.replace("n", "d");

      return newIcon;
    }

    return icon;
  };

  const _weatherObjectFactory = (weatherData, cityGeo) => {
    const { name } = cityGeo;
    const { country } = cityGeo;
    const clouds = weatherData.clouds.all;
    const { humidity } = weatherData.main;
    const { temp } = weatherData.main;
    const description = _firstLetterToUpperCase(weatherData.weather[0].description);
    const icon = _checkIconName(weatherData.weather[0].icon);

    const { speed } = weatherData.wind;
    const deg = _degreeToCompass(weatherData.wind.deg);
    const wind = { speed, deg };

    return { name, country, clouds, humidity, description, temp, wind, icon };
  };

  const consultCityWeather = async (city = "New York") => {
    const cityData = await _consultCity(city);

    if (cityData.length > 0) {
      const weatherData = await _consultWeather(
        cityData[0].lat,
        cityData[0].lon
      );
      const weatherObject = _weatherObjectFactory(weatherData, cityData[0]);

      return weatherObject;
    }

    return false;
  };

  return { consultCityWeather };
})();

export default api;

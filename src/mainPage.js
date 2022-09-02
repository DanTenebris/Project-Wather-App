/* eslint-disable no-plusplus */
import weatherPng from "./media/weather.png";

const mainPage = ((weatherImg) => {
  const _setBar = () => {
    const body = document.querySelector("body");
    const bar = document.createElement("div");
    const formContainer = document.createElement("div");
    const form = document.createElement("form");
    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    const inputSearch = document.createElement("input");
    const btnSearch = document.createElement("button");
    const btnText = document.createElement("span");
    const btnLoader = document.createElement("span");
    body.append(bar);
    bar.append(formContainer);
    formContainer.append(form);
    form.append(inputContainer, btnSearch);
    inputContainer.append(inputLabel, inputSearch);
    btnSearch.append(btnText, btnLoader);

    form.setAttribute("novalidate", "");
    form.setAttribute("action", "#");
    inputLabel.htmlFor = "input-search";
    inputSearch.id = "input-search";
    inputSearch.type = "search";
    inputSearch.minLength = "2";
    inputSearch.maxLength = "15";
    btnSearch.type = "button";

    inputLabel.textContent = "Search City";
    inputSearch.placeholder = "New York";
    btnText.textContent = "Search";

    bar.classList.add("bar");
    formContainer.classList.add("form-container");
    inputContainer.classList.add("input-container");
    inputSearch.classList.add("input-search");
    btnSearch.classList.add("btn", "search");
    btnText.classList.add("btn-text");
    btnLoader.classList.add("loader-container");
  };

  const _setImgCredit = () => {
    const footer = document.querySelector("footer");
    const credit = document.createElement("div");
    const illustrationLink = document.createElement("a");
    const authorLink = document.createElement("a");
    const socialLink = document.createElement("a");
    footer.append(credit);
    credit.classList.add("credit");

    illustrationLink.href = "https://www.pixiv.net/en/artworks/66385385";
    authorLink.href = "https://www.pixiv.net/en/users/810305";
    socialLink.href = "https://www.pixiv.net";

    illustrationLink.textContent = "Illustration";
    authorLink.textContent = "コーラ";
    socialLink.textContent = "Pixiv";

    credit.append(illustrationLink, " by ", authorLink, " on ", socialLink);
  };

  const show = () => {
    _setBar();

    const body = document.querySelector("body");
    const main = document.createElement("main");
    const background = document.createElement("img");
    const footer = document.createElement("footer");

    body.append(main, background, footer);

    background.src = weatherImg;
    background.alt = "It's raining in a city";
    background.classList.add("background-img");

    _setImgCredit();
  };

  const _addClassN = (classN, ...elements) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(classN);
    }
  };

  const _createDomBlock = (
    weatherData,
    tag,
    container,
    symbol = false,
    addClassN = false
  ) => {
    if (weatherData || typeof weatherData === "number") {
      const dataContainer = document.createElement("div");
      const dataTag = document.createElement("span");
      const dataContent = document.createElement("span");
      container.append(dataContainer);
      dataContainer.append(dataTag, dataContent);

      dataTag.textContent = tag;
      if (!symbol) {
        dataContent.textContent = weatherData;
      } else {
        dataContent.textContent = weatherData + symbol;
      }

      if (addClassN) {
        dataContainer.classList.add(tag);
      }

      dataContainer.classList.add("detail-container");
      dataTag.classList.add("tag");
      dataContent.classList.add("content");
    }
  };

  const showWeatherData = (data) => {
    const previousContainer = document.querySelector(".weather-container");
    if (previousContainer) previousContainer.remove();
    const main = document.querySelector("main");
    const dataContainer = document.createElement("div");
    main.append(dataContainer);

    const locationContainer = document.createElement("div");
    const mainFocusContainer = document.createElement("div");
    const detailsContainer = document.createElement("div");
    const windContainer = document.createElement("div");
    dataContainer.append(
      locationContainer,
      mainFocusContainer,
      detailsContainer
    );

    _createDomBlock(data.name, "City", locationContainer);
    _createDomBlock(data.country, "Country", locationContainer);

    const description = document.createElement("span");
    const weatherIcon = document.createElement("img");
    mainFocusContainer.append(weatherIcon, description);

    description.textContent = data.description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

    _createDomBlock(data.humidity, "Humidity", detailsContainer, "%");
    _createDomBlock(data.temp, "Temperature", detailsContainer, "°C");
    _createDomBlock(data.clouds, "Clouds", detailsContainer, "%", true);

    detailsContainer.append(windContainer);
    _createDomBlock(data.wind.deg, "Winds From", windContainer);
    _createDomBlock(
      data.wind.speed,
      "Winds Speed",
      windContainer,
      " meter/sec"
    );

    dataContainer.classList.add("weather-container");
    _addClassN(
      "weather-block",
      locationContainer,
      mainFocusContainer,
      detailsContainer
    );
    mainFocusContainer.classList.add("main-data");
    description.classList.add("weather-description");
    weatherIcon.classList.add("weather-icon");

    windContainer.classList.add("wind-container");
  };

  return { show, showWeatherData };
})(weatherPng);

export default mainPage;

import api from "./api";
import mainPage from "./mainPage";

const domCtrl = ((apiCtrl, mainP) => {
  const _setErrorMsg = (input, msgContent = false) => {
    const msg = document.createElement("span");
    input.after(msg);
    msg.setAttribute("aria-live", "polite");
    msg.classList.add("error-msg");

    if (!msgContent) {
      msg.textContent =
        "You must enter a city name of at least 2 letters and less than 15 letters.";
    } else {
      msg.textContent = msgContent;
    }
  };

  const _addSearchInputClass = (classN = false) => {
    if (classN) {
      const bar = document.querySelector(".bar");
      if (!bar.classList.contains(classN)) {
        bar.classList.add(classN);
      }
    }
  };

  const _disableBtn = (flag = false) => {
    const searchBtn = document.querySelector('.btn.search');
    const btnText = document.querySelector('.btn-text');
    const loaderContainer = document.querySelector('.loader-container');
    if(flag){
      searchBtn.disabled = true;
      btnText.textContent = '';
      loaderContainer.classList.add('loading');
    }else{
      searchBtn.disabled = false;
      btnText.textContent = 'Search';
      loaderContainer.classList.remove('loading');
    }
  };

  const _processSearch = async () => {
    const inputSearch = document.querySelector(".input-search");
    const searchValue = inputSearch.value;
    const errorMsg = document.querySelector(".error-msg");

    if (searchValue.length < 2 || searchValue.length > 15) {
      if (!errorMsg) _setErrorMsg(inputSearch);
      _addSearchInputClass();
    } else {
      if (errorMsg) errorMsg.remove();
      _disableBtn(true);
      const cityWeatherObject = await apiCtrl.consultCityWeather(searchValue);
      _disableBtn();

      if (cityWeatherObject) {
        _addSearchInputClass('up');
        setTimeout(() => {
          _addSearchInputClass('initial');
          mainP.showWeatherData(cityWeatherObject);
        }, "500");
        
      } else {
        _setErrorMsg(inputSearch, "No such named city was found.");
      }
    }
  };

  const _selectKDownListenerTarget = (e) => {
    const activeEle = document.activeElement;
    if((e.key === 'Enter') && (activeEle.classList.contains('input-search'))) {
      e.preventDefault();
      _processSearch();
    }
  };

  const setListeners = () => {

    const btnSearch = document.querySelector('.btn.search');
    btnSearch.onclick = _processSearch;

    document.addEventListener("keydown", _selectKDownListenerTarget);
  };

  return { setListeners };
})(api, mainPage);

export default domCtrl;

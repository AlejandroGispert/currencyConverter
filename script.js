//import { currencyData } from "./database.js";
import { flagData } from "./flagdata.js";
//console.log(flagData);

const leftFlag = document.getElementById("float-left-flag"); //img
const rightFlag = document.getElementById("float-right-flag"); //img
const countriesFromSelect = document.getElementById("countries-from-select");
const countriesToSelect = document.getElementById("countries-to-select");

const inputFrom = document.getElementById("input-from");
const inputTo = document.getElementById("input-to");
const resultText = document.getElementById("result-text");

const inputAmount = document.getElementById("input-amount");

const btn = document.getElementById("btn");
const bell = document.getElementById("bell");

const switchCurrency = document.getElementById("switch-currency-button");
const alertsContainer = document.getElementById("alerts-container");
const savedAlertsContainer = document.getElementById("saved-alerts-container");
//___rates
let rateData;
// ------------------ADD NEW CURRENCY------------------
const addNewCurrencyButton = document.getElementById("add-currency");
const inputNewCurrency = document.getElementById("new-currency-input");
const inputNewCurrencyRate = document.getElementById("new-currency-rate-input");
const inputSymbols = document.getElementById("new-currency-symbol-input");

const suggestions = document.getElementById("suggestions");

//------------------GRID------------------

const grid = document.getElementById("currencies-grid");
const gridContainer = document.getElementById("grid-container");

//---------glowing circle, market open close
const glowingCircleText = document.getElementById("glowing-circle-text");
const glowingCircle = document.getElementById("glowing-circle");
//----------------------JSON----------

//const historical = "time-series.json"

// const callback = (data) => {
//   console.log("json data: " + data);
// };
// const getJSON = (url, callback) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open("GET", url, true);
//   xhr.responseType = "json";
//   xhr.onload = () => {
//     const status = xhr.status;
//     if (status === 200) {
//       console.log("JSON response 200");
//       callback(null, xhr.response);
//       //  console.log("response: ", xhr.response);
//       const response = xhr.response;
//       //currencyData = response;
//       console.log("response2: ", response);
//     } else {
//       console.log("JSON response not 200");
//       callback(status, xhr.response);
//     }
//   };
//   xhr.send();
// };
// //activate this
// const currencyData = getJSON("database.json", callback);

//-----------fetch API-------------------ok

const appId = "app_id=9d0d5abf0c7749e58c563f2e85e971c7";
const openXApi = "https://openexchangerates.org/api/";
const currencies = "currencies.json";
const latestCurrencyData = "latest.json";

async function fetchInDatabase(api, appId, jsonType, base, toValue) {
  let url = `${api}${jsonType}?${appId}&base=${base}`;
  if (toValue) {
    url = url + "&currencies=" + toValue;
    // console.log(url);
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parses the JSON response into native JavaScript objects

    return data;
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
}

// Call the function to fetch and display rates

fetchInDatabase(openXApi, appId, latestCurrencyData, "USD")
  .then((data) => {
    //console.log("Fetched rates: ", data.rates);
  })
  .catch((error) => {
    console.error("Error fetching rates:", error);
  });
//const fetchCurrencies = fetchInDatabase(appId, currencies);

//---------------------ADDCURRENCIES TO SELECT---ok

const addCurrenciestoDOM = (symbol) => {
  //fixing a bug here, when you add a new currency, it doesnt show up in the select,
  //because it neeeded to be several times to be added to the DOM

  const separatedSymbol = Object.values(symbol).toString().split(",").join(" ");
  // console.log(separatedSymbol);
  const newCurrency = document.createElement("option");
  const newCurrency2 = document.createElement("option");
  const newCurrency3 = document.createElement("option");
  newCurrency.value = separatedSymbol;
  newCurrency.innerText = separatedSymbol;

  newCurrency2.value = separatedSymbol;
  newCurrency2.innerText = separatedSymbol;

  newCurrency3.value = separatedSymbol;
  newCurrency3.innerText = separatedSymbol;

  countriesFromSelect.appendChild(newCurrency2);
  countriesToSelect.appendChild(newCurrency3);
  suggestions.appendChild(newCurrency);
  // console.log("this currency added: " + symbol);
};

fetchInDatabase(openXApi, appId, currencies, "USD")
  .then((currencies) => {
    console.log("Fetched currencies: ", currencies);

    Object.entries(currencies).forEach((symbol) => addCurrenciestoDOM(symbol));
  })
  .catch((error) => {
    console.error("Error fetching rates:", error);
  });

// ------------------GET FLAGS FROM SELECT------------------ 50/50
function getFlag(currency, direction) {
  direction.style.visibility = "visible";

  const firstThreeLetters = currency.slice(0, 3);
  //console.log(firstThreeLetters);
  for (let i = 0; i < flagData.length; i++) {
    if (flagData[i].base) {
      if (flagData[i].base === firstThreeLetters) {
        direction.src = flagData[i].flag;

        //console.log("You selected: ", countriesFromSelect.value);
      }
    } else if (!flagData[i].base || !flagData[i].flag) {
      direction.src = "./flags/neutral.svg";

      console.log("no flag found");
    }
  }
}
function getFlagFromSearch(currency, direction) {
  if (direction === leftFlag) {
    countriesFromSelect.value = currency;
  } else if (direction === rightFlag) {
    countriesToSelect.value = currency;
  }

  getFlag(currency, direction);
}

//------------------ ADD FLAGS TO SELECT------------------OK
countriesFromSelect.addEventListener("change", () =>
  getFlag(countriesFromSelect.value, leftFlag)
);
countriesToSelect.addEventListener("change", () =>
  getFlag(countriesToSelect.value, rightFlag)
);

inputFrom.addEventListener("change", () =>
  getFlagFromSearch(inputFrom.value, leftFlag)
);
inputTo.addEventListener("change", () =>
  getFlagFromSearch(inputTo.value, rightFlag)
);

//--------------rates-----------------//'

const objectRateFetcher = (valFrom, valTo) => {
  //---latest logic ---------------
  const forexRateApiId = "api_key=07691352b05e809fe4b0fea2cf2c874a";
  const forexRateWebAdress = "https://api.forexrateapi.com/v1/";

  return new Promise((resolve, reject) => {
    fetchInDatabase(
      forexRateWebAdress,
      forexRateApiId,
      "latest",
      valFrom,
      valTo
    )
      .then((currencies) => {
        console.log("Fetched data: ", currencies);

        const rateResult = Object.values(currencies.rates)[0];
        rateData = rateResult;
        console.log("Yes rateData here: ", rateData);
        resolve(rateResult);
      })
      .catch((error) => {
        console.error("Error fetching rates:", error);
        reject(error);
      });
  });
};
//-----------------------GRID--------

const updateGrid = () => {
  grid.innerHTML = "";
  gridContainer.style.visibility = "visible";
  gridContainer.style.opacity = "1";
  gridContainer.style.transition = "all 0.5s";

  const filtered = currencyData.filter(
    (e) => e.base === countriesFromSelect.value
  );
  //console.log("filtered: " + filtered);
  Object.keys(filtered[0].rates).map((e) => {
    grid.innerHTML += `<div class="grid-item">${filtered[0].base}</div>`;

    let keys = e;
    let values = filtered[0].rates[e];
    //console.log("keys: " + keys + " values: " + values);
    grid.innerHTML += `<div class="grid-item">${keys}</div>`;
    grid.innerHTML += `<div class="grid-item">${values}</div>`;
  });
};

// ------------------CONVERT CURRENCY------------------ok
const amountConverter = (amount, rate) => {
  // console.log("amount: " + amount + " rate:  " + rate);
  return amount * rate;
};

async function handleButtonClick() {
  try {
    const rateResult = await objectRateFetcher(
      countriesFromSelect.value.slice(0, 3),
      countriesToSelect.value.slice(0, 3)
    );
    if (!isNaN(rateResult)) {
      //updateGrid();
      // console.log("Conversion Rate Result1: ", rateResult);
      const convertedAmount = amountConverter(inputAmount.value, rateResult);

      const formattedAndConvertedAmount = convertedAmount.toLocaleString();
      //console.log("Converted Amount: ", formattedAndConvertedAmount);

      const currencySymbol = countriesToSelect.value.slice(0, 3);
      resultText.innerHTML = formattedAndConvertedAmount + " " + currencySymbol;
      bell.style.display = "block";
    } else {
      handleError("Conversion Rate Result2: ", rateResult);
    }
  } catch (error) {
    handleError("Error fetching rates:", error);
  }
}

function handleError(message, additionalInfo = null) {
  console.error(message, additionalInfo);
  resultText.innerHTML = "Sorry, We couldn't convert your amount.";
  bell.style.display = "none";
}

btn.addEventListener("click", handleButtonClick);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleButtonClick();
  }
});
//So it can activate automatically without button pressed
countriesToSelect.addEventListener("change", () => {
  inputTo.value = countriesToSelect.value;
  handleButtonClick();
});
countriesFromSelect.addEventListener("change", () => {
  inputFrom.value = countriesFromSelect.value;
});
inputFrom.addEventListener("click", () => {
  inputFrom.value = "";
});
inputTo.addEventListener("click", () => {
  inputTo.value = "";
});

//----------------------Add more currencies dinamically---------------------------
const addMoreCurrenciestoDOM = () => {
  //fixing a bug here, when you add a new currency, it doesnt show up in the select,
  //because it neeeded to be several times to be added to the DOM
  const newCurrency = document.createElement("option");
  const newCurrency2 = document.createElement("option");
  const newCurrency3 = document.createElement("option");
  newCurrency.value = inputNewCurrency.value;
  newCurrency.innerText = inputNewCurrency.value;

  newCurrency2.value = inputNewCurrency.value;
  newCurrency2.innerText = inputNewCurrency.value;

  newCurrency3.value = inputNewCurrency.value;
  newCurrency3.innerText = inputNewCurrency.value;

  countriesFromSelect.appendChild(newCurrency2);
  countriesToSelect.appendChild(newCurrency3);
  suggestions.appendChild(newCurrency);
  console.log("new currency added: " + inputNewCurrency.value);
};

// ------------------ADD NEW CURRENCY---------------------
const timestamp = new Date().getTime();

//currencyData.date;
const date = new Date().toISOString().slice(0, 10);

const addNewCurrency = (base, symbol, rates) => {
  //Chekear si existe la moneda
  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].base === base) {
      resultText.innerHTML = `The currency ${base} already exists in our system.`;
      return;
    }
  }
  // Currency rates Separator
  const ratesDivided = rates.split(",");
  console.log("ratesDivided: " + ratesDivided);
  const currencyRates = {};
  for (let i = 0; i < ratesDivided.length; i++) {
    const [key, value] = ratesDivided[i].trim().split(":");
    console.log(ratesDivided[i].trim().split(":"));
    // convert to number
    currencyRates[key.trim()] = parseFloat(value);
  }

  console.log(currencyRates);

  // poner la moneda en el array
  currencyData.push({
    base,
    symbol,
    timestamp,
    date,
    rates: currencyRates,
    flag: "./flags/neutral.svg",
  });
  addMoreCurrenciestoDOM();
  resultText.innerHTML = `The currency ${base} was added successfully to our system.`;
};

addNewCurrencyButton.addEventListener("click", () => {
  if (inputNewCurrency.value === "" || inputNewCurrencyRate.value === "") {
    resultText.innerHTML = "Please fill all the fields.";
  } else {
    if (!inputSymbols.value) {
      addNewCurrency(inputNewCurrency.value, "$", inputNewCurrencyRate.value);
    } else {
      addNewCurrency(
        inputNewCurrency.value,
        inputSymbols.value,
        inputNewCurrencyRate.value
      );
    }
  }
});
//----------------------Widget Chart--------------------

const tradingview_12345 = document.getElementById("tradingview_12345");
new TradingView.widget({
  width: 400,
  height: 500,
  symbol: "FX:EURUSD",
  interval: "D",
  timezone: "Europe/Copenhagen",
  theme: "light",
  style: "1",
  locale: "en",
  toolbar_bg: "#f1f3f6",
  enable_publishing: false,

  allow_symbol_change: false,
  show_popup_button: true,
  popup_width: "1000",
  popup_height: "650",
  container_id: "tradingview_12345",
});
//----------------------Market Open Close--------------------

const getMarketOpenClose = () => {
  let currentTime = new Date();

  let formatter = new Intl.DateTimeFormat("da-DK", {
    hour: "numeric",
    minute: "numeric",
  });

  let formattedDateTime = formatter.format(currentTime);

  let dayOfWeek = currentTime.getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = daysOfWeek[dayOfWeek];
  console.log("Time: ", dayName + " " + formattedDateTime);
  console.log();
  if (
    dayName != "Sunday" &&
    dayName != "Saturday" &&
    currentTime.getHours() >= 9 &&
    currentTime.getHours() <= 17
  ) {
    glowingCircleText.innerText = "The Market is Open";
    glowingCircleText.style.color = "green";

    if (formattedDateTime === "9.00") {
      alert("The Market just Opened");
    }
    if (formattedDateTime === "16.55") {
      alert("The Market is about to Close");
    }
  } else {
    //console.log("nope");
    glowingCircleText.innerText = "The Market is Closed";
    glowingCircleText.style.color = "grey";
    glowingCircle.style.backgroundColor = "grey";

    glowingCircle.style.animation = "none";
    if (formattedDateTime === "17.00") {
      alert("The Market just Closed");
    }
  }
};
getMarketOpenClose();
//---------------switch currency ---------------

switchCurrency.addEventListener("click", switchCurrencyFunction);
document.addEventListener("keydown", (e) => {
  if (e.altKey) {
    switchCurrencyFunction();
  }
});
function switchCurrencyFunction() {
  // Store the current selected values
  const fromSelectedValue = countriesFromSelect.value;
  const toSelectedValue = countriesToSelect.value;

  // Switch the values
  countriesFromSelect.value = toSelectedValue;
  countriesToSelect.value = fromSelectedValue;

  // Optional: Trigger change events to reflect the switch in any dependent logic
  countriesFromSelect.dispatchEvent(new Event("change"));
  countriesToSelect.dispatchEvent(new Event("change"));
}
//------------currency alerts-----------------
// turned it in async since rateData is asynchronous
bell.addEventListener("click", async () => {
  try {
    addAlert(
      countriesFromSelect.value.slice(0, 3),
      countriesToSelect.value.slice(0, 3)
    );
  } catch (e) {
    console.error("Error in bell alert adder:", error);
  }
});

let alertsArray = localStorage.getItem("alerts")
  ? JSON.parse(localStorage.getItem("alerts"))
  : [];

// function delAllFromStorage() {
//   localStorage.removeItem("alerts");
// }
function addAlert(countryFrom, countryTo) {
  // Ensure you have a <ul> element with id='alerts-list' in your HTML
  const setAlertList = document.createElement("li");
  setAlertList.innerHTML = `set an Alert for: ${countryFrom} to ${countryTo} rate = <input id="rateAlertInput" style="width:60px" placeholder="${rateData.toFixed(
    3
  )}"/><button id="set-button"  style="width:40px;background-color:white">Set</button>`;

  //to fadeout the alert
  //li.classList.add("fadeout");

  // setTimeout(function () {
  //   // fadeout logic goes here
  //   // remove an element logic goes here
  //   li.remove();

  //   console.log("fade out");
  // }, 5000);
  alertsContainer.appendChild(setAlertList);

  const setButton = document.getElementById("set-button");
  setButton.addEventListener("click", addToStorage);
}

function addToStorage() {
  let currentTime = new Date();

  let formatter = new Intl.DateTimeFormat("da-DK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  let formattedDateTime = formatter.format(currentTime);
  console.log("formattedDateTime: ", formattedDateTime);
  if (rateAlertInput.value) {
    alertsArray.push({
      symbolFrom: countriesFromSelect.value.slice(0, 3),
      symbolTo: countriesToSelect.value.slice(0, 3),
      rate: rateData,
      rateTime: formattedDateTime,
      alertOn: Number(rateAlertInput.value),
    });
  } else {
    alertsArray.push({
      symbolFrom: countriesFromSelect.value.slice(0, 3),
      symbolTo: countriesToSelect.value.slice(0, 3),
      rate: rateData,
      rateTime: formattedDateTime,
    });
  }
  localStorage.setItem("alerts", JSON.stringify(alertsArray));
  window.location.reload();
}

//this should be async cause the rate will be updated
document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("saved alerts", alertsArray);

    alertsArray.forEach((e, index) => {
      const savedAlert = document.createElement("li");
      savedAlert.innerHTML = `${e.symbolFrom} to ${
        e.symbolTo
      } rate ${e.rate.toFixed(
        3
      )}<button type="button" class="rem-button" data-index="${index}"  style="width:15px;height:20px;background-color:white;margin-left:60px;padding: 0;">x</button`;
      savedAlertsContainer.appendChild(savedAlert);

      const remButton = document.querySelector(
        `.rem-button[data-index="${index}"]`
      );
      remButton.addEventListener("click", () => {
        savedAlert.remove();
        console.log("removed alert " + index);
        console.log("local storage index# ", alertsArray[index]);
        removeFromdatabase("alerts", index);
      });
    });
  } catch (err) {
    console.error("Error at dom loading", err);
  }
});
function removeFromdatabase(key, index) {
  let storedArray = JSON.parse(localStorage.getItem(key));

  if (index >= 0 && index < storedArray.length) {
    storedArray.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(storedArray));
    window.location.reload();
  } else {
    console.error("Invalid key or index.");
  }
}

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

const callback = (data) => {
  console.log("json data: " + data);
};
const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = () => {
    const status = xhr.status;
    if (status === 200) {
      console.log("JSON response 200");
      callback(null, xhr.response);
      //  console.log("response: ", xhr.response);
      const response = xhr.response;
      //currencyData = response;
      console.log("response2: ", response);
    } else {
      console.log("JSON response not 200");
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
//activate this
const currencyData = getJSON("database.json", callback);

//-----------fetch API-------------------ok

const appId = "app_id=9d0d5abf0c7749e58c563f2e85e971c7";
const openXApi = "https://openexchangerates.org/api/";
const currencies = "currencies.json";
const latestCurrencyData = "latest.json";

async function fetchInDatabase(api, appId, jsonType, base, toValue) {
  let url = `${api}${jsonType}?${appId}&base=${base}`;
  if (toValue) {
    url = url + "&currencies=" + toValue;
    console.log(url);
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
  const newCurrency = document.createElement("option");
  const newCurrency2 = document.createElement("option");
  const newCurrency3 = document.createElement("option");
  newCurrency.value = symbol;
  newCurrency.innerText = symbol;

  newCurrency2.value = symbol;
  newCurrency2.innerText = symbol;

  newCurrency3.value = symbol;
  newCurrency3.innerText = symbol;

  countriesFromSelect.appendChild(newCurrency2);
  countriesToSelect.appendChild(newCurrency3);
  suggestions.appendChild(newCurrency);
  // console.log("this currency added: " + symbol);
};

fetchInDatabase(openXApi, appId, currencies, "USD")
  .then((currencies) => {
    console.log("Fetched currencies: ", currencies);
    Object.entries(currencies).forEach((symbol) => addCurrenciestoDOM(symbol));

    return;
  })
  .catch((error) => {
    console.error("Error fetching rates:", error);
  });

// ------------------GET FLAGS FROM SELECT------------------ 50/50
function getFlag(currency, direction) {
  direction.style.visibility = "visible";

  const firstThreeLetters = currency.slice(0, 3);
  console.log(firstThreeLetters);
  for (let i = 0; i < flagData.length; i++) {
    if (flagData[i].base) {
      if (flagData[i].base === firstThreeLetters) {
        direction.src = flagData[i].flag;

        console.log("You selected: ", countriesFromSelect.value);
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
let rateData;
const objectRateFetcher = (valFrom, valTo) => {
  // for (let i = 0; i < currencyData.length; i++) {
  //   if (currencyData[i].base === valFrom) {
  //     console.log(currencyData[i].rates[valTo]);
  //     if (!currencyData[i].rates[valTo]) {
  //       console.log(`We couldnt find a rate for ${valTo} in our system.`);
  //     } else {
  //       return currencyData[i].rates[valTo];
  //     }
  //   }
  // }
  // let value;
  // //NEW LOGIC / works, but i have to pay for the api service!
  // fetchInDatabase(appId, latestCurrencyData, valFrom)
  //   .then((rates) => {
  //     console.log("Fetched rates: ", rates[valTo]);
  //     value = rates[valTo];
  //     return rates[valTo];
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching rates:", error);
  //   });
  // return value;

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

        const rateResult = Object.values(currencies.rates)[0].toFixed(2);
        rateData = rateResult;
        console.log("Yes rates: ", rateData);
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
  console.log("amount: " + amount + " rate:  " + rate);
  return (amount * rate).toFixed(2);
};

async function handleButtonClick() {
  try {
    const rateResult = await objectRateFetcher(
      countriesFromSelect.value,
      countriesToSelect.value
    );
    if (!isNaN(rateResult)) {
      //updateGrid();
      console.log("Conversion Rate Result1: ", rateResult);
      const convertedAmount = amountConverter(inputAmount.value, rateResult);

      const currencySymbol = countriesToSelect.value.slice(0, 3);
      resultText.innerHTML = convertedAmount + " " + currencySymbol;
      bell.style.display = "block";
    } else {
      console.log("Conversion Rate Result2: ", rateResult);
      resultText.innerHTML = "Sorry, We couldn't convert your amount.";
      bell.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching rates:", error);
    resultText.innerHTML = "Sorry, We couldn't convert your amount.";
    bell.style.display = "none";
    // Handle the error
  }

  // if (
  //   isNaN(
  //     objectRateFetcher(
  //       countriesFromSelect.value,
  //       countriesToSelect.value
  //     ).then((rateResult) => {
  //       console.log("Conversion Rate Result1: ", rateResult);
  //       // Use rateResult as neededreturn

  //     })
  //   )
  // ) {
  //   resultText.innerHTML = "Sorry, We couldn't convert your amount.";
  // } else {
  //   //updateGrid();

  //   objectRateFetcher(countriesFromSelect.value, countriesToSelect.value).then(
  //     (rateResult) => {
  //       console.log("Conversion Rate Result2: ", rateResult);
  //       // Use rateResult as needed
  //       const convertedAmount = amountConverter(inputAmount.value, rateResult);
  //       resultText.innerHTML = convertedAmount + " " + countriesToSelect.value;
  //     }
  //   );
  // }
}
btn.addEventListener("click", handleButtonClick);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleButtonClick();
  }
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
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
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
    console.log("yeah " + currentTime.getHours());
    glowingCircleText.innerText = "The Market is Open";
    glowingCircleText.style.color = "green";

    if (formattedDateTime === "9.00") {
      alert("The Market just Opened");
    }
    if (formattedDateTime === "16.55") {
      alert("The Market is about to Close");
    }
  } else {
    console.log("nope");
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

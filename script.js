//import { currencyData } from "./database.js";
import { flagData } from "./flagdata.js";

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

const marker = document.querySelector(".current-time-marker");
const markerDiv = document.querySelector(".market-hours-indicator");

const circleWithText = document.querySelector(".circle-with-text");
const aiMessageContainer = document.getElementById("ai-message-container");
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

const tradingViewWidgetContainer = document.getElementById(
  "tradingview-widget-container"
);
const heatmapWidgetContainer = document.getElementById(
  "heatmap-widget-container"
);

const tab1 = document.getElementById("tab-1");
const tab2 = document.getElementById("tab-2");
const tab3 = document.getElementById("tab-3");

const chartBtn = document.getElementById("chartBtn");
const forumBtn = document.getElementById("forum-btn");
const disqus = document.getElementById("disqus_thread");
const insertContainer = document.getElementById("insert-container");

const currencyDataList = [];

//-----------fetch API-------------------ok

// async function fetchInDatabase(api, appId, jsonType, base, toValue) {
//   let url = `${api}${jsonType}?${appId}&base=${base}`;
//   if (toValue) {
//     url = url + "&currencies=" + toValue;
//     // console.log(url);
//   }
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json(); // Parses the JSON response into native JavaScript objects

//     return data;
//   } catch (error) {
//     //alert("no internet connection detected");
//     console.error(
//       "There has been a problem with your fetch operation: ",
//       error
//     );
//   }
// }

// Call the function to fetch and display rates

// fetchInDatabase(openXApi, appId, latestCurrencyData, "CUC")
//   .then((data) => {
//     console.log("Fetched rates: CUC ", data.rates);
//   })
//   .catch((error) => {
//     console.error("Error fetching rates:", error);
//   });

// fetchInDatabase(openXApi, appId, latestCurrencyData, "CUP")
//   .then((data) => {
//     console.log("Fetched rates: CUP ", data.rates);
//   })
//   .catch((error) => {
//     console.error("Error fetching rates:", error);
//   });
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

async function fetchCurrencies() {
  let url = "https://currency-backend.netlify.app/.netlify/functions/openX";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log("Fetched currencies: ", data.currencies);

    Object.entries(data.currencies).forEach((symbol) =>
      addCurrenciestoDOM(symbol)
    );
    // console.log("Currencies array: ", currencyDataList);
    Object.entries(data.currencies).forEach((symbol) =>
      currencyDataList.push(symbol)
    );
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
  }
}
fetchCurrencies();
// ------------------GET FLAGS FROM SELECT------------------ 50/50
function getFlag(currency, direction) {
  direction.style.visibility = "visible";

  direction.style.animation = "fadeIn 3s";

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
      direction.style.visibility = "visible";
      direction.style.animation = "fadeIn 3s";
      console.log("no flag found");
    }
  }
}
function getFlagFromSearch(currency, direction) {
  if (direction === leftFlag) {
    countriesFromSelect.value = currency;
    handleButtonClick();
    inputAmount.focus();
  } else if (direction === rightFlag) {
    countriesToSelect.value = currency;
    handleButtonClick();
    inputAmount.focus();
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

async function objectRateFetcher(valFrom, valTo) {
  //---latest logic ---------------

  // console.log("currencyDataObjects", currencyDataObjects[0].rates);

  if (valFrom === "USD" && valTo === "CUP") {
    const toqueApi =
      "https://currency-backend.netlify.app/.netlify/functions/CUPtoUSD";
    const response2 = await fetch(toqueApi);
    const data2 = await response2.json();
    console.log("received toque", data2);
    rateData = data2;
    resultText.innerHTML.prepend(`<span class="informal">informalRate</span>`);
    return rateData;
  } else if (valFrom === "MLC" && valTo === "CUP") {
    const toqueApi =
      "https://currency-backend.netlify.app/.netlify/functions/CUPtoMLC";
    const response3 = await fetch(toqueApi);
    const data3 = await response3.json();
    console.log("received toque", data3);
    resultText.innerHTML.prepend(`<span class="informal">informalRate</span>`);
    rateData = data3;
    return rateData;
  } else {
    const forexRateWebAdress =
      "https://currency-backend.netlify.app/.netlify/functions/converted";

    try {
      const response = await fetch(
        `${forexRateWebAdress}?from=${valFrom}&to=${valTo}`
      );
      const data = await response.json();
      const rateResult = Object.values(data.conversionRate.rates)[0];

      rateData = rateResult;
      // console.log("Fetched rateData: ", rateResult);
      //  console.log("Yes rateData here: ", rateData);

      return rateData;
    } catch (error) {
      //console.error("Error fetching rates:", error);
      //fallback
      //GGET FROM STORAGE NEW RATES
      // const getSavedRates = sessionStorage.getItem("newCurrencyRates");
      // const parsedRates = JSON.parse(getSavedRates);
      // for (let i = 0; i < Object.keys(parsedRates.rates).length; i++) {
      //   if (
      //     Object.keys(parsedRates.rates)[i] === valTo &&
      //     parsedRates.base === valFrom
      //   ) {
      //     rateData = Object.values(parsedRates.rates)[i];
      //     console.log("rateData when null: ", rateData);
      //     console.log("rateData when null2: ", parsedRates.base);
      //     resultText.innerHTML += `<span>${parsedRates.base}</span>`;
      //     console.log("rateData when", Object.keys(parsedRates)[i]);
      //     return rateData;
      //   }
      // }
      //return rateData;
    }
  }
}
//-----------------------GRID--------
// get this data from api at github, make an API request, then activate 266
const updateGrid = async () => {
  grid.innerHTML = "";
  gridContainer.style.visibility = "visible";
  gridContainer.style.opacity = "1";
  gridContainer.style.transition = "all 0.5s";
  let fetchedRates;

  const forexRateWebAdress = `https://currency-backend.netlify.app/.netlify/functions/sixRates?base=${countriesFromSelect.value}`;
  try {
    const response = await fetch(forexRateWebAdress);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // console.log("Network response: ", response.json());
    const data = await response.json(); // Parses the JSON response into native JavaScript objects

    fetchedRates = Object.keys(data);
    grid.innerHTML = "";
    Object.keys(data).map((e, index) => {
      grid.innerHTML += `<div class="grid-item">${countriesFromSelect.value}</div>`;

      let keys = e;

      let values = Object.values(data)[index].toFixed(3);
      //console.log("keys: " + keys + " values: " + values);
      grid.innerHTML += `<div class="grid-item">${keys}</div>`;
      grid.innerHTML += `<div class="grid-item">${values}</div>`;
    });

    return data;
  } catch (error) {
    gridContainer.style.visibility = "none";
    gridContainer.style.opacity = "0";
    //alert("no internet connection detected");
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
  console.log("fetchedRates", fetchedRates);
  //console.log("filtered: " + filtered);
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
      // console.log("Conversion Rate Result1: ", rateResult);
      const filteredInput = inputAmount.value.replace(/,/g, ".");
      const convertedAmount = amountConverter(filteredInput, rateResult);

      const formattedAndConvertedAmount = convertedAmount.toLocaleString();
      //console.log("Converted Amount: ", formattedAndConvertedAmount);

      const [numberPart, decimalPart] = formattedAndConvertedAmount.split(".");

      const currencySymbol = countriesToSelect.value.slice(0, 3);

      resultText.innerHTML = `<span id="numberSpan">${numberPart}</span><span><span id="decimalSpan">.${decimalPart} ${currencySymbol}</span></span>`;
      bell.style.display = "block";
      const decimalSpan = document.getElementById("decimalSpan");
      if (decimalPart === undefined) {
        decimalSpan.style.display = "none";
      }
      updateGrid();
    } else {
      handleError("Conversion Rate Result2: ", rateResult);
      resultText.innerHTML = "Sorry, we couldn't convert the rate";
    }
  } catch (error) {
    handleError("Error fetching rates:", error);
    resultText.innerHTML = "Sorry, we couldn't convert the rate";
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
  inputAmount.focus();
});
countriesFromSelect.addEventListener("change", () => {
  inputFrom.value = countriesFromSelect.value;
  handleButtonClick();
  inputAmount.focus();
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
  for (let i = 0; i < currencyDataList.length; i++) {
    // console.log(currencyDataList[i][0]);
    if (currencyDataList[i][0] === base || currencyDataList[i][1] === base) {
      //console.log(currencyDataList[i]);
      resultText.innerHTML = `The currency ${base} already exists in our system.`;
      return;
    }
  }
  // Currency rates Separator
  const ratesDivided = rates.split(",");

  const insertedCurrencyRates = {};
  for (let i = 0; i < ratesDivided.length; i++) {
    const [key, value] = ratesDivided[i].trim().split(":");

    // convert to number
    insertedCurrencyRates[key.trim()] = parseFloat(value);
  }

  const newObject = {
    date: date,
    base: base,
    symbol: symbol,
    rates: insertedCurrencyRates,
  };
  console.log("insertedCurrencyRates", newObject);

  // poner la moneda en el array

  addMoreCurrenciestoDOM();
  sessionStorage.setItem("newCurrencyRates", JSON.stringify(newObject));
  resultText.innerHTML = `The currency ${base} was added successfully to our system.`;
};

addNewCurrencyButton.addEventListener("click", () => {
  if (inputNewCurrency.value === "" || inputNewCurrencyRate.value === "") {
    resultText.innerHTML = "Please fill all the fields.";
  } else {
    addNewCurrency(inputNewCurrency.value, "$", inputNewCurrencyRate.value);
  }
});
//----------------------Widget Chart--------------------
// let tradingSymbol = "FX:EURUSD";
let tradingSymbol = "EURUSD";

new TradingView.widget({
  width: "100%",
  height: "573px",
  symbol: tradingSymbol,
  interval: "D",
  timezone: "Europe/Copenhagen",
  theme: "light",
  style: "1",
  locale: "en",
  toolbar_bg: "#f1f3f6",
  enable_publishing: false,

  allow_symbol_change: true,
  show_popup_button: true,
  popup_width: "1000",
  popup_height: "650",
  container_id: "tradingview-widget-container",
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
    currentTime.getHours() < 17
  ) {
    glowingCircleText.innerText = "The Market is Open";
    glowingCircleText.style.color = "green";
    markerDiv.style.visibility = "visible";

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

    markerDiv.style.visibility = "hidden";
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
  //empty the grid
  grid.innerHTML = "";
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
let setAlertCounterActive = false;
bell.addEventListener("click", async () => {
  if (!setAlertCounterActive) {
    try {
      addAlert(
        countriesFromSelect.value.slice(0, 3),
        countriesToSelect.value.slice(0, 3)
      );
    } catch (e) {
      console.error("Error in bell alert prompt:", error);
    }
    setAlertCounterActive = true;
  } else {
    console.log("there is already an alert prompt open");
  }
});

let alertsArray = localStorage.getItem("alerts")
  ? JSON.parse(localStorage.getItem("alerts"))
  : [];

function addAlert(countryFrom, countryTo) {
  // Ensure you have a <ul> element with id='alerts-list' in your HTML
  const setAlertList = document.createElement("li");

  setAlertList.innerHTML = `set an Alert for: ${countryFrom} to ${countryTo} rate >= <input id="rateAlertInput" style="width:60px" value="${rateData.toFixed(
    3
  )}"/><button id="set-button"  style="width:40px;background-color:white">Set</button><button id="quitBtnSetAlert"style="width:40px;background-color:white;">Quit</button>`;

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

  const quitBtnSetAlert = document.getElementById("quitBtnSetAlert");
  quitBtnSetAlert.addEventListener("click", () => {
    location.reload();
    console.log("done");
  });
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("saved alerts", alertsArray);

    alertsArray.forEach(async (e, index) => {
      const savedAlert = document.createElement("li");
      savedAlert.classList.add("allAlerts");
      savedAlert.style.visibility = "visible";

      savedAlert.style.listStyle = "none";
      savedAlert.innerHTML = `<p style="margin: 0">${e.symbolFrom} to ${
        e.symbolTo
      } rates</p><span style="font-size: 10px">then ${e.rate.toFixed(
        3
      )},  alert on: ${
        e.alertOn
      }</span><button type="button"  class="rem-button" data-index="${index}"  style="width:15px;height:20px;background-color:white;margin-left:15px;padding: 0;float:right;border-radius:5px">x</button>`;
      savedAlertsContainer.appendChild(savedAlert);

      const remButton = document.querySelector(
        `.rem-button[data-index="${index}"]`
      );

      savedAlert.addEventListener("click", async () => {
        console.log("Click event triggered", remButton);
        savedAlert.remove();

        removeFromdatabase("alerts", index);
      });

      // Fetch the current rate asynchronously
      const rateResult = await objectRateFetcher(e.symbolFrom, e.symbolTo);

      let colorStyle = "";
      if (rateResult > e.rate) {
        colorStyle = "color: green;";
      } else if (rateResult < e.rate) {
        colorStyle = "color: red;";
      }

      const spanHtml = `<span style="font-size: 15px; ${colorStyle}">now ${rateResult.toFixed(
        3
      )}</span>`;

      savedAlert.innerHTML += spanHtml;

      if (rateResult >= e.alertOn) {
        savedAlert.style.backgroundColor = "#d3f8d3";
        //savedAlert.style.animation = "3s infinite horizontal-shaking";
      }
      const blink = document.querySelector(".superAlert");
      // if (blink) {
      //   setInterval(function () {
      //     blink.style.opacity = blink.style.opacity == 1 ? 0 : 1;
      //   }, 1500);
      // }
    });
  } catch (err) {
    console.error("Error at dom loading", err);
  }
});
function removeFromdatabase(key, index) {
  console.log("Removing");
  let storedArray = JSON.parse(localStorage.getItem(key));

  if (index >= 0 && index < storedArray.length) {
    storedArray.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(storedArray));
    window.location.reload();
  } else {
    console.error("Invalid key or index.");
  }
}
//---------------------Market -Hours------------------------------------------

function updateMarketHoursIndicator() {
  markerDiv.style.display = "block";
  markerDiv.style.position = "absolute";
  markerDiv.style.top = "45px";
  markerDiv.style.left = "40px";
  const now = new Date();
  const startHour = 9; // Market opens at 9 AM
  const endHour = 17; // Market closes at 5 PM
  const totalMarketHours = endHour - startHour;

  // Calculate the current hour past the opening time
  let currentMarketHour = now.getHours() - startHour;
  if (currentMarketHour < 0) currentMarketHour = 0; // Before opening
  if (currentMarketHour > totalMarketHours)
    currentMarketHour = totalMarketHours; // After closing

  // Calculate the percentage of the day that has passed
  const percentageOfDayPassed = (currentMarketHour / totalMarketHours) * 100;

  // Update the position of the current time marker

  marker.style.left = `calc(${percentageOfDayPassed}% - 5px)`; // Adjust the circle's position
}

// Initial update and then update every minute
updateMarketHoursIndicator();
setInterval(updateMarketHoursIndicator, 60000); // Update every minute

//-----------TOP GAINERs
//only 25 requests per day

// async function topGainers() {
//   const url2 =
//     "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=1F7MCZK5P7UCOV52";

//   try {
//     const response = await fetch(url2);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json(); // Parses the JSON response into native JavaScript objects
//     console.log("gainers", Object.values(data));

//     // console.log("losers", data.top_losers);
//     // console.log("most active", data.most_actively_traded);
//     return data;
//   } catch (error) {
//
//     console.error(
//       "There has been a problem with your fetch operation: ",
//       error
//     );
//   }
// }
// topGainers();
//---------A.I---------

circleWithText.addEventListener("click", async function () {
  messageOnOff();
});

let messageCounter = 0;
async function messageOnOff() {
  aiMessageContainer.innerText = "Hello";
  //console.log("AI comment");
  //toggle
  if (
    aiMessageContainer.style.opacity === "" ||
    aiMessageContainer.style.opacity === "0"
  ) {
    aiMessageContainer.style.opacity = "1";
  } else if (aiMessageContainer.style.opacity === "1") {
    aiMessageContainer.style.opacity = "0";
  }
  // const predefinedPrompt =
  //   "whats the 3 most moving currency pairs of today according with yahoo finance, in 100 characters"; // Your predefined prompt
  //const aiResponseContainer = document.getElementById("ai-response-container");
  let response;
  if (messageCounter === 0) {
    response = await getAIResponse(
      "https://currency-backend.netlify.app/.netlify/functions/api"
    );
    messageCounter = 1;
  } else if (messageCounter === 1) {
    response = await getAIResponse(
      "https://currency-backend.netlify.app/.netlify/functions/api2"
    );
    messageCounter = 0;
  }
  // Display the AI's response
  setTimeout(() => {
    aiMessageContainer.innerText = response;
  }, 1000);
}

async function getAIResponse(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Failed to get AI response:", error);
    return "Error contacting AI.";
  }
}

// async function getAIResponse(prompt) {
//   const apiUrl = "https://api.textsynth.com/v1/engines/llama3_8B/chat"; // Example API URL, replace with your actual endpoint
//   const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
//   const proxyUrl = "https://api.allorigins.win/get?url=";
//   try {
//     const response = await fetch(proxyUrl + encodeURIComponent(apiUrl), {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         max_tokens: 50, // Adjust based on your needs
//         prompt: prompt,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log("data", data.text);
//     return data.text; // Assuming the API returns choices with text, adjust based on actual response structure
//   } catch (error) {
//     console.error("Failed to get AI response:", error);
//     return "Error contacting AI.";
//   }
// }
document.querySelector(".side-panel-toggle").addEventListener("click", () => {
  document
    .querySelectorAll(".allAlerts")
    .forEach((element) => element.classList.toggle("hidden"));

  const spOpen = document.querySelector(".sp-icon-open");
  const spClose = document.querySelector(".sp-icon-close");
  if (spOpen.style.display === "block") {
    spOpen.style.display = "none";
    spClose.style.display = "block";
  } else {
    spOpen.style.display = "block";
    spClose.style.display = "none";
  }
});

let activated = 1;

tab1.addEventListener("click", () => {
  activated = 1;
  toggleTabs();
});
tab2.addEventListener("click", () => {
  activated = 2;
  toggleTabs();
});
tab3.addEventListener("click", () => {
  activated = 3;
  toggleTabs();
});

function toggleTabs() {
  if (activated === 2) {
    tab1.style.top = "-30px";
    tab1.style.backgroundColor = "rgb(198, 196, 196)";
    tab2.style.top = "-63px";
    tab2.style.backgroundColor = "white";
    tab3.style.top = "-57px";
    tab3.style.backgroundColor = "rgb(198, 196, 196)";

    tradingViewWidgetContainer.style.visibility = "visible";
    heatmapWidgetContainer.style.visibility = "hidden";

    chartBtn.style.display = "block";
    btn.style.display = "none";
  } else if (activated === 3) {
    tab1.style.top = "-30px";
    tab1.style.backgroundColor = "rgb(198, 196, 196)";
    tab2.style.top = "-57px";
    tab2.style.backgroundColor = "rgb(198, 196, 196)";
    tab3.style.top = "-63px";
    tab3.style.backgroundColor = "white";

    tradingViewWidgetContainer.style.visibility = "hidden";
    heatmapWidgetContainer.style.visibility = "visible";
    chartBtn.style.display = "none";
    btn.style.display = "none";
  } else if (activated === 1) {
    tab1.style.top = "-38px";
    tab1.style.backgroundColor = "white";
    tab2.style.top = "-57px";
    tab2.style.backgroundColor = "rgb(198, 196, 196)";
    tab3.style.top = "-57px";
    tab3.style.backgroundColor = "rgb(198, 196, 196)";

    tradingViewWidgetContainer.style.visibility = "hidden";
    heatmapWidgetContainer.style.visibility = "hidden";

    chartBtn.style.display = "none";
    btn.style.display = "block";
  }
}
let chartBtnCounterActive = false;
chartBtn.addEventListener("click", () => {
  if (chartBtnCounterActive === false) {
    const chartCurrencyChange = document.createElement("li");
    chartCurrencyChange.innerHTML = `<div id="chartBtnMsg">set new symbol: <input id="chartSymbolInput" style="width:100px" value="${tradingSymbol}"/><button id="chart-set-button"  style="width:40px;background-color:white">Set</button><button id="quitBtnChart"style="width:40px;background-color:white;">Quit</button></div>`;

    alertsContainer.appendChild(chartCurrencyChange);

    const chartBtnMsg = document.getElementById("chartBtnMsg");
    // chartCurrencyChange.style.zIndex = 5;
    quitBtnChart.addEventListener("click", () => {
      location.reload();
      console.log("done");
    });

    const chartSetButton = document.getElementById("chart-set-button");
    // chartSetButton.focus();
    chartSetButton.addEventListener("click", () => {
      tradingSymbol = chartSymbolInput.value;

      new TradingView.widget({
        width: "100%",
        height: "573px",
        symbol: tradingSymbol,
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
        container_id: "tradingview-widget-container",
      });
    });
    chartBtnCounterActive = true;
  } else {
    console.log("the prompt its already active");
  }
});

var disqus_config = function () {
  this.page.url = "http://127.0.0.1:5500";
  this.page.identifier = PAGE_IDENTIFIER;
};
(function () {
  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://currency-catcher.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
})();

forumBtn.addEventListener("click", openForum);

function openForum() {
  disqus.style.visibility = "visible";
  insertContainer.style.visibility = "hidden";
}
// -------------autocomplete---------------
// inputFrom.addEventListener("change", () => autocomplete());
// const datalist = document.getElementById("suggestions");

// const autocomplete = () => {
//   const value = inputFrom.value;

//   const options = [
//     { value: "USD", label: "$" },
//     { value: "EUR", label: "€" },
//     { value: "GBP", label: "£" },
//     { value: "JPY", label: "��" },
//     { value: "AUD", label: "$" },
//     { value: "CAD", label: "$" },
//     { value: "CHF", label: "₣" },
//   ];

//   // Add filtered options
//   options
//     .filter((option) => option.value.includes(value))
//     .forEach((option) => {
//       inputFrom.value = option;
//       console.log(option);
//     });
// };

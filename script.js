import { currencyData } from "./database.js";

console.log(currencyData);

const leftFlag = document.getElementById("float-left-flag"); //img
const rightFlag = document.getElementById("float-right-flag"); //img
const countriesFromSelect = document.getElementById("countries-from-select");
const countriesToSelect = document.getElementById("countries-to-select");

const inputFrom = document.getElementById("input-from");
const inputTo = document.getElementById("input-to");
const resultText = document.getElementById("result-text");

const inputAmount = document.getElementById("input-amount");

const btn = document.getElementById("btn");

// ADD NEW CURRENCY
const addNewCurrencyButton = document.getElementById("add-currency");
const inputNewCurrency = document.getElementById("new-currency-input");
const inputNewCurrencyRate = document.getElementById("new-currency-rate-input");
const inputSymbols = document.getElementById("new-currency-symbol-input");

// GET FLAGS FROM SELECT
function getFlag(currency, direction) {
  direction.style.display = "block";
  if (currency === "USD") {
    direction.src = "./flags/us.svg";

    console.log("You selected: ", countriesFromSelect.value);
  } else if (currency === "CUP") {
    direction.src = "./flags/cu.svg";
  } else if (currency === "EUR") {
    direction.src = "./flags/eu.svg";
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

// ADD FLAGS TO SELECT
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

const objectRateFetcher = (valFrom, valTo) => {
  //get currencyData.currency

  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].base === valFrom) {
      console.log(currencyData[i].rates[valTo]);

      if (!currencyData[i].rates[valTo]) {
        console.log(`We couldnt find a rate for ${valTo} in our system.`);
      } else {
        return currencyData[i].rates[valTo];
      }
    }
  }
};

// CONVERT CURRENCY
const amountConverter = (amount, rate) => {
  console.log("amount: " + amount + " rate:  " + rate);
  return (amount * rate).toFixed(2);
};

btn.addEventListener("click", () => {
  if (
    isNaN(
      amountConverter(
        inputAmount.value,
        objectRateFetcher(countriesFromSelect.value, countriesToSelect.value)
      )
    )
  ) {
    resultText.innerHTML = "Sorry, We couldn't convert your amount.";
  } else {
    resultText.innerHTML =
      amountConverter(
        inputAmount.value,
        objectRateFetcher(countriesFromSelect.value, countriesToSelect.value)
      ) +
      " " +
      countriesToSelect.value;
  }
});

// ADD NEW CURRENCY
const timestamp = new Date().getTime();
currencyData.date;
const date = new Date().toISOString().slice(0, 10);

const addNewCurrency = (base, symbol, rate) => {
  //Chekear si existe la moneda
  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].base === base) {
      resultText.innerHTML = `The currency ${base} already exists in our system.`;
      return;
    }
  }

  // poner la moneda en el array
  currencyData.push({ base, symbol, rate, timestamp });
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

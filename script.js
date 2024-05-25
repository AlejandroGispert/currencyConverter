const currencyData = [
  { currency: "CUP", symbol: "&#36;", rate: 25.75 }, // Corrected rate for CUP
  { currency: "USD", symbol: "&#36;", rate: 1.0 },
  { currency: "EUR", symbol: "&#8364;", rate: 1.1686 },
  { currency: "GBP", symbol: "&#163;", rate: 1.3047 },
  { currency: "JPY", symbol: "&#165;", rate: 139.33 },
  { currency: "AUD", symbol: "&#36;", rate: 1.5489 },
  { currency: "CAD", symbol: "&#36;", rate: 1.3641 },
  { currency: "CHF", symbol: "&#67;&#72;&#70;", rate: 0.8998 },
  { currency: "CNY", symbol: "&#165;", rate: 7.0747 },
  { currency: "SEK", symbol: "&#107;&#114;", rate: 10.9637 },
  { currency: "NZD", symbol: "&#36;", rate: 1.7249 },
];
//console.log(currencyData);

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

const objectRateFetcher = (val) => {
  //get currencyData.currency

  if (val === countriesFromSelect.value) {
    return 1;
  } else {
    for (let i = 0; i < currencyData.length; i++) {
      if (currencyData[i].currency === val) {
        console.log(currencyData[i].rate);
        return currencyData[i].rate;
      }
    }
  }
};

// CONVERT CURRENCY
const amountConverter = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

btn.addEventListener("click", () => {
  resultText.innerHTML =
    amountConverter(
      inputAmount.value,
      objectRateFetcher(countriesToSelect.value)
    ) +
    " " +
    countriesToSelect.value;
});

const addNewCurrency = (currency, symbol, rate) => {
  //Chekear si existe la moneda
  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].currency === currency) {
      resultText.innerHTML = `The currency ${currency} already exists in our system.`;
      return;
    }
  }

  // poner la moneda en el array
  currencyData.push({ currency, symbol, rate });
  resultText.innerHTML = `The currency ${currency} was added successfully to our system.`;
};

addNewCurrencyButton.addEventListener("click", () => {
  addNewCurrency(inputNewCurrency.value, "00000", inputNewCurrencyRate.value);
});

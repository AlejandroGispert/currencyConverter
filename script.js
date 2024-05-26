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

// ------------------ADD NEW CURRENCY------------------
const addNewCurrencyButton = document.getElementById("add-currency");
const inputNewCurrency = document.getElementById("new-currency-input");
const inputNewCurrencyRate = document.getElementById("new-currency-rate-input");
const inputSymbols = document.getElementById("new-currency-symbol-input");

const suggestions = document.getElementById("suggestions");

// ------------------GET FLAGS FROM SELECT------------------
function getFlag(currency, direction) {
  direction.style.visibility = "visible";

  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].base === currency) {
      direction.src = currencyData[i].flag;

      console.log("You selected: ", countriesFromSelect.value);
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

//------------------ ADD FLAGS TO SELECT------------------
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

// ------------------CONVERT CURRENCY------------------
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
currencyData.date;
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

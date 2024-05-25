const currencyData = [
  {
    currency: "CUP",
    symbol: "&#36;", // Dollar sign ($)
    rate: 0.042,
  },

  {
    currency: "USD",
    symbol: "&#36;", // Dollar sign ($)
  },
  {
    currency: "EUR",
    symbol: "&#8364;", // Euro sign (€)
  },
  {
    currency: "GBP",
    symbol: "&#163;", // Pound sign (£)
  },
  {
    currency: "JPY",
    symbol: "&#165;", // Yen sign (¥)
  },
  {
    currency: "AUD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
  },
  {
    currency: "CAD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
  },
  {
    currency: "CHF",
    symbol: "&#67;&#72;&#70;", // Swiss Franc (CHF - no single HTML entity)
  },
  {
    currency: "CNY",
    symbol: "&#165;", // Yuan sign (¥) - same as JPY
  },
  {
    currency: "SEK",
    symbol: "&#107;&#114;", // Swedish Krona (kr)
  },
  {
    currency: "NZD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
  },
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

// GET FLAGS FROM SELECT
function getFlag(currency, direction) {
  direction.style.display = "block";
  if (currency === "dollar") {
    direction.src = "./flags/us.svg";

    console.log("You selected: ", countriesFromSelect.value);
  } else if (currency === "cuban-peso") {
    direction.src = "./flags/cu.svg";
  } else if (currency === "euro") {
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

const objectRateFetcher = () => {
  //get currencyData.currency

  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].currency === countriesToSelect.value) {
      console.log(currencyData[i].rate);
      return currencyData[i].rate;
    }
  }
};

// CONVERT CURRENCY
const amountConverter = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

btn.addEventListener("click", () => {
  resultText.innerHTML =
    amountConverter(inputAmount.value, objectRateFetcher()) +
    " " +
    countriesToSelect.value;
});

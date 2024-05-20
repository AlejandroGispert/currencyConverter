const currencyData = [
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
  // Add more currencies and their symbols as needed
];

console.log(currencyData);

const leftFlag = document.getElementById("float-left-flag"); //img
const rightFlag = document.getElementById("float-right-flag"); //img
const countriesFromSelect = document.getElementById("countries-from-select");
const countriesToSelect = document.getElementById("countries-to-select");

const inputFrom = document.getElementById("input-from");
const inputTo = document.getElementById("input-to");

// GET FLAGS FROM SELECT
function getFlag(currency, direction) {
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

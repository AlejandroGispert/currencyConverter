const currencyData = [
  {
    base: "CUP",
    symbol: "&#36;", // Dollar sign ($)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      CUP: 24.0,
    },
  },
  {
    base: "USD",
    symbol: "&#36;", // Dollar sign ($)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      USD: 1.0,
    },
  },
  {
    base: "EUR",
    symbol: "&#8364;", // Euro sign (€)
    timestamp: 1717691834,
    base: "USD",
    date: "2024-05-25",
    rates: {
      EUR: 0.92,
    },
  },
  {
    base: "GBP",
    symbol: "&#163;", // Pound sign (£)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      GBP: 0.79,
    },
  },
  {
    base: "JPY",
    symbol: "&#165;", // Yen sign (¥)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      JPY: 139.65,
    },
  },
  {
    base: "AUD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      AUD: 1.5,
    },
  },
  {
    base: "CAD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      CAD: 1.36,
    },
  },
  {
    base: "CHF",
    symbol: "&#67;&#72;&#70;", // Swiss Franc (CHF - no single HTML entity)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      CHF: 0.89,
    },
  },
  {
    base: "CNY",
    symbol: "&#165;", // Yuan sign (¥) - same as JPY
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      CNY: 7.06,
    },
  },
  {
    base: "SEK",
    symbol: "&#107;&#114;", // Swedish Krona (kr)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      SEK: 10.85,
    },
  },
  {
    base: "NZD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      NZD: 1.6,
    },
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
      if (currencyData[i].base === val) {
        console.log(currencyData[i].rates[val]);
        return currencyData[i].rates[val];
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

const addNewCurrency = (base, symbol, rate) => {
  //Chekear si existe la moneda
  for (let i = 0; i < currencyData.length; i++) {
    if (currencyData[i].currency === currency) {
      resultText.innerHTML = `The currency ${currency} already exists in our system.`;
      return;
    }
  }

  const timestamp = new Date().getTime();
  // poner la moneda en el array
  currencyData.push({ base, symbol, rate, timestamp });
  resultText.innerHTML = `The currency ${currency} was added successfully to our system.`;
};

addNewCurrencyButton.addEventListener("click", () => {
  if (inputNewCurrency.value === "" || inputNewCurrencyRate.value === "") {
    resultText.innerHTML = "Please fill all the fields.";
  } else {
    addNewCurrency(inputNewCurrency.value, "00000", inputNewCurrencyRate.value);
  }
});

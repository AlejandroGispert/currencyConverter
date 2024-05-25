const currencyData = [
  {
    base: "CUP",
    symbol: "&#36;", // Dollar sign ($)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      CUP: 1.0,
      USD: 0.0417,
      EUR: 0.0383,
      GBP: 0.033,
      JPY: 5.8,
      AUD: 0.062,
      CAD: 0.057,
      CHF: 0.037,
      CNY: 0.29,
      SEK: 0.092,
      NZD: 0.026,
    },
  },
  {
    base: "USD",
    symbol: "&#36;", // Dollar sign ($)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 139.65,
      AUD: 1.5,
      CAD: 1.36,
      CHF: 0.89,
      CNY: 7.06,
      SEK: 10.85,
      NZD: 1.6,
      CUP: 24.0,
    },
  },
  {
    base: "EUR",
    symbol: "&#8364;", // Euro sign (€)
    timestamp: 1717691834,

    date: "2024-05-25",
    rates: {
      EUR: 1.0,
      USD: 1.09,
      GBP: 0.86,
      JPY: 151.9,
      AUD: 1.63,
      CAD: 1.48,
      CHF: 0.97,
      CNY: 7.67,
      SEK: 11.8,
      NZD: 1.74,
      CUP: 26.1,
    },
  },
  {
    base: "GBP",
    symbol: "&#163;", // Pound sign (£)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      GBP: 1.0, // Base currency rate
      USD: 1.27,
      EUR: 1.16,
      JPY: 175.85,
      AUD: 2.06,
      CAD: 1.91,
      CHF: 1.12,
      CNY: 8.91,
      SEK: 13.67,
      NZD: 2.21,
      CUP: 30.3,
    },
  },
  {
    base: "JPY",
    symbol: "&#165;", // Yen sign (¥)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      JPY: 1.0, // Base currency rate
      USD: 0.0072,
      EUR: 0.0066,
      GBP: 0.0057,
      AUD: 0.0117,
      CAD: 0.0097,
      CHF: 0.0064,
      CNY: 0.064,
      SEK: 0.098,
      NZD: 0.016,
      CUP: 0.172,
    },
  },
  {
    base: "AUD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      AUD: 1.0, // Base currency rate
      USD: 0.67,
      EUR: 0.61,
      GBP: 0.49,
      JPY: 93.1,
      CAD: 0.91,
      CHF: 0.54,
      CNY: 4.73,
      SEK: 7.23,
      NZD: 1.07,
      CUP: 16.0,
    },
  },
  {
    base: "CAD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      CAD: 1.0, // Base currency rate
      USD: 0.74,
      EUR: 0.68,
      GBP: 0.52,
      JPY: 102.6,
      AUD: 1.1,
      CHF: 0.65,
      CNY: 5.2,
      SEK: 7.98,
      NZD: 1.18,
      CUP: 17.54,
    },
  },
  {
    base: "CHF",
    symbol: "&#67;&#72;&#70;", // Swiss Franc (CHF - no single HTML entity)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      CHF: 1.0, // Base currency rate
      USD: 1.12,
      EUR: 1.03,
      GBP: 0.89,
      JPY: 158.1,
      AUD: 1.85,
      CAD: 1.54,
      CNY: 8.1,
      SEK: 12.28,
      NZD: 1.72,
      CUP: 27.03,
    },
  },
  {
    base: "CNY",
    symbol: "&#165;", // Yuan sign (¥) - same as JPY
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      CNY: 1.0, // Base currency rate
      USD: 0.14,
      EUR: 0.13,
      GBP: 0.11,
      JPY: 19.8,
      AUD: 0.21,
      CAD: 0.19,
      CHF: 0.12,
      SEK: 1.74,
      NZD: 0.25,
      CUP: 3.45,
    },
  },
  {
    base: "SEK",
    symbol: "&#107;&#114;", // Swedish Krona (kr)
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      SEK: 1.0, // Base currency rate
      USD: 0.092,
      EUR: 0.084,
      GBP: 0.073,
      JPY: 12.85,
      AUD: 0.138,
      CAD: 0.125,
      CHF: 0.081,
      CNY: 0.575,
      NZD: 0.092,
      CUP: 10.87,
    },
  },
  {
    base: "NZD",
    symbol: "&#36;", // Dollar sign ($) - same as USD
    timestamp: 1717691834,
    date: "2024-05-25",
    rates: {
      NZD: 1.0, // Base currency rate
      USD: 0.625,
      EUR: 0.575,
      GBP: 0.452,
      JPY: 87.06,
      AUD: 0.935,
      CAD: 0.85,
      CHF: 0.58,
      CNY: 4.41,
      SEK: 6.52,
      CUP: 38.46,
    },
  },
];

export { currencyData };

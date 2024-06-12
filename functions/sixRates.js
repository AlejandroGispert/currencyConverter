// functions/sixRates.js

exports.handler = async function (event, context) {
  const fetch = (await import("node-fetch")).default;

  const baseCurrency = event.queryStringParameters.base || "USD"; // Default to USD if no base currency is specified
  const currencies = "CAD,GBP,JPY,EUR,USD,DKK"; // Specify currencies or make dynamic based on query parameters

  const forexRateWebAdress = `https://api.forexrateapi.com/v1/latest?${process.env.FOREX_API_KEY}&base=${baseCurrency}&currencies=${currencies}`;

  try {
    const response = await fetch(forexRateWebAdress);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Adjust for security
      },
      body: JSON.stringify(data.rates),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch rates" }),
    };
  }
};

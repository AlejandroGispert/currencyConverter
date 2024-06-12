// functions/api.js

exports.handler = async function (event, context) {
  // Extract query parameters
  const { from, to } = event.queryStringParameters || {};

  // Validate input
  if (!from || !to) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing "from" or "to" currency code.' }),
    };
  }

  // Define your API endpoint and key
  const apiUrl = `https://api.forexrateapi.com/v1/latest?${process.env.FOREX_API_KEY}&base=${from}&currencies=${to}`; // Replace with your actual API endpoint and parameters

  try {
    const fetch = (await import("node-fetch")).default; // Dynamically import node-fetch for ESM compatibility

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Assuming the API returns a conversion rate in a field named 'rate'
    const conversionRate = data.rate; // Adjust based on the actual API response structure

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Adjust for security
      },
      body: JSON.stringify({ conversionRate }),
    };
  } catch (error) {
    console.error("Failed to fetch conversion rate:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching conversion rate." }),
    };
  }
};

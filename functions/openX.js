// functions/api.js

exports.handler = async function (event, context) {
  // Define your API endpoint and key
  const apiUrl = `https://openexchangerates.org/api/currencies.json?${process.env.OPENX_API_KEY}&base=USD`;

  try {
    const fetch = (await import("node-fetch")).default; // Dynamically import node-fetch for ESM compatibility

    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error("API request failed:" + response.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("API response:", data);

    const currencies = data;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Adjust for security
      },
      body: JSON.stringify({ currencies }),
    };
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching currencies." }),
    };
  }
};

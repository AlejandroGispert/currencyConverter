exports.handler = async function (event, context) {
  const fetch = (await import("node-fetch")).default;

  const pad = (number) => (number < 10 ? `0${number}` : number);

  const today = new Date();
  const year = today.getFullYear();
  const month = pad(today.getMonth() + 1);
  const day = pad(today.getDate());

  const date_from = `${year}-${month}-${day} 00:00:01`;
  const date_to = `${year}-${month}-${day} 01:00:01`;

  const eltoqueWebApi = `https://tasas.eltoque.com/v1/trmi?date_from=${encodeURIComponent(
    date_from
  )}&date_to=${encodeURIComponent(date_to)}`;

  try {
    console.log("Fetching from eltoqueWebApi:", eltoqueWebApi);

    const response = await fetch(eltoqueWebApi, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${process.env.ELTOQUE_API_KEY}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Parsed response data:", data);

    let specificCurrency;
    for (let i = 0; i < data.tasas.length; i++) {
      if (Object.keys(data.tasas)[key] === "MLC") {
        specificCurrency = Object.values(data.tasas)[key];
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "https://currency-backend.netlify.app", // Adjust for security
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(specificCurrency),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch rates" }),
    };
  }
};

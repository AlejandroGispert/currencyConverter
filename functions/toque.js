exports.handler = async function (event, context) {
  const fetch = (await import("node-fetch")).default;

  const eltoqueWebApi = `https://tasas.eltoque.com/v1/trmi`;

  try {
    console.log("Fetching from eltoqueWebApi:", eltoqueWebApi);

    const response = await fetch(eltoqueWebApi, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ELTOQUE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Parsed response data:", data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "https://currency-backend.netlify.app", // Adjust for security
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch rates" }),
    };
  }
};

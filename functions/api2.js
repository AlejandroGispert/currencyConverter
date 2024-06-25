exports.handler = async function (event, context) {
  const fetch = (await import("node-fetch")).default; // Dynamically import
  // Extract query parameters or body from the event object
  // For simplicity, assuming the prompt is passed as a query parameter

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const prompt =
    "whats the 3 most volatile currency pairs of today according with Investing.com, in 100 characters";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        organization: "org-HqVA4E9x1mggHEq8ZUM3j4Ht",
        project: "proj_2WoHv9T9KMZMrsc73Jwe91GN",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.choices[0].message.content),
    };
  } catch (error) {
    console.error("Failed to get AI response:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error contacting AI." }),
    };
  }
};

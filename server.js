require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3001; // You can choose any port that's available

// app.use(json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Adjust the origin as needed for security
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Your existing routes and app.listen call

// Example endpoint that returns configuration

app.get("/hello", (req, res) => {
  console.log("Hola");
  res.send("Hello, World!");
});

app.get("/api", async (req, res) => {
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

        max_tokens: 100, // Adjust based on your needs
        n: 1,
        stop: null,
        temperature: 0.7, // Adjust creativity, 0.0 to 1.0
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return res.json(data.choices[0].message.content);
  } catch (error) {
    console.error("Failed to get AI response:", error);
    return res.status(500).json({ error: "Error contacting AI." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const express = require("express");
// const fetch = require("node-fetch");
// const dotenv = require("dotenv");
// dotenv.config();
// const app = express();
// app.use(express.json());

// app.post("/api/ai-response", async (req, res) => {
//   const { prompt } = req.body;
//   const apiKey = process.env.API_KEY; // Load your API key from environment variables
//   const apiUrl = "https://api.openai.com/v1/chat/completions"; // Your API endpoint

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 100,
//         n: 1,
//         stop: null,
//         temperature: 0.7,
//       }),
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Failed to get AI response:", error);
//     res.status(500).json({ error: "Error contacting AI." });
//   }
// });

// app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/", async (req, res) => {
  const EXCHANGE_API_URL =
    "https://www.pathofexile.com/api/trade/exchange/Crucible";
  const exchangeRequestConfig = {
    headers: {
      accept: "*/*",
      "content-type": "application/json",
    },
    body: '{"query":{"status":{"option":"online"},"have":["chaos"],"want":["the-enlightened"],"minimum":2},"sort":{"have":"asc"},"engine":"new"}',
    method: "POST",
  };

  try {
    const response = await fetch(EXCHANGE_API_URL, exchangeRequestConfig);
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

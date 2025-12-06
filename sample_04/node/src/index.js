const express = require("express");
const { createClient } = require("redis");

const app = express();
const port = 3000;

// Redis client
const client = createClient({
  url: "redis://node:6379"   // change if needed
});

client.on("error", (err) => console.error("Redis Error:", err));

async function start() {
  await client.connect();

  app.get("/", async (req, res) => {
    // Increment a key "counter"
    const value = await client.incr("counter");
    res.send(`Counter value: ${value}`);
  });

  app.listen(port, () => {
    console.log(`Server running on http://node:${port}`);
  });
}

start();
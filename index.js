const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  // port: 6379, // This is the default value
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      return res.status(500).send("Error retrieving visit count");
    }
    visits = parseInt(visits, 10);
    res.status(200).send("Number of visits is: " + visits);
    client.set("visits", visits + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});

const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/hello", (req, res) => {         // <- do we need this???
  res.send("Hello Vite + React!");
});


// ALL AUCTIONS PRODUCTS ROUTE

app.get({/*route name */}, (req, res) => {
res.send('Look At All These Auctions!')});

const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);

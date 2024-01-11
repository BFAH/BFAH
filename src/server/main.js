const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);

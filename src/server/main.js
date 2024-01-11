const express = require("express");
const ViteExpress = require("vite-express");
require("dotenv").config();

const app = express();
app.use(express.json());



const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);

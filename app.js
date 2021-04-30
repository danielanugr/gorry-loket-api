if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

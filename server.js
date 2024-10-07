const dotEnv = require("dotenv");

const connectDB = require("./database");

dotEnv.config();

const app = require("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((e) => console.log(e));

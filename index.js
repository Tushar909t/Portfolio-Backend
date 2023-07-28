const app = require("./app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Run Fail");
  } else {
    console.log("Server Run @5000");
  }
});

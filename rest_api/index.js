const express = require("express");
const fs = require("fs/promises");
const app = express();

//extra functions
function readAllData() {
  return fs.readFile("data.json", "utf-8").then(function (data) {
    return JSON.parse(data.toString());
  });
}

app.get("/users", function (req, res) {
  readAllData().then(function (data) {
    res.send(data);
  });
});

app.post("/users", function (req, res) {
  const newUser = req.body;
  console.log("--new-user--", newUser);
  readAllData()
    .then(function (data) {
      data.push(newUser);
      return fs.writeFile("data.json", JSON.stringify(data));
    })
    .then(function () {
      res.send("user successfully created");
    })
    .catch(function (error) {
      res.send("user not created");
    });
}); // <-- added missing closing bracket

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

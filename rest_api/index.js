const express = require("express");
const fs = require("fs/promises");
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Function to read all data from the JSON file
function readAllData() {
  return fs.readFile("data.json", "utf-8").then(function (data) {
    return JSON.parse(data.toString());
  });
}

// GET route to retrieve all users
app.get("/users", function (req, res) {
  readAllData().then(function (data) {
    res.send(data);
  });
});

// POST route to create a new user
app.post("/users", function (req, res) {
  const newUser = req.body;
  console.log("--new-user--", newUser);
  readAllData()
    .then(function (data) {
      data.push(newUser);
      return fs.writeFile("data.json", JSON.stringify(data));
    })
    .then(function () {
      res.send("User successfully created");
    })
    .catch(function (error) {
      res.send("User not created");
    });
});

// PUT route to update an existing user
app.put("/users/:id", function (req, res) {
  const userId = req.params.id;
  const updatedUser = req.body;
  readAllData()
    .then(function (data) {
      const userIndex = data.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        data[userIndex] = updatedUser;
        return fs.writeFile("data.json", JSON.stringify(data));
      } else {
        throw new Error("User not found");
      }
    })
    .then(function () {
      res.send("User successfully updated");
    })
    .catch(function (error) {
      res.send("User not updated: " + error.message);
    });
});

// DELETE route to remove a user
app.delete("/users/:id", function (req, res) {
  const userId = req.params.id;
  readAllData()
    .then(function (data) {
      const updatedData = data.filter((user) => user.id !== userId);
      if (updatedData.length !== data.length) {
        return fs.writeFile("data.json", JSON.stringify(updatedData));
      } else {
        throw new Error("User not found");
      }
    })
    .then(function () {
      res.send("User successfully deleted");
    })
    .catch(function (error) {
      res.send("User not deleted: " + error.message);
    });
});

// Start the server
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});

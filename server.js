const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(bodyParser.json());

// Create an SQLite in-memory database
const db = new sqlite3.Database(":memory:");

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      country VARCHAR(2) DEFAULT NULL,
      city VARCHAR(255) DEFAULT NULL,
      region VARCHAR(255) DEFAULT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      placeID VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      numPeople INTEGER NOT NULL,
      trending INTEGER NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS WaitTimes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      locationID INTEGER NOT NULL,
      waitTime INTEGER NOT NULL,
      city VARCHAR(255) NOT NULL,
      region VARCHAR(255) NOT NULL,
      country VARCHAR(2) NOT NULL,
      FOREIGN KEY (locationID) REFERENCES Locations(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS LocationUpdates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      locationID INTEGER NOT NULL,
      numPeople INTEGER NOT NULL,
      waitTime INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (locationID) REFERENCES Locations(id)
    )
  `);
});

// Endpoint to add a user
app.post("/addUser", (req, res) => {
  const { firstName, lastName, email, country, city, region } = req.body;

  db.run(
    "INSERT INTO Users (firstName, lastName, email, country, city, region) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, country, city, region],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error adding user" });
      }

      res.json({
        success: true,
        message: "User added successfully",
        userId: this.lastID,
      });
    }
  );
});

// Endpoint to add a location
app.post("/addLocation", (req, res) => {
  const {
    name,
    numPeople,
    trending,
    placeID,
    waitTime,
    city,
    region,
    country,
  } = req.body;

  db.run(
    "INSERT INTO Locations (placeID, name, numPeople, trending) VALUES (?, ?, ?, ?)",
    [placeID, name, numPeople, trending],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error adding location" });
      }

      const locationId = this.lastID;

      db.run(
        "INSERT INTO WaitTimes (locationID, waitTime, city, region, country) VALUES (?, ?, ?, ?, ?)",
        [locationId, waitTime, city, region, country],
        function (err) {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "Error adding wait time" });
          }

          res.json({
            success: true,
            message: "Location added successfully",
            locationId,
          });
        }
      );
    }
  );
});

// Additional endpoints can be added similarly
// Endpoint to display all users
app.get("/displayAllUsers", (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error retrieving users" });
    }

    res.json({ success: true, users: rows });
  });
});

// Close the database connection when the server is stopped
const server = app.listen(4000, function () {
  console.log("Server running on port 4000...");
});

process.on("SIGINT", function () {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
});

// added necessary dependencies 
const router = require("express").Router();
let data = require("../../db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// get request to api/notes
router.get("/notes", (req, res) => {
  console.log({ data });
  res.json(data);
});

// delete request to api/notes/:id
// gets the id from the request parameters and filters the data array to remove the note with the matching id 
router.delete("/notes/:id", (req, res) => {
  
  data = data.filter((el) => el.id !== req.params.id);
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});
// post request to api/notes
// creates new UUID, takes note out of request body, adds id to note, adds note to data array, writes data array to db.json, and returns the data array as a response 
router.post("/notes", (req, res) => {

  const newNote = { ...req.body, id: uuidv4() };
  console.log(newNote);
  console.log(req.body);
  data.unshift(newNote);

  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});

module.exports = router;
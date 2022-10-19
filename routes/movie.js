const router = require("express").Router();
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const Movies = require("../model/Movies");
//movies

router.post("/movies", async (req, res) => {
  console.log(req.body);
  try {
    let resp = await Movies.create(req.body);
    console.log(resp);
    res.status(200).send({
      message: "Movie added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.find();
    console.log(movies);
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});
router.get("/movies/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const movies = await Movies.findById(id);
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

router.put("/movies/:id", async (req, res) => {
  const {
    name,
    poster,
    rating,
    summary,
    trailer,
    screen,
    languages,
    certificate,
  } = req.body;
  const id = req.params.id;
  try {
    await Movies.findByIdAndUpdate(id, {
      name,
      poster,
      rating,
      summary,
      trailer,
      screen,
      languages,
      certificate,
    });
    res.json({
      message: "Movie Details updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/movies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Movies.findByIdAndRemove(id);
    res.json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

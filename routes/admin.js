const router = require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin");
const Movies = require("../model/Admin");

router.post("/onlyadmin", async (req, res) => {
  try {
    await Admin.create(req.body);
    res.status(200).send({
      message: "Movie added successfully by admin",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/onlyadmin", async (req, res) => {
  try {
    const adminmovies = await Admin.find();
    console.log(adminmovies);
    res.json(adminmovies);
  } catch (error) {
    console.log(error);
  }
});
router.get("/onlyadmin/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const adminmovies = await Admin.findById(id);
    res.json(adminmovies);
  } catch (error) {
    console.log(error);
  }
});
router.put("/onlyadmin/:id", async (req, res) => {
  const { name, rating, trailer, screen, languages, certificate } = req.body;
  const id = req.params.id;
  try {
    await Admin.findByIdAndUpdate(id, {
      name,
      rating,
      trailer,
      screen,
      languages,
      certificate,
    });
    res.json({
      message: "Movie Details updated successfully by admin",
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/onlyadmin/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Admin.findByIdAndDelete(id);
    res.json({
      message: "Movie deleted successfully by admin",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

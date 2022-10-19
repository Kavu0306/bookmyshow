const router = require("express").Router();
const bcrypt = require("bcrypt");
const Theatre = require("../model/Theatre");
//theatres

router.post("/theatres", async (req, res) => {
  try {
    let resp = await Theatre(req.body);
    await resp.save();
    console.log(resp);
    res.status(200).send({
      message: "Theatre added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/theatres", async (req, res) => {
  try {
    const theatre = await Theatre.find();
    console.log(theatre);
    res.json(theatre);
  } catch (error) {
    console.log(error);
  }
});

router.get("/theatres/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const theatre = await Theatre.findById(id);
    res.json(theatre);
  } catch (error) {
    console.log(error);
  }
});

router.put("/theatres/:id", async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  try {
    const theatre = await Theatre.findByIdAndUpdate(id, { name });
    res.json(theatre);
    res.json({
      message: "Theatre Name updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/theatres/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Theatre.findByIdAndRemove(id);
    res.json({
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

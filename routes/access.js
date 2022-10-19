const router = require("express").Router();
const User = require("../model/Access");
const bcryptjs = require("bcryptjs");

//user registeration

router.post("/usersregister", async (req, res) => {
  try {
    const { username, email } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(req.body.password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/usersregister", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch {
    console.log(error);
  }
});
router.get("/usersregister/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/usersregister/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You have successfully updated your account!");
  }
});

router.delete("/usersregister/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/userlogin", async (req, res) => {
  try {
    let userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) {
      const match = await bcryptjs.compare(
        req.body.password,
        userCheck.password
      );
      if (match) {
        res.json({
          message: "User logged in successfully",
        });
      } else {
        res.json({
          error: "Password is incorrect",
        });
      }
    } else {
      res.json({
        error: "  User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//admin registration-logging inn

router.post("/adminregister", async (req, res) => {
  try {
    const { username, email } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(req.body.password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//adminregister- output
router.get("/adminregister", async (req, res) => {
  try {
    const admins = await User.find();
    res.json(admins);
  } catch (error) {
    console.log(error);
  }
});

//adminlogin
router.post("/adminlogin", async (req, res) => {
  try {
    let adminCheck = await User.findOne({ username: req.body.username });
    if (adminCheck) {
      const match = await bcryptjs.compare(
        req.body.password,
        adminCheck.password
      );
      if (match) {
        res.json({
          message: "admin logged in successfully",
        });
      } else {
        res.json({
          error: "Password is incorrect",
        });
      }
    } else {
      res.json({
        error: "admin not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

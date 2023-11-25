const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SuperUser, User, Tutor, Tutee } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor, checkIfSuperUser } = require("../authMiddleware");

// Register New SuperUser
router.post("/", async (req, res) => {
  try {
    const { username, name, password, email } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const superUser = await SuperUser.create({
      username,
      name,
      password: passwordHash,
      email,
    });
    res.status(201).json(superUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Update password of super-user
router.put("/:id", tokenExtractor, async (req, res) => {
  const superUser = await SuperUser.findByPk(req.params.id);
  if (superUser) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    superUser.password = passwordHash;
    await superUser.save();
    res.json(superUser);
  } else {
    res.status(404).end();
  }
});

// Get details of all users/tutors/tutees under a super-user
router.get("/:id", tokenExtractor, async (req, res) => {
  const superUser = await SuperUser.findByPk(req.params.id, {
    include: [{ model: Tutee }, { model: Tutor }],
  });
  res.json(superUser);
});

// Get token of a user defined by a super-user
router.get("/user/:id", tokenExtractor, checkIfSuperUser, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  console.log(user), console.log(req.decodedToken);
  if (user.superUserId != req.decodedToken.id){
    res.status(401).json({
      error: "Unauthorized access of a user"
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = router;

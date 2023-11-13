const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SuperUser, User } = require("../models");
const { Op } = require("sequelize");
const tokenExtractor = require("../authMiddleware");


router.get("/:id", tokenExtractor, async (req, res) => {
  const superUser = await SuperUser.findByPk(req.params.id, {
    include: {
      model: User,
    },
  });
  res.json(superUser);
});

router.post("/", async (req, res) => {
  const { username, name, password, email} = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const superUser = await SuperUser.create({
    username,
    name,
    password: passwordHash,
    email,
  });
  res.status(201).json(superUser);
});

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

module.exports = router;

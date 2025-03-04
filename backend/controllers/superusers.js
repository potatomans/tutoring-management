const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SuperUser, User, Tutor, Tutee, Pairing } = require("../models");
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

// Get details of all pairings under a super-user
router.get("/pairings", tokenExtractor, checkIfSuperUser, async (req, res) => {
  try{
    const pairings = await Pairing.findAll({
      // where: {
      //   superUserId: req.decodedToken.id
      // }, // TODO: change the where because pairings doesnt have a superuserid column
      include: [
        {
          model: User,
          where: {
            superUserId: req.decodedToken.id,
          }
        },
        {
          model: Tutor,
        },
        {
          model: Tutee,
        },
      ]
    })
    res.json(pairings);
  } catch(error) {
    console.log(error)
    res.status(500).json({error})
  }
});

// Get details of all tutors under a super-user
router.get("/tutors", tokenExtractor, async (req, res) => {
  try{
    const tutors = await Tutor.findAll({
      where: {
        superUserId: req.decodedToken.id
      }
    })
    res.json(tutors);
  } catch(error){
    console.log(error)
    res.status(500).json({error})
  }
});

// Get details of all tutees under a super-user
router.get("/tutees", tokenExtractor, async (req, res) => {
  try{
    const tutees = await Tutee.findAll({
      where: {
        superUserId: req.decodedToken.id
      }
    })
    res.json(tutees);
  }catch(error){
    console.log(error)
    res.status(500).json({error})
  }
});

// Get details of all user under a super-user
router.get("/users", tokenExtractor, checkIfSuperUser, async (req, res) => {
  try{
    // console.log("superuserId", req.decodedToken.id)
    const users = await User.findAll({
      where: {
        superUserId: req.decodedToken.id
      }
    })
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
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
    superUserId: user.superUserId
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      id: user.id,
      superUserId: user.superUserId,
    });
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
    // include: {
    //   model: Tutor
    // },
  });
  res.json(superUser);
});

// Create a new user
router.post("/users", tokenExtractor, checkIfSuperUser, async (req, res)=>{
  console.log("Adding new User")
  const { username, name, password, email, organisation } =
    req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  // console.log(req.decodedToken)
  const user = await User.create({
    username,
    name,
    password: passwordHash,
    email,
    organisation,
    superUserId: req.decodedToken.id,
  });
  res.status(201).json(user);
})

module.exports = router;

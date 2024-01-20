const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Pairing, Tutor, Tutee } = require('../models')
const { Op } = require('sequelize')
const {tokenExtractor, checkIfNotSuperUser} = require('../authMiddleware')

// Find user of a given user-name
router.get('/', tokenExtractor, async (req, res) => {
    const users = await User.findAll({
        where: {
            username: req.query.username ? {[Op.iLike]: '%' + req.query.username + '%'} : {[Op.substring]: ''}
        }})
    res.json(users)
})

// Find user of given Id & pairing created by him
router.get('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Pairing
        }
    })
    res.json(user)
})

// Create a new user
router.post('/', async (req, res) => {
    const { username, name, password, email, organisation, superUserId } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ username, name, password: passwordHash, email, organisation, superUserId })
    res.status(201).json(user)
})

// Change password of existing user
router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        user.password = passwordHash
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

// create tutor
router.post('/tutor', tokenExtractor, checkIfNotSuperUser, async (req, res) => {
    try{
        const tutor = req.body
        tutor.userId = req.decodedToken.id
        tutor.superUserId = req.decodedToken.superUserId
        const tutorSaved = await Tutor.create(tutor);
        res.status(201).json(tutorSaved)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// create tutee
router.post('/tutee', tokenExtractor, checkIfNotSuperUser, async (req, res) => {
    try{
        const tutee = req.body
        tutee.userId = req.decodedToken.id
        tutee.superUserId = req.decodedToken.superUserId
        const tuteeSaved = await Tutee.create(tutee);
        res.status(201).json(tuteeSaved)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
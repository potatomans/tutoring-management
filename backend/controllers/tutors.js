const router = require('express').Router()

const { Tutor } = require('../models')

router.get('/', async (req, res) => {
    const tutors = await Tutor.findAll()
    res.json(tutors)
})

router.post('/', async (req, res) => {
    const tutor = await Tutor.create(req.body)
    res.json(tutor)
})

module.exports = router
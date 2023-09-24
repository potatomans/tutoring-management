const router = require('express').Router()

const { Tutee } = require('../models')

router.get('/', async (req, res) => {
    const tutees = await Tutee.findAll()
    res.json(tutees)
})

router.post('/', async (req, res) => {
    const tutee = await Tutee.create(req.body)
    res.json(tutee)
})

module.exports = router
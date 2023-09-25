const router = require('express').Router()

const { Pairing } = require('../models')

router.get('/', async (req, res) => {
    const pairings = await Pairing.findAll()
    res.json(pairings)
})

router.post('/', async (req, res) => {
    const pairing = await Pairing.create(req.body)
    res.json(pairing)
})

module.exports = router
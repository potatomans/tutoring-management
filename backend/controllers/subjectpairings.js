const router = require('express').Router()

const { SubjectPairing } = require('../models')

router.post('/', async (req, res) => {
    const subjpair = await SubjectPairing.create(req.body)
    res.status(201).json(subjpair)
})

module.exports = router

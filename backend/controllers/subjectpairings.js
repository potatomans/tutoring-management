const router = require('express').Router()

const { SubjectPairing } = require('../models')

router.post('/', async (req, res) => {
    const subjpair = await SubjectPairing.create(req.body)
    res.json(subjpair)
})

module.exports = router

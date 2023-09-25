const router = require('express').Router()

const { Session } = require('../models')

router.get('/', async (req, res) => {
    const sessions = await Session.findAll()
    res.json(sessions)
})

router.post('/', async (req, res) => {
    const session = await Session.create(req.body)
    res.json(session)
})

module.exports = router
const router = require('express').Router()

const { User, Pairing } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Pairing
        }
    })
    res.json(user)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

module.exports = router
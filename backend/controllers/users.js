const router = require('express').Router()

const { User, Pairing } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        where: {
            username: req.query.username ? {[Op.iLike]: '%' + req.query.username + '%'} : {[Op.substring]: ''}
        }})
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
    res.status(201).json(user)
})

module.exports = router
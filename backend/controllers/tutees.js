const router = require('express').Router()

const { Tutee, Tutor } = require('../models')

router.get('/', async (req, res) => {
    const tutees = await Tutee.findAll({
        include: {
            model: Tutor
        }
    })
    res.json(tutees)
})

router.get('/:id', async (req, res) => {
    const tutee = await Tutee.findByPk(req.params.id, {
        include: {
            model: Tutor
        }
    })
    res.json(tutee)
})

router.post('/', async (req, res) => {
    const tutee = await Tutee.create(req.body)
    res.json(tutee)
})

module.exports = router
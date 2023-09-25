const router = require('express').Router()

const { Tutor, Tutee } = require('../models')

router.get('/', async (req, res) => {
    const tutors = await Tutor.findAll()
    res.json(tutors)
})

router.get('/:id', async (req, res) => {
    const tutor = await Tutor.findByPk(req.params.id, {
        include: {
            model: Tutee
        }
    })
    res.json(tutor)
})

router.post('/', async (req, res) => {
    const tutor = await Tutor.create(req.body)
    res.json(tutor)
})

module.exports = router
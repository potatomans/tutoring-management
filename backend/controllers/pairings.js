const router = require('express').Router()

const { Pairing, Session, User, Subject, Tutee, Tutor } = require('../models')

router.get('/', async (req, res) => {
    const pairings = await Pairing.findAll()
    res.json(pairings)
})

router.get('/:id', async (req, res) => {
    const pairing = await Pairing.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject
            },
            {
                model: Tutee
            },
            {
                model: Tutor
            }
        ]
    })
    res.json(pairing)
})

router.post('/', async (req, res) => {
    const pairing = await Pairing.create(req.body)
    res.json(pairing)
})

module.exports = router
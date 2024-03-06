const router = require('express').Router()

const { Tutor, Tutee } = require('../models')
const { Op } = require('sequelize')
const {tokenExtractor} = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const tutors = await Tutor.findAll({
        where: {
            name: req.query.name ? {[Op.iLike]: '%' + req.query.name + '%'} : {[Op.substring]: ''}
        }
    })
    res.json(tutors)
})

router.get('/:id', tokenExtractor, async (req, res) => {
    const tutor = await Tutor.findByPk(req.params.id, {
        include: {
            model: Tutee
        }
    })
    res.json(tutor)
})

// create tutor
router.post('/', async (req, res) => {
    // req.body keys: name and endDate
    try {
        const tutor = await Tutor.create(req.body)
        res.status(201).json(tutor)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        // req.body keys: name, number and endDate
        const newTutor = req.body
        const oldTutor = await Tutor.findByPk(req.params.id)
        if (oldTutor) {
            const props = Object.keys(req.body)
            props.forEach((prop) => {
                if (!Object.keys(oldTutor.dataValues).includes(prop)) {
                    throw new Error(`Pairing does not contain property ${prop}.`)
                }
                oldTutor[prop] = newTutor[prop]
            })
            await oldTutor.save()
            res.json(oldTutor)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        console.log(error)
    }
})

module.exports = router
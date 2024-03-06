const router = require('express').Router()

const { Pairing, Session, User, Subject, Tutee, Tutor } = require('../models')
const { Op } = require('sequelize')
const {tokenExtractor} = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const pairings = await Pairing.findAll({
        include: [
            {
                model: User,
                where: {
                    id: req.decodedToken.id,
                },
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
            },
            {
                model: Tutee,
                // where: {
                //     name: req.query.tutee ? {[Op.iLike]: '%' + req.query.tutee + '%'} : {[Op.substring]: ''}
                // }
            },
            {
                model: Tutor,
                // where: {
                //     name: req.query.tutor ? {[Op.iLike]: '%' + req.query.tutor + '%'} : {[Op.substring]: ''}
                // }
            }
        ],
    })
    res.json(pairings)
})

router.get('/check-existing', tokenExtractor, async (req, res) => {
    const pairings = await Pairing.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Tutee,
                where: {
                    name: req.query.tutee ? {[Op.iLike]: '%' + req.query.tutee + '%'} : {[Op.substring]: ''}
                }
            },
            {
                model: Tutor,
                where: {
                    name: req.query.tutor ? {[Op.iLike]: '%' + req.query.tutor + '%'} : {[Op.substring]: ''}
                }
            }
        ]
    });
    res.json(pairings);
})

router.get('/:userId', tokenExtractor, async (req, res) => {
    // if (req.decodedToken.id !== Number(req.params.userId)) {
    //     throw new Error('Forbidden: You do not have access to this information.')
    // }
    const pairings = await Pairing.findAll({
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
            },
            {
                model: Tutee
            },
            {
                model: Tutor
            }
        ],
        where: {
            userId: req.params.userId
        }
    })
    res.json(pairings)
})

router.get('/user/:id', tokenExtractor, async (req, res) => {
    const pairing = await Pairing.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: Session
            },
            {
                model: Subject,
                through: {
                    attributes: []
                }
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
    res.status(201).json(pairing)
})

router.put('/:id', tokenExtractor, async (req, res) => {  
    const newPairing = req.body
    const oldPairing = await Pairing.findByPk(req.params.id)
    // newPairing keys: userId, tuteeId, tutorId, strengths, weaknesses, goals, location, level, subjectName
    if (oldPairing) {
        const props = Object.keys(req.body)
        props.forEach((prop) => {
            if (!Object.keys(oldPairing.dataValues).includes(prop)) {
                throw new Error(`Pairing does not contain property ${prop}.`)
            }
            oldPairing[prop] = newPairing[prop]
        })
        await oldPairing.save()
        res.json(oldPairing)
    } else {
        res.status(404).end()
    }
})  

router.delete('/:id', tokenExtractor, async (req, res) => {
    const pairing = await Pairing.findByPk(req.params.id)
    if (pairing) {
        await pairing.destroy()
    }
    res.status(204).end()
})

module.exports = router
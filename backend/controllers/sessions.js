const router = require('express').Router()
const mail = require('@sendgrid/mail')
const {SENDGRID_API_KEY} = require('../util/config')
mail.setApiKey(SENDGRID_API_KEY)
const { Session } = require('../models')
const {tokenExtractor} = require('../authMiddleware')

router.get('/', tokenExtractor, async (req, res) => {
    const sessions = await Session.findAll()
    res.json(sessions)
})

router.post('/', async (req, res) => {
    try{
        const session = await Session.create(req.body)
        res.status(201).json(session)
        const data = {
            to: 'heansoh@gmail.com',
            from: 'cannotcodesprint@gmail.com',
            subject: 'Testing',
            text: req.body.session.problems + req.body.pair.tutor
        }
        mail.send(data)
        res.status(201).json()
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }
})

module.exports = router
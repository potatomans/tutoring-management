const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, SuperUser } = require('../models')

// login API for normal user (volunteer manager)
router.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username: username
        }
    })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user.id,
        superUserId: user.superUserId
    }
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24 })
    console.log( "testing.........")
    res.status(200).send({token, test:0, username: user.username, name: user.name, id: user.id, superUserId: user.superUserId })
})

// login API for a Super-User
router.post('/superUser', async (req,res)=>{
    const { name, password } = req.body
    const superUser = await SuperUser.findOne({
        where: { name }
    })
    // console.log("superuser", superUser)
    const passwordCorrect = (superUser != null) && (await bcrypt.compare(password, superUser.password))
    if (!(superUser && passwordCorrect)){
        res.status(401).json({
            error: 'Invalid Username or Password'
        })
    }
    const superUserForToken = {
        email: superUser.email,
        id: superUser.id,
        name: superUser.name,
        userType: "superUser"
    }
    const token = jwt.sign(superUserForToken, process.env.SECRET, {expiresIn: 3600*24})
    res.status(200).json({
        token, 
        email: superUser.email,
        name,
        id: superUser.id,
        userType: 'superUser' 
    })

})

// login API for a Super-User
// router.post('/superUser', async (req,res)=>{
//     const {email, password} = req.body
//     const superUser = await SuperUser.findOne({
//         where:{
//             email: email
//         }
//     })
//     const passwordCorrect = (superUser != null) && (await bcrypt.compare(password, superUser.password))
//     if (!(superUser && passwordCorrect)){
//         res.status(401).json({
//             error: 'Invalid Username or Password'
//         })
//     }
//     const superUserForToken = {
//         email: superUser.email,
//         id: superUser.id,
//         name: superUser.name,
//         userType: "superUser"
//     }
//     const superUserToken = jwt.sign(superUserForToken, process.env.SECRET, {expiresIn: 3600*24})
//     res.status(200).json({
//         superUserToken, email,
//         name: superUser.name,
//         id: superUser.id,
//         userType: 'superUser' 
//     })

// })

module.exports = router
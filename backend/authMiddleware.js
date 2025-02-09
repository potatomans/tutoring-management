const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    if (authorization.substring(7) === process.env.REVOKED_TOKEN1) {
      return res.status(401).json({ error: 'token revoked' })
    }
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const checkIfSuperUser = (req,res,next) => {
  if (!req.decodedToken){
    res.status(401).json({error:"No decoded token"})
  }
  if (req.decodedToken.userType === 'superUser'){
    next()
  } else {
    res.status(401).json({error: "No superUser token found"})
  }
}

const checkIfNotSuperUser = (req, res, next) => {
  if (!req.decodedToken) {
    res.status(401).json({ error: "No decoded token" });
  }
  if (!(req.decodedToken.userType === "superUser")) {
    next();
  } else {
    res.status(401).json({ error: "Need Normal User token!" });
  }
};

module.exports = {tokenExtractor, checkIfSuperUser, checkIfNotSuperUser}

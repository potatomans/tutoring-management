const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const tuteesRouter = require('./controllers/tutees')
const tutorsRouter = require('./controllers/tutors')
const pairingsRouter = require('./controllers/pairings')
const sessionsRouter = require('./controllers/sessions')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/tutees', tuteesRouter)
app.use('/api/tutors', tutorsRouter)
app.use('/api/pairings', pairingsRouter)
app.use('/api/sessions', sessionsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
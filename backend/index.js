const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const tuteesRouter = require('./controllers/tutees')
const tutorsRouter = require('./controllers/tutors')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/tutees', tuteesRouter)
app.use('/api/tutors', tutorsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
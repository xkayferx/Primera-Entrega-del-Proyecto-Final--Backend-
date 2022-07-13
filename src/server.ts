import express from 'express'
import routes from './routes/routes'
import auth from './middlewares/auth'
import wrongRoute from './middlewares/wrongRoute'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth)
app.use('/api', routes)
app.use(wrongRoute)
app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})
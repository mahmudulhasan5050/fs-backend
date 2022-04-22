import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import movieRouter from './routers/movie'
import usersRouter from './routers/users'
import authorsRouter from './routers/authors'
import booksRouter from './routers/books'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { googleStrategy, jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(cors())
app.use(apiContentType)
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))

//passport
app.use(passport.initialize())
passport.use(googleStrategy)
passport.use(jwtStrategy)

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/authors', authorsRouter)
app.use('/api/v1/books', booksRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

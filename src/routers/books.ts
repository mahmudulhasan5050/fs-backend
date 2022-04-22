import express from 'express'
import passport from 'passport'

import adminCheck from '../middlewares/adminCheck'
import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  borrowBook,
} from '../controllers/books'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.put(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  updateBook
)
router.delete(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  deleteBook
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  createBook
)
router.post(
  '/borrow',
  passport.authenticate('jwt', { session: false }),
  borrowBook
)

export default router

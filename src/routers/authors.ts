import express from 'express'
import passport from 'passport'

import adminCheck from '../middlewares/adminCheck'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/authors'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  findAll
)
router.get(
  '/:authorId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  findById
)
router.put(
  '/:authorId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  updateAuthor
)

router.delete(
  '/:authorId',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  deleteAuthor
)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  createAuthor
)

export default router

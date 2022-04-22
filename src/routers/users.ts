import express from 'express'
import passport from 'passport'

import adminCheck from '../middlewares/adminCheck'
import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  deleteBorrowBookFromUser,
  googleLogin,
} from '../controllers/users'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  findAll
)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findById
)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)
router.delete(
  '/borrow/:userId/:borrowId',
  passport.authenticate('jwt', { session: false }),
  deleteBorrowBookFromUser
)
router.post('/', passport.authenticate('jwt', { session: false }), createUser)

export default router

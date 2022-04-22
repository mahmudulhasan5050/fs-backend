import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import Users,{UsersDocument} from '../models/Users'
import usersService from '../services/users'
import { BadRequestError, AlreadyExistError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, bookId, joinDate } = req.body
    const existingUser = await Users.findOne({ email })
    if (existingUser)
      throw new AlreadyExistError(`${existingUser.email} already exists`)
    const users = new Users({
      name,
      email,
      password,
      bookId,
      joinDate,
    })

    await usersService.create(users)
    res.json(users)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name, email, password, bookId, joinDate } = req.body
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await usersService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await usersService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/borrow/:userId/:borrowId
export const deleteBorrowBookFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, borrowId } = req.params as any
  try {
    await usersService.deleteBookFromBorrowList(userId, borrowId)
    res.status(204).json({ msg: 'delete success!!!!' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await usersService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await usersService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /google-login
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UsersDocument
    const token = jwt.sign({ email: user?.email }, JWT_SECRET)
    console.log('success!!!!!!')
    res.json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

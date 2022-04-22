import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../helpers/apiError'
import { UsersDocument } from '../models/Users'
const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UsersDocument
  if (user?.isAdmin) {
    next()
  } else {
    throw new ForbiddenError()
  }
}

export default adminCheck

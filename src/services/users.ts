import Users, { UsersDocument, BorrowedByUserType } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'

const create = async (users: UsersDocument): Promise<UsersDocument> => {
  return users.save()
}

const findById = async (userId: string): Promise<UsersDocument> => {
  const foundUser = await Users.findById(userId).populate('borrowedByUser.book')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UsersDocument[]> => {
  return Users.find().sort({ name: 1 }).populate('borrowedByUser.book')
}

const update = async (
  userId: string,
  update: Partial<UsersDocument>
): Promise<UsersDocument | null> => {
  update.isAdmin = false
  const foundUser = await Users.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UsersDocument | null> => {
  const foundUser = Users.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteBookFromBorrowList = async (userId: string, borrowId: string) => {
  const foundUser = await Users.findById(userId)

  if (!foundUser) {
    throw new NotFoundError('User not found')
  }

  const foundBorrow = foundUser.borrowedByUser.find(
    (borrow: BorrowedByUserType) => borrow?._id?.toString() === borrowId
  )

  if (!foundBorrow) {
    throw new NotFoundError('Borrow not found')
  }

  const foundUserAfterDelete = await Users.findOneAndUpdate(
    { _id: userId },
    { $pull: { borrowedByUser: { _id: foundBorrow } } },
    { new: true }
  ).then((temp) => {
    console.log(temp)
  })

  return foundUserAfterDelete
}

const findOrCreate = async (parsedToken: any) => {
  const found = await Users.findOne({ email: parsedToken.payload.email })

  if (!found) {
    const user = new Users({
      name: parsedToken.payload.name,
      email: parsedToken.payload.email,
    })
    return await user.save()
  }
  return found
}

const findByEmail = async (email: string) => {
  const found = await Users.findOne({ email })

  if (!found) {
    throw new NotFoundError('User not found')
  }
  return found
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
  findOrCreate,
  deleteBookFromBorrowList,
  findByEmail,
}

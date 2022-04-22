import Books, { BooksDocument } from '../models/Books'
import Users, { BorrowedByUserType } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BooksDocument): Promise<BooksDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BooksDocument> => {
  const foundBook = await Books.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }

  return foundBook
}

const findAll = async (): Promise<BooksDocument[]> => {
  return Books.find().sort({ name: 1 })
}

const update = async (
  bookId: string,
  update: Partial<BooksDocument>
): Promise<BooksDocument | null> => {
  const foundBook = await Books.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BooksDocument | null> => {
  const foundBook = Books.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} is not found`)
  }

  return foundBook
}

const borrowBook = async (
  bookId: string,
  userId: string,
  borrowDate: Date,
  returnDate: Date
) => {
  const userFound = await Users.findById(userId)
  const bookFound = await Books.findById(bookId)

  if (!userFound || !bookFound) {
    throw new NotFoundError('Book or user is not found')
  }

  const bookExists = userFound.borrowedByUser.some((item) => {
    return item.book.toString() === bookId
  })

  if (!bookExists) {
    const borrowBookInfo = {
      book: bookId,
      receivedDate: borrowDate,
      returnedDate: returnDate,
    }
    userFound.borrowedByUser = [...userFound.borrowedByUser, borrowBookInfo]
    userFound.save()
  }
  return userFound
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBook,
  borrowBook,
}

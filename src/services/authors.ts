import Authors, { AuthorsDocument } from '../models/Authors'
import { NotFoundError } from '../helpers/apiError'

const create = async (author: AuthorsDocument): Promise<AuthorsDocument> => {
  return author.save()
}

const findById = async (authorId: string): Promise<AuthorsDocument> => {
  const foundAuthor = await Authors.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const findAll = async (): Promise<AuthorsDocument[]> => {
  return Authors.find().sort({ name: 1 })
}

const update = async (
  authorId: string,
  update: Partial<AuthorsDocument>
): Promise<AuthorsDocument | null> => {
  let foundAuthor
  if (update.name && update.email) {
    foundAuthor = await Authors.findByIdAndUpdate(authorId, update, {
      new: true,
    })
  } else {
    foundAuthor = await Authors.findByIdAndUpdate(
      authorId,
      { $push: { bookId: update.bookId } },
      { new: true }
    )
  }

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorsDocument | null> => {
  const foundAuthor = Authors.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteAuthor,
}

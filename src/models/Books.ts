/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BooksDocument = Document & {
  name: string
  publishedYear: number
  authorName: mongoose.Types.ObjectId[]
  amount: number
  selectedFile: string
}

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  authorName: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Authors' }],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  selectedFile: {
    type: String,
  },
})

export default mongoose.model<BooksDocument>('Books', booksSchema)

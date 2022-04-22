/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { BooksDocument } from './Books'

export type BorrowedByUserType = {
  _id?: mongoose.Types.ObjectId
  book: string
  receivedDate: Date
  returnedDate: Date
}
export type UsersDocument = Document & {
  name: string
  email: string
  password?: string
  borrowedByUser: BorrowedByUserType[]
  joinDate: Date
  isAdmin: boolean
}

const borrowInfoSchema = new mongoose.Schema({
  book: { type: mongoose.Types.ObjectId, ref: 'Books' },
  receivedDate: { type: Date, default: new Date() },
  returnedDate: { type: Date, default: new Date() },
})
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  borrowedByUser: {
    type: [borrowInfoSchema],
    default: [],
  },
  joinDate: {
    type: Date,
    default: new Date(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UsersDocument>('Users', usersSchema)

/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AuthorsDocument = Document & {
  name: string
  email: string
  bookId?: mongoose.Types.ObjectId[]
}

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookId: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'Books' }],
    default: [],
  },
})

export default mongoose.model<AuthorsDocument>('Authors', authorsSchema)

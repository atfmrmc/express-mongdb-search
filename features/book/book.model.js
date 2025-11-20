import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;

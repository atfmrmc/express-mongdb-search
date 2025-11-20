import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
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

export const findAllBooks = () => {
  return Book.find({}).populate("author");
};

export default Book;

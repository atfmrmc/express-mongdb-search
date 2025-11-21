import mongoose from "mongoose";
import Author from "./Author.js";

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

bookSchema.index({
  title: "text",
  genre: "text",
  ISBN: "text",
});

bookSchema.index({ author: 1 });

const Book = mongoose.model("Book", bookSchema);

export const findAllBooks = () => {
  return Book.find({}).populate("author");
};

export const findBooks = async (query) => {
  if (!query || query.trim() === "") {
    return Book.find({}).populate("author");
  } else {
    // 1. Find authors that match the text search
    const authorMatches = await Author.find({
      $text: { $search: query },
    }).select("_id");

    const authorIds = authorMatches.map((a) => a._id);

    // 3. Find books that match  text search OR belong to the found authors
    const books = await Book.find({
      $or: [
        { $text: { $search: query } }, // Matches Book title, genre, ISBN
        { author: { $in: authorIds } }, // Matches Author Name
      ],
    }).populate("author");

    return books;
  }
};

export default Book;

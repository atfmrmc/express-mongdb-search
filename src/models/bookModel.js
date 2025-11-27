import mongoose from "mongoose";
import Author from "./authorModel.js";

// ------------ //
// -- Schema -- //
// ------------ //

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

// Create text index for searching in title, genre, and ISBN
bookSchema.index({
  title: "text",
  genre: "text",
  ISBN: "text",
});

// Set up the Book model
const Book = mongoose.model("Book", bookSchema);

// ------------- //
// -- Methods -- //
// ------------- //

// Retrieve all books & authors
export const findAllBooks = () => {
  return Book.find({}).populate("author");
};

// Search books in index by text query, including authors
export const findBooksInIndex = async (query) => {
  // 1. Find authors that match the text search
  const authorMatches = await Author.find({
    $text: { $search: query },
  }).select("_id");

  // 2. Extract author IDs from the matches
  const authorIds = authorMatches.map((a) => a._id);

  // 3. Find books that match  text search OR belong to the found authors
  const books = await Book.find({
    $or: [
      { $text: { $search: query } }, // Matches Book title, genre, ISBN
      { author: { $in: authorIds } }, // Matches Author Name
    ],
  }).populate("author");

  return books;
};

export default Book;

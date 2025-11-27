import * as Book from "../models/bookModel.js";

// Gets books with optional search
const getBooks = async (req, res) => {
  try {
    let books = [];

    // If there is no search query, get all books
    if (!req.query.search || req.query.search.trim() === "") {
      books = await Book.findAllBooks(req.query.search);
    }

    // If there is a search query, perform search
    if (req.query.search) {
      books = await Book.findBooksInIndex(req.query.search);
    }

    // Render the page with books data
    res.render("pages/book", {
      metaTitle: "Books",
      books: books,
      query: req.query.search,
    });
  } catch (error) {
    console.error("Error in displayBooks:", error);
    res.status(500).json({ message: "Error searching books", error });
  }
};

export { getBooks };

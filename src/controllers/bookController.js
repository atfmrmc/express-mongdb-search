import * as BookModel from "../models/Book.js";

const displayBooks = async (req, res) => {
  try {
    const { search } = req.query;

    const books = await BookModel.findBooks(search);
    res.render("books", {
      metaTitle: "Books",
      books: books,
      query: search,
    });
  } catch (error) {
    console.error("Error in displayBooks:", error);
    res.status(500).json({ message: "Error searching books", error });
  }
};

export { displayBooks };

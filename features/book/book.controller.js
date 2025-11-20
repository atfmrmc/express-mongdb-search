import * as BookModel from "./book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.findAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
};

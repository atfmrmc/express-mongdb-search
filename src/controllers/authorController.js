import * as AuthorModel from "../models/Author.js";

const displayAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.findAllAuthors();
    res.render("authors", {
      metaTitle: "Authors",
      authors: authors,
    });
  } catch (error) {
    console.error("Error in displayAuthors:", error);
    res.status(500).json({ message: "Error fetching authors", error });
  }
};

export { displayAuthors };

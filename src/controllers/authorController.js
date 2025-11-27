import * as Author from "../models/authorModel.js";

const displayAuthors = async (req, res) => {
  try {
    const authors = await Author.findAllAuthors();
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

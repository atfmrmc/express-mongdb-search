import * as AuthorModel from "./author.model.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.findAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving authors", error });
  }
};

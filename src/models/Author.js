import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      fullName: {
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
      },
    },
  }
);

authorSchema.index({
  firstname: "text",
  lastname: "text",
});

const Author = mongoose.model("Author", authorSchema);

export const findAllAuthors = () => {
  return Author.find({});
};

export default Author;

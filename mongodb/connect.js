import mongoose from "mongoose";

const initConnection = async () => {
  try {
    mongoose
      .connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`
      )
      .then(() => console.log("Connexion à MongoDB réussie"));
  } catch (error) {
    console.error("Erreur de connexion à MongoDB", error);
  }
};

const addDemoData = async () => {
  const Book = await import("../src/models/bookModel.js");
  const Author = await import("../src/models/authorModel.js");

  const authorCount = await Author.default.countDocuments();
  const bookCount = await Book.default.countDocuments();
  if (authorCount === 0 && bookCount === 0) {
    console.log("Seeding database with demo data...");

    // --- 1. Create Authors ---
    const author1 = new Author.default({
      firstname: "J.K.",
      lastname: "Rowling",
      birthdate: new Date("1965-07-31"),
      nationality: "British",
    });
    const author2 = new Author.default({
      firstname: "J.R.R.",
      lastname: "Tolkien",
      birthdate: new Date("1892-01-03"),
      nationality: "British",
    });
    const author3 = new Author.default({
      firstname: "George",
      lastname: "Orwell",
      birthdate: new Date("1903-06-25"),
      nationality: "British",
    });
    const author4 = new Author.default({
      firstname: "Stephen",
      lastname: "King",
      birthdate: new Date("1947-09-21"),
      nationality: "American",
    });
    const author5 = new Author.default({
      firstname: "Frank",
      lastname: "Herbert",
      birthdate: new Date("1920-10-08"),
      nationality: "American",
    });

    // Save authors first to generate their _ids
    await Promise.all([
      author1.save(),
      author2.save(),
      author3.save(),
      author4.save(),
      author5.save(),
    ]);

    // --- 2. Create Books ---
    const books = [
      // J.K. Rowling
      new Book.default({
        title: "Harry Potter and the Philosopher's Stone",
        author: author1._id,
        release_date: new Date("1997-06-26"),
        genre: "Fantasy",
        ISBN: "9780747532699",
      }),
      // J.R.R. Tolkien
      new Book.default({
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: author2._id,
        release_date: new Date("1954-07-29"),
        genre: "Fantasy",
        ISBN: "9780261102354",
      }),
      new Book.default({
        title: "The Lord of the Rings: The Two Towers",
        author: author2._id,
        release_date: new Date("1954-11-11"),
        genre: "Fantasy",
        ISBN: "9780261102361",
      }),
      new Book.default({
        title: "The Lord of the Rings: The Return of the King",
        author: author2._id,
        release_date: new Date("1955-10-20"),
        genre: "Fantasy",
        ISBN: "9780261102378",
      }),
      // George Orwell
      new Book.default({
        title: "1984",
        author: author3._id,
        release_date: new Date("1949-06-08"),
        genre: "Dystopian",
        ISBN: "9780451524935",
      }),
      new Book.default({
        title: "Animal Farm",
        author: author3._id,
        release_date: new Date("1945-08-17"),
        genre: "Political Satire",
        ISBN: "9780451526342",
      }),
      // Stephen King
      new Book.default({
        title: "The Shining",
        author: author4._id,
        release_date: new Date("1977-01-28"),
        genre: "Horror",
        ISBN: "9780307743657",
      }),
      new Book.default({
        title: "It",
        author: author4._id,
        release_date: new Date("1986-09-15"),
        genre: "Horror",
        ISBN: "9781501142970",
      }),
      // Frank Herbert
      new Book.default({
        title: "Dune",
        author: author5._id,
        release_date: new Date("1965-08-01"),
        genre: "Science Fiction",
        ISBN: "9780441172719",
      }),
    ];

    // Save all books
    await Promise.all(books.map((book) => book.save()));

    console.log("Database seeded successfully!");
  }
};

const setupDatabaseConnection = async () => {
  await initConnection();
  await addDemoData();
};

export default setupDatabaseConnection;

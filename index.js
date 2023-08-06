const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");

let db = null;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Connection is good!");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBandServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `select * from book order by book_id`;
  const booksArray = await db.all(getBooksQuery);

  response.send(booksArray);
});

const express = require("express");
const router = express.Router();

const {
   getUsers,
   deleteUser
} = require("../controllers/users");

const {
   getBooks,
   getBookDetail,
   addBook,
   editBook,
   deleteBook,
} = require("../controllers/books");

const {
   addTransaction,
   editTransaction,
   getTransaction,
   getTransactions,
} = require("../controllers/transactions");

const {
   register,
   login
} = require("../controllers/auth");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/books", getBooks);
router.get("/book/:id", getBookDetail);
router.post("/book", addBook);
router.patch("/book/:id", editBook);
router.delete("/book/:id", deleteBook);

router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.post("/transaction", addTransaction);
router.patch("/transaction/:id", editTransaction);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
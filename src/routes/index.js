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

const { uploadBookNew } = require("../middlewares/uploadBook");
const { uploadTransactionProof } = require("../middlewares/uploadTransaction");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/books", getBooks);
router.get("/book/:id", getBookDetail);
router.post("/book", uploadBookNew("bookThumbnail", "bookFile"), addBook);
router.patch("/book/:id", editBook);
router.delete("/book/:id", deleteBook);

router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.post("/transaction", uploadTransactionProof("transferProof"), addTransaction);
router.patch("/transaction/:id", editTransaction);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
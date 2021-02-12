const express = require("express");
const router = express.Router();

const {
   getUsers,
   deleteUser,
   getUser
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

const {
   uploadBookNew
} = require("../middlewares/uploadBook");
const {
   uploadTransactionProof
} = require("../middlewares/uploadTransaction");

const {
   transactionAuth, adminAuth
} = require("../middlewares/auth");

router.get("/users", adminAuth, getUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

router.get("/books", getBooks);
router.get("/book/:id", getBookDetail);
router.post("/book", uploadBookNew("bookThumbnail", "bookFile"), adminAuth, addBook);
router.patch("/book/:id", adminAuth, editBook);
router.delete("/book/:id", adminAuth, deleteBook);

router.get("/transactions", adminAuth, getTransactions);
router.get("/transaction/:id", adminAuth, getTransaction);
router.post("/transaction", uploadTransactionProof("transferProof"), transactionAuth, addTransaction);
router.patch("/transaction/:id", adminAuth, editTransaction);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
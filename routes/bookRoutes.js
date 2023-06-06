const { Router } = require("express");
const bookManager = require("../Controller/bookManager");

const router = Router();

router.get("/books", bookManager.getBooks);

router.get("/books/:id", bookManager.getBookById);

router.post("/cadastrar-livro", bookManager.postBooks);

router.patch("/modify-book/:id", bookManager.patchBook);

router.delete("/remove-book/:id", bookManager.deleteBook);

module.exports = router;

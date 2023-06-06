/* [ Arquivo responsavel por fazer a conexão e o recebimento dos dados; ] */

const fs = require("fs");
const currentBooks = JSON.parse(fs.readFileSync("bookList.json"));

/**
 * Get all the Books
 * @returns {JSON}
 */
function getAllBooks() {
	return currentBooks;
}

/**
 * Get books by id
 * @param {Number} parameter
 * @returns {Array}
 */
function getBookById(parameter) {
	let book = currentBooks.filter((ListBooks) => {
		return parameter === ListBooks.id;
	});

	return book;
}

/**
 * register a new book
 * @param {JSON} parameters parameters
 * @returns {Boolean}
 */
function setBooks(parameters) {
	try {
		fs.writeFileSync(
			"bookList.json",
			JSON.stringify([...currentBooks, parameters])
		);

		return false;
	} catch (error) {
		return true;
	}
}

/**
 * Modifies the value of a Book field
 *
 * @param {JSON} parameter parameter
 * @param {Number} id id
 * @returns {Boolean}
 */
function modifyBook(parameter, id) {
	try {
		let indexModify = currentBooks.findIndex((book) => book.id === id);
		let modifiedContent = { ...currentBooks[indexModify], ...parameter };
		currentBooks[indexModify] = modifiedContent;

		fs.writeFileSync("bookList.json", JSON.stringify(currentBooks));

		return false;
	} catch (error) {
		return true;
	}
}

function deleteBook(id){
	try {
		let dataRemoved = currentBooks.filter(book => book.id !== id);

		fs.writeFileSync("bookList.json", JSON.stringify(dataRemoved));

		return false;
	} catch (error) {
		return true;
	}
}

module.exports = {
	AllBooks: getAllBooks,
	Book: getBookById,
	registerBooks: setBooks,
	modifyBookData: modifyBook,
	removedBook: deleteBook
};

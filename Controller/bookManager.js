const requestBooks = require("../services/servicesBooks");

/**
 * 
 * @param {JSON} req request
 * @param {JSON} res response
 * @returns {JSON}
 */
async function getBooks(req, res) {
	try {
		let allBooks = requestBooks.AllBooks();
        
		if (allBooks.length !== 0) {
			return res.status(200).json({
				error: false,
				data: allBooks
			});
		} else {
			return res.status(404).json({
				error: true,
				message: "[ Not Found ]",
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: `Error: [ ${error.message} ]`
		});
	}
}

/**
 * 
 * @param {JSON} req request
 * @param {JSON} res response
 * @returns {JSON}
 */
async function getBookById(req, res) {
	try {
		if (Number(req.params.id)) {
			let book = await requestBooks.Book(Number(req.params.id));

			if (book.length !== 0) {
				return res.status(200).json(book);
			} else {
				return res.status(404).json({
					error: true,
					message: "[ Not Found ]",
				});
			}
		} else {
			return res.status(422).json({
				error: true,
				message: "[ invalid ID ]",
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: `Error: [ ${error.message} ]`
		});
	}
}

/**
 * 
 * @param {JSON} req request
 * @param {JSON} res response
 * @returns {JSON}
 */
async function postBooks(req, res) {
	try {
		if(req.body) {
			let status = await requestBooks.registerBooks(req.body);
			if (!status) {
				return res.status(201).json({
					error: false,
					message: "[ Livro registrado com sucesso ]"
				});
			} else {
				return res.status(404).json({
					error: true,
					message: "Error: [ Erro ao registar o livro ]"
				});
			}
		} else {
			return res.status(422).json({
				error: true,
				message: "[ Value empty ]"
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: `Error: [ ${error.message} ]`
		});
	}
}

function patchBook(req, res) {
	try {
		if(req.body && Number(req.params.id)){			
			let status = requestBooks.modifyBookData(req.body, Number(req.params.id));

			if(!status){
				return res.status(201).json({
					error: false,
					message: "[ Successfully modified book ]"
				});
			} else {
				return res.status(422).json({
					error: true,
					message: "[ invalid ID ]",
				});
			}
		} else {
			return res.status(422).json({
				error: true,
				message: "[ Error modifying field ]"
			});
		}
		


	} catch (error) {
		return res.status(500).json({
			error: true,
			message: `Error: [ ${error.message} ]`
		});
	}
}

function deleteBook(req, res) {
	try {
		if (Number(req.params.id)) {
			let status = requestBooks.removedBook(Number(req.params.id));

			if (!status) {
				return res.status(200).json({
					error: false,
					message: "[ Book removed successfully ]",
				});
			} else {
				return res.status(404).json({
					error: true,
					message: "[ Error removing book ]",
				});
			}
		} else {
			return res.status(422).json({
				error: true,
				message: "[ invalid ID ]",
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: `Error: [ ${error.message} ]`,
		});
	}
}

module.exports = {
	getBooks: getBooks,
	getBookById: getBookById,
	postBooks: postBooks,
	patchBook: patchBook,
	deleteBook: deleteBook
};

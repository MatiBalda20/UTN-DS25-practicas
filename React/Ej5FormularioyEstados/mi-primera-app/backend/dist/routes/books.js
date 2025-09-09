"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
const bookController = new bookController_1.BookController();
// Rutas específicas primero (sin parámetros)
router.get('/search', bookController.searchBooks.bind(bookController));
router.get('/genres', bookController.getGenres.bind(bookController));
// Rutas con parámetros después
router.get('/genre/:genero', bookController.getBooksByGenre.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
// Ruta general al final
router.get('/', bookController.getAllBooks.bind(bookController));
// Rutas POST, PUT, DELETE
router.post('/', bookController.createBook.bind(bookController));
router.put('/:id', bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));
exports.default = router;
//# sourceMappingURL=books.js.map
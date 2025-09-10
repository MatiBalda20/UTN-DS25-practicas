"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/books.ts
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const validation_1 = require("../middlewares/validation");
const schemas_1 = require("../validations/schemas");
const router = express_1.default.Router();
const bookController = new bookController_1.BookController();
// Rutas específicas primero (sin parámetros)
router.get('/search', (0, validation_1.validateQuery)(schemas_1.bookQuerySchema), bookController.searchBooks.bind(bookController));
router.get('/genres', bookController.getGenres.bind(bookController));
router.post('/seed', bookController.seedBooks.bind(bookController));
// Rutas con parámetros después
router.get('/genre/:genero', (0, validation_1.validateParams)(schemas_1.bookGenreParamsSchema), bookController.getBooksByGenre.bind(bookController));
router.get('/:id', (0, validation_1.validateParams)(schemas_1.bookParamsSchema), bookController.getBookById.bind(bookController));
// Ruta general al final
router.get('/', bookController.getAllBooks.bind(bookController));
// Rutas POST, PUT, DELETE con validación
router.post('/', (0, validation_1.validateBody)(schemas_1.createBookSchema), bookController.createBook.bind(bookController));
router.put('/:id', (0, validation_1.validateParams)(schemas_1.bookParamsSchema), (0, validation_1.validateBody)(schemas_1.updateBookSchema), bookController.updateBook.bind(bookController));
router.delete('/:id', (0, validation_1.validateParams)(schemas_1.bookParamsSchema), bookController.deleteBook.bind(bookController));
exports.default = router;
//# sourceMappingURL=books.js.map
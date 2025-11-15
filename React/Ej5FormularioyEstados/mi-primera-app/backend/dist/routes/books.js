"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/bookRoutes.ts
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const validation_1 = require("../middlewares/validation");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schemas_1 = require("../validations/schemas");
const router = express_1.default.Router();
const bookController = new bookController_1.BookController();
// ===== RUTAS PÚBLICAS (sin autenticación) =====
// Búsqueda
router.get('/search', (0, validation_1.validateQuery)(schemas_1.bookQuerySchema), bookController.searchBooks.bind(bookController));
// Obtener géneros
router.get('/genres', bookController.getGenres.bind(bookController));
// Filtrar por género
router.get('/genre/:genero', (0, validation_1.validateParams)(schemas_1.bookGenreParamsSchema), bookController.getBooksByGenre.bind(bookController));
// Obtener libro por ID
router.get('/:id', (0, validation_1.validateParams)(schemas_1.bookParamsSchema), bookController.getBookById.bind(bookController));
// Obtener todos los libros
router.get('/', bookController.getAllBooks.bind(bookController));
// Crear libro (público)
router.post('/', (0, validation_1.validateBody)(schemas_1.createBookSchema), bookController.createBook.bind(bookController));
// Actualizar libro (público)
router.put('/:id', (0, validation_1.validateParams)(schemas_1.bookParamsSchema), (0, validation_1.validateBody)(schemas_1.updateBookSchema), bookController.updateBook.bind(bookController));
// ===== RUTA PROTEGIDA - Solo ADMIN puede eliminar =====
router.delete('/:id', auth_middleware_1.authenticate, // 1. Verificar que tenga token JWT válido
(0, auth_middleware_1.authorize)('ADMIN'), // 2. Verificar que sea ADMIN
(0, validation_1.validateParams)(schemas_1.bookParamsSchema), // 3. Validar parámetros
bookController.deleteBook.bind(bookController));
exports.default = router;
//# sourceMappingURL=books.js.map
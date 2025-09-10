"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/users.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middlewares/validation");
const schemas_1 = require("../validations/schemas");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
// Rutas públicas con validación
router.post('/register', (0, validation_1.validateBody)(schemas_1.createUserSchema), userController.register.bind(userController));
router.post('/login', (0, validation_1.validateBody)(schemas_1.loginSchema), userController.login.bind(userController));
// Rutas protegidas (en el futuro agregarás middleware de autenticación)
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', (0, validation_1.validateParams)(schemas_1.userParamsSchema), userController.getUserById.bind(userController));
router.put('/:id', (0, validation_1.validateParams)(schemas_1.userParamsSchema), (0, validation_1.validateBody)(schemas_1.updateUserSchema), userController.updateUser.bind(userController));
router.delete('/:id', (0, validation_1.validateParams)(schemas_1.userParamsSchema), userController.deleteUser.bind(userController));
exports.default = router;
//# sourceMappingURL=users.js.map
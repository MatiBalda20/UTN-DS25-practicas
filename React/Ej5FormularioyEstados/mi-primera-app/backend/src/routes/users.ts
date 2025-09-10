// src/routes/users.ts
import express from 'express';
import { UserController } from '../controllers/userController';
import { validateBody, validateParams } from '../middlewares/validation';
import { 
    createUserSchema, 
    updateUserSchema, 
    userParamsSchema, 
    loginSchema 
} from '../validations/schemas';

const router = express.Router();
const userController = new UserController();

// Rutas públicas con validación
router.post('/register', 
    validateBody(createUserSchema), 
    userController.register.bind(userController)
);

router.post('/login', 
    validateBody(loginSchema), 
    userController.login.bind(userController)
);

// Rutas protegidas (en el futuro agregarás middleware de autenticación)
router.get('/', 
    userController.getAllUsers.bind(userController)
);

router.get('/:id', 
    validateParams(userParamsSchema), 
    userController.getUserById.bind(userController)
);

router.put('/:id', 
    validateParams(userParamsSchema),
    validateBody(updateUserSchema), 
    userController.updateUser.bind(userController)
);

router.delete('/:id', 
    validateParams(userParamsSchema), 
    userController.deleteUser.bind(userController)
);

export default router;
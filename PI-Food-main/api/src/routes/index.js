const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipes = require('./recipes.js');
const diets = require('./diets.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);

router.use('/diets', diets);
router.use('/recipes', recipes);

module.exports = router;
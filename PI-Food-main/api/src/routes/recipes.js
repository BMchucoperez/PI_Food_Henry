const express = require('express')
const router = express.Router()
const { getAllInfo } = require("../controllers/recipeController");
const { Recipe, Diet } = require('../db');

require('dotenv').config();

router.get('/', async (req, res) => {
        
    try {
        const name = req.query.name;
        const getRecipes = await getAllInfo();
        if (name) {
            let recipe = getRecipes.filter(e => e.name.toLowerCase() === name.toLowerCase());
            recipe.length 
            ? res.status(200).json(recipe) 
            :
            res.status(404).json(`The recipe ${name} not found`)
        } else {
            return res.status(200).json(getRecipes);
        }
    } catch (error) {
        return res.status(404)
            .json(error)
    }

});



router.get('/:id', async (req, res) => {
    const { id } = req.params;
        
    try{
        
        const allRecipes = await getAllInfo();
            
        const recipe = allRecipes.find(r => (r.id.toString() === id));
        
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json(`The recipe with the id ${id} not found`);
        }
                
    }catch(error){
        res.status(404).send(error);
    }
});
    

router.post('/', async (req, res) => {
    try {
    let{
        name,
        summary,
        healthScore,
        image,
        steps,
        
    } = req.body;

    if (name && image && steps && healthScore && summary && req.body.diets) {
        const createRecipe = await Recipe.create({
            name: name,
            image: image,
            steps: steps,
            healthScore: healthScore,
            summary: summary,
        });
        
        const findDiet = await Diet.findAll({
            where: {
                name: req.body.diets
            }
        });

        await createRecipe.addDiet(findDiet);
        res.status(200).json(createRecipe);
    } else {
        res.status(404).send('Data needed to proceed is missing')
    }  
    } catch (error) {
        return res.status(400).send("Error en create");
    }
   
});


module.exports = router;
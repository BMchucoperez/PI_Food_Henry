const express = require('express')
const router = express.Router()
const { getAllInfo } = require("../controllers/recipeController");
const { Recipe, Diet } = require('../db');


router.get('/', async (req, res) => {
        
    try {
        const title = req.query.name;
        const getRecipes = await getAllInfo();
        if (title) {
            let recipe = getRecipes.filter(e => e.name.toLowerCase() === title.toLowerCase());
            
            recipe.length 
            ? 
            res.status(200).json(recipe) 
            :
            res.status(404).json(`The recipe ${title} not found`)
        } else {
            return res.status(200).json(getRecipes);
        }
    } catch (error) {
        return res.status(404).json(error)
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
        const { name, summary, healthScore, steps, image, diets } = req.body;
        const newRecipe = await Recipe.create({
            name: name,
            summary: summary,
            healthScore: healthScore,
            steps: steps,
            image: image
        });

        const dietsRecipeDb = await Diet.findAll({
            where: {name: diets}
        })
        await newRecipe.addDiet(dietsRecipeDb);
        res.status(200).json(newRecipe);  
    } catch (error) {
        console.error("Error in POST:", error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    };
});
    
module.exports = router;
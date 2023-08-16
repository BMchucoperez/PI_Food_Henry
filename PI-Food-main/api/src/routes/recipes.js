const express = require('express')
const router = express.Router()
const { getAllInfo } = require("../controllers/recipeController");
const { Recipe, Diet } = require('../db');

require('dotenv').config();


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
    
    try
    {
        let{
            name,
            summary,
            healthScore,
            image,
            steps,
            diets
        } = req.body;

    if (name && image && steps && healthScore && summary && diets) {
        const createRecipe = await Recipe.create({
            name: name,
            image: image,
            steps: steps,
            healthScore: healthScore,
            summary: summary,
        });
        
        const findDiet = await Diet.findAll({
            where: {
                name: diets
            }
        });

        await createRecipe.addDiet(findDiet);
        res.status(200).json(createRecipe);
    } else {
        res.status(404).send("The necessary data to continue is missing");
    }  
    } catch (error) {
        return res.status(400).send("Error in POST");
    }
   
});


module.exports = router;
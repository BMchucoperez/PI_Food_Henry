const express = require('express')
const router = express.Router()

const { Recipe, Diet } = require('../db');

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

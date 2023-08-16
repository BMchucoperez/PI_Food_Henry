const express = require('express');
const { getDietsApi } = require('../controllers/dietsController');
const router = express.Router();


router.get('/', async (req, res) => {
    
    const diets = await getDietsApi();
    res.status(200).json(diets);
});


router.get('/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const allDiets = await getDietsApi();
        const diets = allDiets.find(r => r.id.toString() === id);

        if(diets){
            res.status(200).json(diets);
        } else {
            res.status(404).json(`The diet with the id ${id} not found`);
        }

    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;
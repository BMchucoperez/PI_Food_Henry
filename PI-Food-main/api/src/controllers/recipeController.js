const { Recipe, Diet } = require('../db.js')
const axios = require('axios');
const { YOUR_API_KEY, spoonacularURL } = process.env;


const getApiInfo = async () => {
    
    try
    {
        const resAxios = await axios.get(`${spoonacularURL}/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = resAxios.data ;
    
        if (results.length > 0) {

            let response = await results?.map((result) => {
                return {

                    name: result.title,
                    image: result.image, 
                    id: result.id, 
                    healthScore: result.healthScore,
                    diets: result.diets, 
                    summary:result.summary, 
                    steps: (
                        result.analyzedInstructions[0] && result.analyzedInstructions[0].steps
                        ?
                        result.analyzedInstructions[0].steps.map(item=>item.step)
                        :
                        ''
                    )
                }        
            })
            return response;
        } 

    }catch (error) {
        return ([]);
    }
};


const getDBInfo = async () => {

    const dataDB =  await Recipe.findAll({ // Pido todas las recetas que hay en la DB
        include:{
            model: Diet,                   // Pido que incluya el modelo Diet
            attributes: ['name'],          // con la propiedad name
            through:{
                attributes: []
            }
        }
    });

    const response = await dataDB.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            image: recipe.image,
            steps: recipe.steps,
            diets: recipe.diets
        }
    });

    return response;
};


const getAllInfo = async () => {

    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
        
    return infoTotal;
};


module.exports = {
    getAllInfo
}
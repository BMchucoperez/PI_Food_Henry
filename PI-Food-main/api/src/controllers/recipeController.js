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
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
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

        const dataDB =  await Recipe.findAll({
            
            include:{
                model: Diet,
                attributes: ['name'],
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
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name)
            
            }
        });

            return response;
    
};


const getAllInfo = async () => {

        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const infoTotal = apiInfo.concat(bdInfo);
        
        return infoTotal;
    
};


module.exports = {
    getAllInfo
}
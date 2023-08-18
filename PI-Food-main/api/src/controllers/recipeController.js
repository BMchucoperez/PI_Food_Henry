const { Recipe, Diet } = require('../db.js')
const axios = require('axios');
const { YOUR_API_KEY, spoonacularURL } = process.env;


const getApiInfo = async () => {
    
    
        const resAxios = await axios.get(`${spoonacularURL}/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        const response = await resAxios.data.results.map((result) => {
            
            if(result.vegetarian){
                result.diets.push("vegetarian")
            }
            
            return {
                    id: result.id,
                    name: result.title,
                    summary:result.summary,
                    healthScore: result.healthScore,
                    image: result.image, 
                    steps: (
                        result.analyzedInstructions[0] && result.analyzedInstructions[0].steps
                        ?
                        result.analyzedInstructions[0].steps.map(item=>item.step)
                        :
                        ''
                    ),
                    diets: result.diets, 
                     
                    
                }        
            })
            return response;
         

    
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
            steps: recipe.steps,
            image: recipe.image,
            createInDb: true,
            diets: recipe.diets.map(diet=>diet.name)
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
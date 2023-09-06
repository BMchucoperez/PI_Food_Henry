import { GET_ALL_RECIPES, GET_SEARCH_RECIPES, ORDER_ALPHA, GET_ALL_DIETS, ORIGIN_FILTER, DIET_FILTER,ORDER_SCORE, GET_DETAIL_RECIPE, CLEAN } from './action-types';

const initialState = {
	
    allRecipes: [],
    temporal: [],
    diets: [],
    detailRecipe: undefined,
    
};

const rootReducer = (state = initialState, { type, payload }) => {

    const sort_list = (key, list, inverse) => 
        inverse
        ? 
        [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
        : 
        [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
    
        

    switch (type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
                temporal: payload
            }

        case GET_ALL_DIETS:
            return {
                ...state,
                diets: payload
            }

        case GET_SEARCH_RECIPES:

            const filterTile = [
                ...state.temporal.filter((element) =>
                    element.name.toString().toLowerCase().includes(payload.toString().toLowerCase()))
            ] 

            return {
                ...state,
                temporal: filterTile.length === 0 ? ["not found"] : filterTile

            }

        case CLEAN:
            return{
                ...state,
                SearchBar: []
            }

        case ORDER_ALPHA:
            if (payload === "a-z") {
                return {
                    ...state,
                    temporal: sort_list("name", state.temporal)
                }
            } else {
                return {
                    ...state,
                    temporal: sort_list("name", state.temporal, true)
                }
            }

        case ORDER_SCORE:
            if (payload === "asc") {
                return {
                    ...state,
                    temporal: sort_list("healthScore", state.temporal)
                }
            } else {
                return {
                    ...state,
                    temporal: sort_list("healthScore", state.temporal, true)
                }
            }

        case GET_DETAIL_RECIPE:
            return {
                ...state,
                detailRecipe: payload === undefined ? undefined : payload[0]
            }

        case DIET_FILTER:
            if (payload === "all") {
                return {
                    ...state,
                    temporal: state.allRecipes
                }
            }
            return {
                ...state,
                temporal: state.temporal.filter((recipe) =>
                    recipe.diets.includes(payload)
                )
            }
            

        case ORIGIN_FILTER:
            if (payload === "all") {
                return {
                    ...state,
                    temporal: state.allRecipes
                }
            } else if (payload === "api") {
                return {
                    ...state,
                    temporal: state.allRecipes.filter((recipe) =>
                        !recipe.hasOwnProperty("createInDb")
                    )
                }
            } else if (payload === "db"){
                return {
                    ...state,
                    temporal: state.allRecipes.filter((recipe) =>
                        recipe.hasOwnProperty("createInDb")
                    )
                }
            }
        break;
  
               
        default:
            return { ...state }
    }
}

export default rootReducer;
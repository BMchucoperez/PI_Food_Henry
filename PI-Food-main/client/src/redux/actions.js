import axios from 'axios';
import { GET_ALL_RECIPES, GET_SEARCH_RECIPES, ORDER_ALPHA, GET_ALL_DIETS, ORIGIN_FILTER, DIET_FILTER,ORDER_SCORE, GET_DETAIL_RECIPE } from './action-types';

const URL_API = "http://localhost:3001";


export function getAllRecipes(loading) {
    const urlAllRecipes = `${URL_API}/recipes`
    return async function (dispatch) {
        if(!loading){
            const r = await fetch(urlAllRecipes);
            const data = await r.json();
            await dispatch({ type: GET_ALL_RECIPES, payload: data })
        } else {dispatch({ type: GET_ALL_RECIPES, payload: [] })}
    }
};

export function getDiets() {
    const urlAllDiets = `${URL_API}/diets`
    return async function (dispatch) {
        const r = await fetch(urlAllDiets);
        const data = await r.json();
        await dispatch({ type: GET_ALL_DIETS, payload: data })
    }
}

export function getSearchRecipes(name) {
    return {
        type: GET_SEARCH_RECIPES,
        payload: name
    }
};

export function getDetailRecipe(name) {
    const urlDetail = `${URL_API}/recipes?name=${name}`
    return async function (dispatch) {
        if (name) {
            try {
                const r = await fetch(urlDetail);
                const data = await r.json();
                await dispatch({ type: GET_DETAIL_RECIPE, payload: data })
            } catch (error) {
                dispatch({ type: GET_DETAIL_RECIPE, payload: null })
            }
        } else {
            dispatch({ type: GET_DETAIL_RECIPE })
        }
    }

}

export function orderByAlphabetical(order) {
    return {
        type: ORDER_ALPHA,
        payload: order
    }
};

export function filterByDiet(diet) {
    return {
        type: DIET_FILTER,
        payload: diet
    }
};

export function filterByOrigin(diet) {
    return {
        type: ORIGIN_FILTER,
        payload: diet
    }
};

export function orderByHealthScore(score) {
    return {
        type: ORDER_SCORE,
        payload: score
    }
};

export function postRecipe(data) {
    return async function (dispatch) {
        const r = await axios.post(`${URL_API}/postRecipe`, data);
        return r;
    }
};


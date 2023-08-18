import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Pagination from '../../components/pagination/Pagination';
import styles from './Form.module.css';
import Card from "../Card/Card";
import { getAllRecipes } from '../../redux/actions';

export default function RecipesForm() {

    const recipes = useSelector(state => state.temporal);
    
    const dispatch = useDispatch();

    const Loading = () => {
        return (
            <div className={styles.loading}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          );
    };

    useEffect(() => {
        dispatch(getAllRecipes("loading"))
        dispatch(getAllRecipes())
    }, [dispatch])

    //Pagination
    const [page, setPage] = useState(1);
    const [perPage] = useState(9);

    let onlyNightAllRecipe = undefined;
    let maxRecipes = undefined;
    if (!recipes.code) {
        onlyNightAllRecipe = recipes
            .slice(                                    //El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
                (page - 1) * perPage,                  //number start
                (page - 1) * perPage + perPage);       //number end

        maxRecipes = Math.ceil(recipes.length / perPage); //Math.ceil()devuelve el entero mayor o igual más próximo a un número dado.
    }

    return (

        <div>
            <div className={styles.container}>
                {onlyNightAllRecipe?.length < 1 
                ? 
                (
                <Loading />
                ) 
                : 
                (
                onlyNightAllRecipe?.map((r, i) => {
                    return (
                        <div className={styles.cards} key={i}>
                            <Link to={`/recipe/${r.name}`}>
                            <div>
                                <Card
                                key={r.id}
                                image={r.image}
                                name={r.name}
                                diets={r.diets}
                                />
                            </div>
                            </Link>
                        </div>
                    );
                })
                )}
            </div>
            <div>
                <Pagination max={maxRecipes} setPage={setPage} page={page}/>
            </div>
        </div>
  );
  
}
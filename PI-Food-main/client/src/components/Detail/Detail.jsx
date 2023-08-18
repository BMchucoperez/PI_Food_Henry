import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailRecipe } from '../../redux/actions';
import style from './Detail.module.css';

export default function DetailRecipe() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.detailRecipe);

    useEffect(() => {
        dispatch(getDetailRecipe(undefined));
        dispatch(getDetailRecipe(id));
    }, [dispatch, id]);
    
    return (
        <div className={style.container}>
            {recipe === undefined 
            ? 
            (
                <div className={style.conteneinerLoading}>
                    <div className={style.loader} id="loader">Loading...</div>
                </div>
            ) 
            : 
            recipe === null 
            ? 
            (
                <>
                </>
            ) 
            : 
            (
                <>
                <h1>{recipe.name}</h1>
                <div className={style.containerImgSummary}>
                    <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className={style.imagRecipe} 
                    />
                
                    <div className={style.containerSummaryHealthDiet}>
                        <div className={style.summary}>
                            <h4>Summary</h4>
                            <p>{recipe.summary && recipe.summary.replace(/<[^>]+>/g, "")}</p>
                        </div>
                    
                        <div className={style.containerDietHealth}>
                            <div className={style.containerHealtScore}>
                                <h4>HealthScore: </h4>
                                <p> {recipe.healthScore}</p>
                            </div>
                        
                            <ul className={style.diets}>
                                <h4>DIETS: </h4>
                                {recipe.diets?.map(diet => 
                                    <li key={diet}>
                                        {diet.toUpperCase()}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            
                <hr />
                    
                <section className={style.steps}>
                    <h3>STEPS TO FOLLOW</h3>
                    <p>{recipe.steps}</p>
                </section>
                </>
            )}
        </div>
    )
}
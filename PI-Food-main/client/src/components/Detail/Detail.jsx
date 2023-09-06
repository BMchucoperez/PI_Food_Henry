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
                <div className={style.detail_description}>
                    <div className={style.detail_description2}>
                        <div className={style.detail_img}>
                        <h4 className={style.detail_descr_title}>
                            HealthScore: {recipe.healthScore}
                        </h4>
                        <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        />                      
                        
                        </div>
                    
                        <div>
                        <h4 className={style.detail_descr_title}>
                            Summary
                        </h4>
                        <p className={style.detail_summary}>
                            {recipe.summary && recipe.summary.replace(/<[^>]+>/g, "")}
                        </p>
                        <ul className={style.detail_summary}>
                            <h4>
                                DIETS: 
                            </h4>
                            {recipe.diets?.map(diet => 
                                <li key={diet}>
                                    . {diet.toUpperCase()}
                                </li>
                            )}
                        </ul>
                        </div>
                    </div>
                    
                        
                    <div className={style.steps}>
                        <h3 className={style.detail_descr_title}>
                        STEPS TO FOLLOW
                        </h3>
                        
                        {recipe.steps && recipe.steps.length > 0 
                        ?
                        (
                        <ul>
                        {recipe.steps.map((step, id)=>(
                            <li 
                            key={id}
                            className={style.detail_step} >
                                {id + 1}.-  {step}
                            </li>
                        ))}
                        </ul>
                        )
                        :
                        (
                        <p className={style.detail_step}>
                        There are no steps available for this recipe at the moment.
                        </p>
                        )}        
                    </div>
                                  
                </div>          
                             
                
                </>
            )}
        </div>
    )
}
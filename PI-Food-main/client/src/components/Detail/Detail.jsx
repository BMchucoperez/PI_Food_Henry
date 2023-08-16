import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getDetailRecipe } from '../../redux/actions';
import s from './Detail.module.css'

export default function DetailRecipe() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.detailRecipe);

    useEffect(() => {
        dispatch(getDetailRecipe(undefined))
        dispatch(getDetailRecipe(id))
    }, [dispatch, id])

    let htmlWithoutLinks = undefined

    if (recipe) {
        function removeLinks(html) {
            // Crea un elemento div temporal
            const temp = document.createElement("div");
            // Asigna la cadena de texto HTML al contenido del elemento div
            temp.innerHTML = html;
            // Obtiene todas las etiquetas a del elemento div
            const links = temp.getElementsByTagName("a");
            // Recorre todas las etiquetas a y elimina el atributo href
            for (let i = 0; i < links.length; i++) {
                links[i].removeAttribute("href");
            }
            // Devuelve el contenido del elemento div sin los enlaces
            return temp.innerHTML;
        }
        htmlWithoutLinks = removeLinks(recipe.summary);
    }

    
    return (
        <div className={s.container}>
            {recipe === undefined 
            ? 
            (
            <div className={s.conteneinerLoading}>
                <div 
                className={s.loader} 
                id="loader"
                >
                    Loading...
                </div>
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
                    <div className={s.containerImgSummary}>
                        <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className={s.imagRecipe} 
                        />
                        <div className={s.containerSummaryHealthDiet}>
                            <div className={s.summary}>
                                <h4>Summary</h4>
                                <p 
                                dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}
                                >
                                </p>
                            </div>
                            <div className={s.containerDietHealth}>
                                <div className={s.containerHealtScore}>
                                    <h4>HealthScore:   </h4>
                                    <p>  {recipe.healthScore || recipe.health_score}</p>
                                </div>
                                <ul className={s.diets}>
                                    <h4>DIETS: </h4>
                                    {recipe.diets?.map(diet => 
                                        <li 
                                        key={diet}
                                        >
                                            {diet.toUpperCase()}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <section className={s.steps}>
                        <h3>STEPS TO FOLLOW</h3>
                        
                        <p>{recipe.steps}</p>
                        
                    </section>
                </>
            )}
        </div>
    )
}
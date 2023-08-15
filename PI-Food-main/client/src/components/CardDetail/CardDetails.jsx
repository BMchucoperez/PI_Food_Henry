import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import styles from "./CardDetails.module.css";

export default function DetailRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(cleanDetail());
  }, [dispatch, id]);

  return (
    <div className={styles.details}>
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img
                    src={recipe.image}
                    width="312px"
                    height="231px"
                    alt="imagen"
                    />
                    <h2>{recipe.title}</h2>
                    <label 
                    className={styles.label}
                    >
                        Diets: 
                    </label>
                    {recipe.diets?.map((r, i) => {
                        return (
                            <p 
                            className={styles.p} 
                            key={i}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </p>
                        );
                    })}
                </div>
                <div className={styles.description}>
                    <label 
                    className={styles.label}
                    >
                        Summary: 
                    </label>
                    <p>
                        {recipe.summary && recipe.summary.replace(/<[^>]+>/g, "")}
                    </p>
                    <label 
                    className={styles.label}
                    >
                        Health Score: 
                    </label>
                    <p>
                        {recipe.healthScore}
                    </p>
                    <label 
                    className={styles.label}
                    >
                        Steps: 
                    </label>
                    <p>
                        {recipe.steps}
                    </p>
                </div>
            </div>
        </div>
         
        <Link to="/home">
            <button className={styles.button}>Go back</button>
        </Link>
    </div>
  );
}
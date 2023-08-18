import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllRecipes, getDiets, postRecipe } from '../../redux/actions'
import style from './CreateRecipe.module.css'
import validation from './validation'
import chefCreate from '../../img/chef.png'
import circulo from '../../img/circulo.png'
import swal from 'sweetalert';

export default function CreateRecipes() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);
    const diets = useSelector(state => state.diets);

    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
    });
    
    useEffect(() => {
        dispatch(getDiets())
        dispatch(getAllRecipes())
    }, [dispatch])

    function handleSelect(event) {
        if (event.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, event.target.value]
            });
            setError(validation({
                ...input,
                diets: [...input.diets, event.target.value]
            }, recipes));
        } else if (!event.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== event.target.value)
            });
            setError(validation({
                ...input,
                diets: input.diets.filter(el => el !== event.target.value)
            }, recipes));
            
        }
    };


    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setError(validation({
            ...input,
            [event.target.name] : event.target.value
        }, recipes));
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (Object.values(error).length > 0) {
            swal("Please complete the information required","","error");
        } else if (
           input.name === '' && 
           input.summary === '' && 
           input.healthScore === '' &&
           input.steps === '' &&
           !input.diets.length) {
           swal("Please complete the form","", "error");}
       else {
           dispatch(postRecipe(input));
           swal('Good job!','New recipe added successfully!');
           setInput({
               name: "",
               summary: '',
               healthScore: '',
               steps: '',
               image: '',
               diets: []
           });
           navigate('/home')
        }
                      
    }

    return (
        <div className={style.container}>
            <h1>CREATE YOUR OWN RECIPE</h1>
            <div className={style.containerInfo}>
                <div className={style.containerButtonImg}>
                    <img 
                    src={chefCreate} 
                    alt="chef" 
                    className={style.img} 
                    />
                    <button 
                    type='submit' 
                    onClick={handleSubmit} 
                    className={style.button}
                    >
                        CREATE RECIPE
                    </button>
                </div>
                
                <form 
                onSubmit={(e) => 
                    handleSubmit(e)} 
                className={style.form}>
                    <div className={style.containerinputsForm}>
                        <input
                            type='text'
                            placeholder='Name Recipes'
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            className={style.name}
                        />
                        {error.name && <p>{error.name}</p>}

                        <textarea
                            type='text'
                            placeholder='Summary'
                            value={input.summary}
                            onChange={(e) => handleChange(e)}
                            name="summary"
                            autoComplete="off"
                            className={style.summary}
                        />
                        {error.summary && <p>{error.summary}</p>}

                        <input
                            type='number'
                            placeholder='HealthScore'
                            value={input.healthScore}
                            onChange={(e) => handleChange(e)}
                            name="healthScore"
                            maxLength="2"
                            min="0"
                            className={style.health}
                        />
                        {error.healthScore && <p>{error.healthScore}</p>}

                        <textarea
                            type='text'
                            placeholder='Steps'
                            value={input.steps}
                            onChange={(e) => handleChange(e)}
                            name="steps"
                            autoComplete="off"
                            className={style.steps}
                        />
                        {error.steps && <p>{error.steps}</p>}

                        <input
                            type='url'
                            placeholder='URL Image'
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                            name="image"
                            className={style.imgUrl}
                        />
                        {error.image && <p>{error.image}</p>}
                    </div>
                    <div className={style.containerALLDiets}>
                        <h4 className={style.title}>CHOOSE THE DIETS</h4>
                        <div className={style.containerDiets}>
                            {
                                diets.map(diet => (
                                    <label 
                                    key={diet.id} 
                                    htmlFor={diet.name}>
                                        <div className={style.byDiet}>
                                            <input
                                                type="checkbox"
                                                id={diet.name}
                                                value={diet.name}
                                                onChange={(e) => handleSelect(e)}
                                            />
                                            <div 
                                            className={style.circle} 
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a852a7a' }}
                                            >
                                                <img 
                                                src={circulo} 
                                                alt={diet.name} 
                                                height="30px" 
                                                />
                                            </div>
                                            <div style={{ width: '8px' }}></div>
                                            {diet.name[0].toUpperCase() + diet.name.slice(1)}
                                        </div>
                                    </label>
                                ))
                            }
                        </div>
                        {error.diets && <p>{error.diets}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}
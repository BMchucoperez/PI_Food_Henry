import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RecipesForm from '../Form/Form'
import { getDiets } from '../../redux/actions'
import OrderBar from '../../components/OrderBar/OrderBar'
import style from './Home.module.css'
import FilterBar from '../../components/FilterBar/FilterBar'

export default function Home() {
	
	const dispatch = useDispatch();
	  
	useEffect(() => {
	  dispatch(getDiets())
	}, [dispatch])

	return (
		<div 
		className={style.container}
		>
			<section 
			className={style.section}
			>
				<OrderBar />
				<FilterBar />
			</section>
			<a 
			className={style.link} 
			href="/home"
			>
				RESET
			</a>
			<RecipesForm />
		</div>
	)
}
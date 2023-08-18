import React from 'react';
import style from "./Card.css"

export default function Card({ image, name, diets }) {

	return (
		<div className = {style.container}>
			<img src={image} alt={name} className={style.cardImg}/>
			<h2 className={style.cardText}>{name}</h2>
			<h5 className={style.cardText}>DIETS: {diets.join(', ').toUpperCase()}</h5>
		</div>
	);
  }
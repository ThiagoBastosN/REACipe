import React from 'react'
import Ingredients from '../ingredients/Ingredients'
import './Recipe.css'


export default function Recipe({ title, image, ingredients })
{
    return (
        <div className="recipe-container">
            <h1 className="recipe">{title}</h1>
            <div className="ingredients">
                {ingredients.map((item, index) =>
                    (
                        <Ingredients key={index} title={item.text}/>
                    ))}
            </div>
            <img src={image} alt="Recipe image"/>
        </div>
    )
}
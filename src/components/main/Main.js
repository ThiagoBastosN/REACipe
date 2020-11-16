import React, { useState } from 'react';
import Recipe from '../recipe/Recipe';
import './Main.css'
import dotenv from 'dotenv'
dotenv.config();


export default function Main()
{
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState(undefined);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_ID = process.env.REACT_APP_API_ID;
  
  const onSubmitButton = async e =>
  {
    e.preventDefault();
    //Make a request to edamam API. 
    const result = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=${API_ID}&app_key=${API_KEY}`);
    //Turns the result into a JSON.
    const data = await result.json();
    setRecipes(data.hits);
  }

  return (
    <div className="Main">
      <form className="search-form">
        <input 
          className="search-bar"
          placeholder="Search food" 
          onChange={e => setSearchValue(e.target.value)}
        ></input>
        <button className="search-button" onClick={onSubmitButton}>Search</button>
      </form>


      <div className="recipes">
        { typeof recipes === "undefined" ? <h1></h1>
         : recipes.map(item =>
          (
            <Recipe 
            key={item.recipe.label}
            title={item.recipe.label}
            image={item.recipe.image}
            ingredients={item.recipe.ingredients}
            />
          ))}
      </div>

      {typeof recipes !== "undefined" ? (() => {
        //I'm using a self called function to avoid double ternary expression.
        if (recipes.length === 0) {
          return <h1 className="recipes-found">No recipes found</h1>;
        }
      })()
      : <h1 className="have-searched">You haven't searched recipes yet</h1>}

    </div>
    );
}
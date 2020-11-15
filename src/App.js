import './App.css';
import './components/recipe/Recipe'
import React, { useState } from 'react'
import Recipe from './components/recipe/Recipe';

function App() {
  
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState(undefined);

  const API_KEY = "c7d7be83e6fe0ccd408f6a66a74a8c6d";
  const API_ID = "ada4506b";
  //"https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}"
  
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
    <div className="App">
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

export default App;

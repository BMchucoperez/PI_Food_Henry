import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import CreateRecipe from './components/createdRecipes/CreateRecipe';
import About from './components/About/About';


function App() {

  const location = useLocation();
  
  return (
    <div>
      {location.pathname === '/' ? undefined : <About />}
      
      <Routes>
        
        <Route path='/home' element = {<Home />}/>        
        <Route path='/recipe/:id' element = { <Detail/> } />
        <Route path='/' element = {<Landing />} />
        <Route path='/create' element = { <CreateRecipe/> } />
        
      </Routes>
    </div>
  );
}

export default App;

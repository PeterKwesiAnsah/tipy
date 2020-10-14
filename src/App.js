import React from 'react';
import Signin from './components/Signin'
import {Route,Switch} from 'react-router-dom'
import './App.scss'


const App =()=> {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
        <Signin></Signin>
        </Route>
      </Switch>
  
  
    </div>
  );
}
   
export default App;

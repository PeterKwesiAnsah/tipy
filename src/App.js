import React,{useState,createContext} from 'react';
import Signin from './components/Signin'
import {Route,Switch} from 'react-router-dom'
import './App.scss'

//creating a context API  user
export const UserContext=createContext()

const App =()=> {
  //creating a global state
const [user,setUser]=useState({email:'',password:'',signin:null})

  return (
    <div className="App">
    <UserContext.Provider value={{user,setUser}}>
    <Switch>
        <Route path='/' exact>
        <Signin></Signin>
        </Route>
      </Switch>
    </UserContext.Provider>
   
  
  
    </div>
  );
}
   
export default App;

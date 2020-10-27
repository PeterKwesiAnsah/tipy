import * as firebase from 'firebase';
import React, { useState, createContext } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Message from './components/Message';
import Home from './components/Home'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
// 	apiKey: 'AIzaSyBzSxCofWxvc8_2sQyFelJyraMAwohJrlg',
// 	authDomain: 'tipy-d9238.firebaseapp.com',
// 	databaseURL: 'https://tipy-d9238.firebaseio.com',
// 	projectId: 'tipy-d9238',
// 	storageBucket: 'tipy-d9238.appspot.com',
// 	messagingSenderId: '129149327590',
// 	appId: '1:129149327590:web:25ac71c740fd906d14c327',
// 	measurementId: 'G-QBM27EHXEJ',
// };

var firebaseConfig = {
    apiKey: "AIzaSyCvDT7gt_bWVen7puawDCi3OwLXV7AGlIU",
    authDomain: "teeeepeeee-37145.firebaseapp.com",
    databaseURL: "https://teeeepeeee-37145.firebaseio.com",
    projectId: "teeeepeeee-37145",
    storageBucket: "teeeepeeee-37145.appspot.com",
    messagingSenderId: "774172888222",
    appId: "1:774172888222:web:d9398f3786a44035ffff8f"
  };



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const database = firebase.database();




//creating a context API  user
export const UserContext = createContext();

const App = () => {
	//creating a global state
	const [user, setUser] = useState({ email: '', password: '', signin: null });

	return (
		<div className="App">
			<UserContext.Provider value={{ user, setUser,firebase:{firebase,database} }}>
				<Switch>
					<Route path="/" exact>
						<Login></Login>
					</Route>
					<Route path="/signUp">
						<SignUp></SignUp>
					</Route>
          <Route path='/success'>
            <Message></Message>
          </Route>
		  <Route path='/home'>
			  <Home></Home>
		  </Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
};

export default App;

import * as firebase from 'firebase';
import React, { useState, createContext } from 'react';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Message from './components/Message';
import Home from './components/Home'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyBzSxCofWxvc8_2sQyFelJyraMAwohJrlg',
	authDomain: 'tipy-d9238.firebaseapp.com',
	databaseURL: 'https://tipy-d9238.firebaseio.com',
	projectId: 'tipy-d9238',
	storageBucket: 'tipy-d9238.appspot.com',
	messagingSenderId: '129149327590',
	appId: '1:129149327590:web:25ac71c740fd906d14c327',
	measurementId: 'G-QBM27EHXEJ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const database = firebase.database();

firebase.auth().onAuthStateChanged((user)=>{
	console.log(user)

})


// console.log(firebase.auth().currentUser)
// firebase.auth().onAuthStateChanged(function(user) {
// 	if (user) {
// 	  // User is signed in.
// 	  console.log(user)
// 	} else {
// 	  // No user is signed in.
	
// 	}
//   });

// //adding a LLC pantang
// const usersRef=database.ref('users/one/kasoa')
// usersRef.set({
//   id:Date.now(),
//   name:"Kasoa"
// },(error)=>{
//   if(error){
//     console.log(error)
//   }
//   else{
//     console.log('Data Submitted')
//   }
// })

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
						<Signin></Signin>
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

import firebase from 'firebase/app';
import React, { useState, createContext, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CustomImport from './components/CustomImport';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Message from './components/Message';
import Home from './components/Home';
import getID from './helpers/getID';
import { useHistory, useLocation } from 'react-router-dom';

var firebaseConfig = {
	apiKey: 'AIzaSyCvDT7gt_bWVen7puawDCi3OwLXV7AGlIU',
	authDomain: 'teeeepeeee-37145.firebaseapp.com',
	databaseURL: 'https://teeeepeeee-37145.firebaseio.com',
	projectId: 'teeeepeeee-37145',
	storageBucket: 'teeeepeeee-37145.appspot.com',
	messagingSenderId: '774172888222',
	appId: '1:774172888222:web:d9398f3786a44035ffff8f',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const database = firebase.database();

//get the current location

//creating a context API  user
export const UserContext = createContext();

const App = () => {
	//create a history object
	const history = useHistory();

	//user state for the user
	const [user, setUser] = useState([]);

	useEffect(() => {
		//creating a listener for listening when the route changes
		// history.listen(({pathname})=>{
		// 	if(pathname !== '/' && user.length > 0)
		// })
	}, []);

	useEffect(() => {
		//creating a listener when the auth state chanages
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				getID(user.email, firebase).then((data) => {
					setUser([data, user]);
				});
			}
			//reset the user state
			setUser([]);
		});
	}, []);

	return (
		<div className="App">
			<UserContext.Provider value={{ user, firebase: { firebase, database } }}>
				<Switch>
					<Route path="/" exact>
						<Login></Login>
					</Route>
					<Route path="/signUp">
						<SignUp></SignUp>
					</Route>
					<Route path="/success">
						<Message></Message>
					</Route>
					<Route path="/home">
						<Home firebase={firebase}></Home>
					</Route>
					<Route path="/import">
						<CustomImport firebase={firebase} user={user}></CustomImport>
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
};

export default App;

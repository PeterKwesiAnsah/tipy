import firebase from 'firebase/app';
import React, { useState, createContext, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CustomImport from './components/CustomImport';
import Export from './components/Export';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Message from './components/Message';
import Home from './components/Home';
import getID from './helpers/getID';
import axios from 'axios';
// import useLocalStorage from './hooks/useLocalStorage'
// import { useHistory, useLocation } from 'react-router-dom';

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
	// const history = useHistory();

	//user state for the user
	const [user, setUser] = useState([]);
// //get the saved storage from local
// 	const savedStorage = JSON.parse(localStorage.getItem('count'));
	//user counts
	const [count, setCount] = useState(
	 {
			customers: 0,
			pending: 0,
			read: 0,
			failed: 0,
		}
	);

	useEffect(() => {
		//creating a listener for listening when the route changes
		// history.listen(({pathname})=>{
		// 	if(pathname !== '/' && user.length > 0)
		// })

		const fetchCount=()=>{

		}
	}, []);
	console.log(firebase.auth()?.currentUser)
	

	useEffect(() => {
		//creating a listener when the auth state chanages
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				getID(user.email, firebase).then((data) => {
					setUser([data, user]);

					//fetch count here
					const fetchCount=async()=>{
						const count = (await axios.get(`https://us-central1-tpwebsyeeee.cloudfunctions.net/app/web-dashboard/${data}`)).data
						const {progress,...rest}=count
						setCount(rest)
					}


					fetchCount()
				});

				

			}
			//reset the user state
			setUser([]);
		});
	}, []);

	return (
		<div className="App">
			<UserContext.Provider
				value={{
					user,
					firebase: { firebase, database },
					count: [count, setCount],
				}}
			>
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
					<Route path="/export-monthly-readings">
						<Export firebase={firebase} id={user[0]}></Export>
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
};

export default App;

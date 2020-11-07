const getID = (email,firebase) => {
	return new Promise((resolve, reject) => {
		const llwRef = firebase.database().ref('users/LLW');
		//function gets the LLW ID based on the current user ID
		try{
	llwRef.once('value').then((snapshot) => {
	const customerData = Object.entries(snapshot.val()).filter(
		([key, value]) => value.email.toLowerCase() === email.toLowerCase()
	);
	//LLW ID is resolve
	resolve(customerData[0][1].id)
});
		}
		catch{
			reject('User Does Not Exist')
		}
	
	});
};
export default getID;

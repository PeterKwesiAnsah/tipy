const getCustom = (firebase) => {
	return new Promise((resolve, reject) => {
		//data for customers
		let rows = [];
		//get  the database reference to the customers node
		const customRef = firebase.database().ref('customers');

		//get the current userID
		const userId = firebase.auth().currentUser.uid;

		//function gets data of customers based on the current user submitted data
		customRef.once('value').then((snapshot) => {
			const customersData = Object.entries(snapshot.val()).filter(
				([key, value]) => value.usersID === userId
			);

			customersData.forEach(async ([key, customer], index, array) => {
				//get  the database reference to the customers node under the meters road
				const custoMeterRef = firebase.database().ref('meters/' + customer.id);

				//read the data for the reference
				const snapshot = await custoMeterRef.once('value');

				//get the data from the snapchat
				const custoMeterData = snapshot.val();

				//add the data into rows
				rows.push({ id: customer.id, name: customer.name, ...custoMeterData });

				if (index === array.length - 1) {
					resolve(rows);
				}
			});
		});
	});
};

export default getCustom;

import { parse } from 'papaparse';

const addCustom = (file, firebase) => {
	var userId = firebase.auth().currentUser.uid;
	//database reference for customers
	const customRef = firebase.database().ref('customers');

	//Function takes the file object passed into it,parse the file
	//Function uses the firebase database to populate the data
	parse(file, {
		skipEmptyLines: true,
		complete: (results) => {
			console.log(results.data);
			results.data.forEach(
				([name, meterNum, town, prevReading, bill], index) => {
					if (index > 0) {
						const newCustomerRef = customRef.push();
						const newCustomKey = newCustomerRef.key;
						newCustomerRef.set({
							id: newCustomKey,
							usersID: userId,
							name: name,
						});
						firebase
							.database()
							.ref('meters/' + newCustomKey)
							.set(
								{
									id: newCustomKey,
									usersID: userId,
									meterNo: meterNum,
									town: town,
									prevReading: prevReading,
									bill: bill,
									status: 'pending',
								},
								(error) => {
									if (!error) {
										console.log('data is submitted');
									}
								}
							);
					}
				}
			);
		},
	});
};
export default addCustom;

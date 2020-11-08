import getCustom from './getCustom';
import update from './update'

const getReadings = async (firebase, id,setReadings) => {
	//data for meter  readings
	let rows = [];
	let readings = [];

	//database ref to the readings node
	const readingsRef = firebase.database().ref('readings');

	const customers = await getCustom(firebase, id);

	//Gives the snapshot of the readings node

	const readingSnapshot = await readingsRef.once('value');

	Object.entries(readingSnapshot.val()).forEach(([key, value]) => {
		//gives you an array of customers whose data has been read
		const customer = customers.filter(
			({ meterNo }) => String(key) === String(meterNo)
		);
		
		rows.push(customer[0]);
    });
    //update meter readings for the meters read
    update(rows,firebase)
	rows.forEach(async ({id, name, town, meterNo, ...rest },index,array) => {
        //Update meter nodes here
		const snapshot = await firebase
			.database()
			.ref('readings/' + meterNo)
			.once('value');
		const { reading, date, imageUrl } = snapshot.val();

		readings.push({ id,name, imageUrl, reading, date, meterNo, town });
		if(index === array.length -1){
			//set the readings 
			 setReadings(readings)
		}
	
	});	
		
};

export default getReadings;

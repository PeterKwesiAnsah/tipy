import getCustom from './getCustom';
import update from './update';
import prevCurrent from '../helpers/prevCurrent';
import { grossCal, netCal, meterCons } from '../helpers/calBill';

const getReadings = async (firebase, llwid, setReadings) => {
	//data for meter  readings
	let rows = [];
	let readings = [];
	let failures = [];

	//database ref to the readings node with status read
	const readingsRef = firebase.database().ref(`readings2/${llwid}/122020`);

	//dattabse ref to the failed node with status read
	const failedref = firebase.database().ref('failed');

	const customers = await getCustom(firebase, llwid);

	//Gives the snapshot of the readings node
	const readingSnapshot = await readingsRef.once('value');

	//give the snapshot of failed node
	const failedSnapshot = await failedref.once('value');


	if(readingSnapshot.val()){
		Object.entries(readingSnapshot.val()).forEach(([key, value]) => {
			//gives you an array of customers whose data has been read
			const customer = customers.filter(
				({ meterNo }) => String(key) === String(meterNo)
			);
	
			rows.push(customer[0]);
		});
	
		//filter the failed readings from the customers node
		Object.entries(failedSnapshot.val()).forEach(([key, value]) => {
			const failed = customers.filter(
				({ meterNo }) => String(key) === String(meterNo)
			);
	
			failures.push(failed[0]);
		});
	
		// //update meter readings for the meters read
		// update(rows,firebase,'read')
		// update(failures,firebase,'failed')
	
		rows.forEach(async ({name, town, meterNo }, index, array) => {

			console.log(meterNo)
			//Update meter nodes here
			const snapshot = await firebase
				.database()
				.ref(`readings2/${llwid}/122020/`+meterNo)
				.once('value');

		


				console.log(snapshot.val())
	
			// //prev reading
			let prevReading = await firebase
				.database()
				.ref(`readings2/${llwid}/112020/` + meterNo + '/reading')
				.once('value')  || "0";
	
			const { id, reading, date, imageUrl } = snapshot.val();
			prevReading = parseInt(prevReading.val());
	
			readings.push({
				id,
				name,
				imageUrl,
				reading,
				date,
				meterNo,
				town,
				prevReading: `${prevReading} m3`,
				bill: `GHC ${netCal(grossCal(prevReading, reading))}`,
				consum: `${meterCons(prevReading, reading)} m3`,
			});
			if (index === array.length - 1) {
				//set the readings
				setReadings(readings);
				console.log(readings);
			}
		});
	}

	//filter the readings from the customers node
	
};

export default getReadings;

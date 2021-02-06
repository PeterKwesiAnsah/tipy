import getCustom from './getCustom';
import update from './update';
import prevCurrent from '../helpers/prevCurrent';
import { grossCal, netCal, meterCons } from '../helpers/calBill';
import upperCase from '../helpers/UpperCase';

const getReadings = async (firebase, llwid, setReadings,curMonth) => {
	//data for meter  readings
	let rows = [];
	let readings = [];
	let failures = [];

	let email = firebase.auth().currentUser?.email.split('@')[0];
	//get Firebase email params
	const refBillString = `users/LLW/${upperCase(email)}/billParams`;

	//database ref to the readings node with status read
	const readingsRef = firebase.database().ref(`readings2/${llwid}/${curMonth}`);

	//dattabse ref to the failed node with status read
	const failedref = firebase.database().ref('failed');

	const customers = await getCustom(firebase, llwid);

	//Gives the snapshot of the readings node
	const readingSnapshot = await readingsRef.once('value');

	//give the snapshot of failed node
	const failedSnapshot = await failedref.once('value');

	//Get bill params snapshot
	const paramBillSnap = await firebase
		.database()
		.ref(refBillString)
		.once('value');
	const { tariff, expansion, fee } = paramBillSnap.val() || {
		tariff: 0,
		expansion: 0,
		fee: 0,
	};

	if (readingSnapshot.val()) {
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

		rows.forEach(async ({ name, town, meterNo }, index, array) => {
			//Check if a bill data node exist from the readins node...if it exist deconstruct it
			//if not Calculate the bill ....save it

			// const billSnapshot = await firebase
			// .database()
			// .ref(`readings2/${llwid}/${curMonth}/` + meterNo+'/dataBill')
			// .once('value');

			///pick the bill parameters from here

			//Update meter nodes here
			const snapshot = await firebase
				.database()
				.ref(`readings2/${llwid}/${curMonth}/` + meterNo)
				.once('value');

			const { id, reading, date, imageUrl } = snapshot.val();

			if (!snapshot.hasChild('billdata')) {
				// //prev reading
				let prevReading =
					(await firebase
						.database()
						.ref(`readings2/${llwid}/112020/` + meterNo + '/reading')
						.once('value')) || '0';

				prevReading = parseInt(prevReading.val());
				const bill = netCal(
					grossCal(prevReading, reading, tariff),
					fee,
					expansion
				);
				const meterWaterCons = meterCons(prevReading, reading);
				readings.push({
					id,
					name,
					imageUrl,
					reading,
					date,
					meterNo,
					town,
					prevReading: `${prevReading} m3`,
					bill: `GHC ${bill}`,
					consum: `${meterWaterCons} m3`,
				});
				try {
					//save data
					await firebase
						.database()
						.ref(`readings2/${llwid}/${curMonth}/` + meterNo + '/billdata')
						.update({ prevReading, bill, meterWaterCons });
				} catch (e) {
					console.log(e);
				}

				if (index === array.length - 1) {
					//set the readings
					setReadings(readings);
					console.log(readings);
				}
			} else {
				//Update meter nodes here
				const snapshot = await firebase
					.database()
					.ref(`readings2/${llwid}/${curMonth}/` + meterNo + '/billdata')
					.once('value');
				//Get bill values if it exists
				const { prevReading, bill, meterWaterCons } = snapshot.val();

				readings.push({
					id,
					name,
					imageUrl,
					reading,
					date,
					meterNo,
					town,
					prevReading: `${prevReading} m3`,
					bill: `GHC ${bill}`,
					consum: `${meterWaterCons} m3`,
				});

				if (index === array.length - 1) {
					//set the readings
					setReadings(readings);
					console.log(readings);
				}
			}

			//if exist get
			//else calculate and save
		});
	}

	//filter the readings from the customers node
};

export default getReadings;

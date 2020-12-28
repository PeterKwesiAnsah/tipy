import getCustom from './getCustom';
import update from './update'

const getReadings = async (firebase, id,setReadings) => {
	//data for meter  readings
	let rows = [];
	let readings = [];
	let failures=[]

	//database ref to the readings node with status read
	const readingsRef = firebase.database().ref('readings2/112020');


	//dattabse ref to the failed node with status read 
	const failedref=firebase.database().ref('failed')

	const customers = await getCustom(firebase, id);

	//Gives the snapshot of the readings node
	const readingSnapshot = await readingsRef.once('value');

	//give the snapshot of failed node
	const failedSnapshot=await failedref.once('value')


	//filter the readings from the customers node
	Object.entries(readingSnapshot.val()).forEach(([key, value]) => {
		//gives you an array of customers whose data has been read
		const customer = customers.filter(
			({ meterNo }) => String(key) === String(meterNo)
		);
		
		rows.push(customer[0]);
	});

	//filter the failed readings from the customers node
Object.entries(failedSnapshot.val()).forEach(([key,value])=>{

const failed=customers.filter(({meterNo})=>String(key)===String(meterNo))

failures.push(failed[0])

})
	


    // //update meter readings for the meters read
	// update(rows,firebase,'read')
	// update(failures,firebase,'failed')
	

	rows.forEach(async ({id, name, town, meterNo },index,array) => {
        //Update meter nodes here
		const snapshot = await firebase
			.database()
			.ref('readings2/112020/' + meterNo)
			.once('value');
		const { reading, date, imageUrl } = snapshot.val();

		readings.push({ id,name, imageUrl, reading, date, meterNo, town,prevreading:'1234 m3',bill:'GHC 0.2',consum:'0.5 m3'});
		if(index === array.length -1){
			//set the readings 
			 setReadings(readings)
			 console.log(readings)
		}
	
	});	

		
};

export default getReadings;

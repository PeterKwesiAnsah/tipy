const update = (meters, firebase,meterStatus) => {
	let updates = {};
	meters.forEach(({ status, id, ...rest }) => {
		// console.log({status:'read',id,...rest})
		updates['meters/' + id] = { status: meterStatus, id, ...rest };
		firebase.database().ref().update(updates);
	});
};
export default update;

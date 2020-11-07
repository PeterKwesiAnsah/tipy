const update = (meters, firebase) => {
	let updates = {};
	meters.forEach(({ status, id, ...rest }) => {
		// console.log({status:'read',id,...rest})
		updates['meters/' + id] = { status: 'read', id, ...rest };
		firebase.database().ref().update(updates);
	});
};
export default update;

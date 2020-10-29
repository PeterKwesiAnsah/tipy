const exportData = (data) => {
	let result;
	if (data) {
		result = data.map(({ id, usersID, ...rest }) => ({ ...rest }));
	}
	return result;
};

export default exportData;

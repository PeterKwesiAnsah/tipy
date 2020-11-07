const exportData = (data) => {
	let result;
	if (data) {
		result = data.map(({ id, llwID,isIndoor,l,g, ...rest }) => ({ ...rest }));
	}
	return result;
};

export default exportData;

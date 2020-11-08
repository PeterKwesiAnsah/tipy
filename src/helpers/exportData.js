const exportData = (data) => {
	let result;
	if (data) {
		//deconstruct data not needed  and return the rest
		result = data.map(({ id, llwID,isIndoor,l,g, ...rest }) => ({ ...rest }));
	}
	return result;
};

export default exportData;

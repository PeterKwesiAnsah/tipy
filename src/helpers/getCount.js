//function returns the count of status
const getCount = (statusType, data) => {
	const array = data.filter(({ status }) => status === statusType);
	return array.length;
};

export default getCount;

export default {
	meters: (search, array) =>
		array.filter(({ name }) =>
			// getMonth(date.split('/')[1]).includes(search.toLowerCase())
			name.toLowerCase().includes(search.toLowerCase())
		),
	customers: (search, array) =>
		array.filter(({ name }) =>
			name.toLowerCase().includes(search.toLowerCase())
		),
};

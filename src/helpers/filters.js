import getMonth from '../helpers/getMonth';

export default {
	meters: (search, array) =>
		array.filter(({ date }) =>
			getMonth(date.split('/')[1]).includes(search.toLowerCase())
		),
	customers: (search, array) =>
		array.filter(({ name }) =>
			name.toLowerCase().includes(search.toLowerCase())
		),
};

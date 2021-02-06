import { useState, useEffect } from 'react';

const useAutoFetch = () => {
	const [data, setData] = useState([]);
	const [autoFetch, setautoFetch] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (data.length === 0) {
				console.log('autoFetch was runn')
				setautoFetch(true);
			}
		},4000);

		return () => {
			clearTimeout();
		};
	});

	return [ data, setData,autoFetch];
};
export default useAutoFetch;

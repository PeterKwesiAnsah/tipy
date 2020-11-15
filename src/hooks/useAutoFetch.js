import { useState, useEffect } from 'react';

const useAutoFetch = () => {
	const [data, setData] = useState([]);
	const [autoFetch, setautoFetch] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (data.length === 0) {
				setautoFetch(true);
			}
		}, 8000);

		return () => {
			clearTimeout();
		};
	});

	return [ data, setData,autoFetch];
};
export default useAutoFetch;

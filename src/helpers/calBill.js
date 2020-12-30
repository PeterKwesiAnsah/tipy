const { tariff, fee, expansion } = JSON.parse(localStorage.getItem('bill'));

export const grossCal = (prev, current) =>
	(parseInt(current) - parseInt(prev)) * tariff;
export const netCal = (gross) =>
	(gross + parseInt(fee) + ((parseInt(expansion) / 100) * gross)).toFixed(2);
export const meterCons = (prev, current) => parseInt(current) - parseInt(prev);

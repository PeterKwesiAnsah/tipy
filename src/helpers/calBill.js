const bill = JSON.parse(localStorage.getItem('bill'));

const tariff=bill?.tariff
const fee=bill?.fee
const expansion=bill?.expansion


export const grossCal = (prev, current) =>
	(parseInt(current) - parseInt(prev)) * tariff;
export const netCal = (gross) =>
	(gross + parseInt(fee) + ((parseInt(expansion) / 100) * gross)).toFixed(2);
export const meterCons = (prev, current) => parseInt(current) - parseInt(prev);

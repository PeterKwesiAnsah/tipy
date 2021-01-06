

export const grossCal = (prev, current,tariff) =>
	(parseInt(current) - parseInt(prev)) * tariff;
export const netCal = (gross,fee,expansion) =>
	(gross + parseInt(fee) + ((parseInt(expansion) / 100) * gross)).toFixed(2);
export const meterCons = (prev, current) => parseInt(current) - parseInt(prev);

import React from 'react';

export default {
	customers: [
		{ field: 'id', headerName: 'ID' },
		{ field: 'name', headerName: 'Name', width: 170 },
		{ field: 'meterNo', headerName: 'Meter No', width: 130 },
		{ field: 'prevReading', headerName: 'Prev. Reading', width: 170 },
		{ field: 'town', headerName: 'Town' },
		{ field: 'status', headerName: 'Status' },
	],
	meters: [
		{ field: 'name', headerName: 'Name', width: 130 },
		{ field: 'meterNo', headerName: 'Meter No', width: 130 },
		{ field: 'reading', headerName: 'Reading', width: 130 },
		{ field: 'town', headerName: 'Town', width: 130 },
		{ field: 'date', headerName: 'Date of Reading', width: 170 },
		{
			field: 'imageUrl',
			headerName: 'Image',
			renderCell: (params) => (
				<img
					src={params.value}
					alt="Tipy........Location Errand Technology"
					style={{ width: '100%' }}
				></img>
			),
		},
	],
};

import React from 'react';
import { colors, Typography } from '@material-ui/core';

const styles = {
	//get the various colors for each status
	read: {
		color: colors.green[500],
	},
	pending: {
		color: colors.yellow[600],
	},
	failed: {
		color: colors.red[600],
	},
};

export default {
	customers: [
		{ field: 'name', headerName: 'Name', width: 170 },
		{ field: 'meterNo', headerName: 'Meter No', width: 130 },
		{ field: 'prevReading', headerName: 'Prev. Reading', width: 170 },
		{ field: 'town', headerName: 'Town' },
		{
			field: 'status',
			headerName: 'Status',
			renderCell: (params) => (
				<span
					style={{
						backgroundColor: styles[params.value].color,
						padding: '1rem 2rem',
						borderRadius: '1.5rem',
					}}
				>
					<Typography>{params.value}</Typography>
				</span>
			),
			width: 170,
		},
	],
	meters: [
		{ field: 'name', headerName: 'Name', width: 130 },
		{ field: 'meterNo', headerName: 'Meter No', width: 130 },
		{ field: 'reading', headerName: 'CurrentReading', width: 130 },
		{ field: 'prevreading', headerName: 'PrevReading', width: 130 },
		{ field: 'bill', headerName: 'Bill', width: 130 },
		{field:'consum',headerName:'Consumption', width:130},
		{ field: 'town', headerName: 'Town', width: 130 },
		{ field: 'date', headerName: 'Date of Reading', width: 130 },

	
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

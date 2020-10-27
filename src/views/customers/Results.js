import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: '1.4rem',
		padding: '1.5rem',
		'& *': {
			fontSize: 'inherit',
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const columns = [
	{ field: 'id', headerName: 'ID' },
	{ field: 'name', headerName: 'Name', width: 130 },
	{ field: 'meterNo', headerName: 'Meter No', width: 130 },
	{ field: 'prevReading', headerName: 'Prev. Reading' },
	{ field: 'town', headerName: 'Town' },
	{ field: 'status', headerName: 'Status' },
];

const Results = ({ data, search }) => {
	const classes = useStyles();

	const [perPage, setPerPage] = React.useState(5);

	const handleChange = (event) => {
		setPerPage(event.target.value);
	};

	//handles filtering data
    const filtered = data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));


	//filter the data here
	return (
		<div style={{ height: 400, width: '80vw' }} className={classes.root}>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Rows Per Page</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={perPage}
					onChange={handleChange}
				>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={30}>30</MenuItem>
				</Select>
			</FormControl>
			<DataGrid
				columns={columns}
				rows={filtered}
				pageSize={perPage}
				checkboxSelection
			></DataGrid>
		</div>
	);
};

export default Results;

/*


[
  {
    "name": "State",
    "value": [
      "{bill: \"50\", id: \"-MKZWtr9QU5rJS3a6-vY\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrSQla7XhYndG9d\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrWa3zu5tUOjY5r\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrawJgDtP3F__JP\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtreWwahkxGgY5mS\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrjb3vLrlsWKlrz\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrnRJ25pLI0GcEc\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrrnhhNhl82-uLx\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrv5kZQGy8zJtsa\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWtrzYoOm4DHQxjda\", meterNo: \"…}",
      "{bill: \"50\", id: \"-MKZWts32O5oGvO_vuK6\", meterNo: \"…}"
    ],
    "subHooks": []
  },
  {
    "name": "Context",
    "value": {
      "user": "{email: \"\", password: \"\", signin: null}",
      "setUser": "ƒ bound dispatchAction() {}",
      "firebase": "{database: {…}, firebase: {…}}"
    },
    "subHooks": []
  },
  {
    "name": "Effect",
    "value": "ƒ () {}",
    "subHooks": []
  }
]




*/

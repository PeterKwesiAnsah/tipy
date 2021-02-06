import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import filters from '../../helpers/filters';

const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: '1.4rem',
		padding: '1.5rem',
		'& *': {
			fontSize: 'inherit',
		},

		'& li .MuiMenuItem-root': {
			fontSize: '1.5rem',
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,

		'& *': {
			fontSize: '1.5rem',
		},
	},

	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	form: {
		backgroundColor: '#fff',
		borderRadius: '0.5rem',
		marginBottom: '2rem',
		padding: '1rem',
		boxShadow:
			'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
	},
	dataGrid: {
		backgroundColor: '#fff',
		borderRadius: '0.5rem',
		width: '100%',
		height: '100%',
	},
}));

const Results = ({ data, search, columns, type, children, NoData }) => {
	const classes = useStyles();

	console.log(NoData);

	const [perPage, setPerPage] = React.useState(5);

	const handleChange = (event) => {
		setPerPage(event.target.value);
	};
	//handles filterimg of data
	const filtered = filters[type](search, data);

	//filter the data here
	return (
		<div style={{ height: 400, width: '80vw' }} className={classes.root}>
			<div className={classes.form}>
				<FormControl className={classes.formControl} variant="outlined">
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={perPage}
						onChange={handleChange}
					>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={20}>20</MenuItem>
						<MenuItem value={30}>30</MenuItem>
					</Select>
				</FormControl>
				{children}
			</div>
			<div className={classes.dataGrid}>
				<DataGrid
					columns={columns}
					rows={filtered}
					pageSize={perPage}
					loading={filtered.length === 0 && NoData}
				></DataGrid>
			</div>
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

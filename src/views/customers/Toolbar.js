import React from 'react';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import exportData from '../../helpers/exportData';
import getDate from '../../helpers/dateGen';

const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: '1.4rem',
		padding: '1.5rem',
		'& *': {
			fontSize: 'inherit',
		},
		'& svg': {
			alignSelf: 'center',
			width: '2.5rem',
			height: '2.5rem',
		},
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
}));

const Toolbar = ({ search, className, data, ...rest }) => {
	const classes = useStyles();

	const { search: searchValue, setSearch } = search;
	//handles updating the search state of the customers parent component
	const handleChange = ({ target }) => {
		setSearch(target.value);
	};

	return (
		<>
			<div className={clsx(classes.root, className)} {...rest}>
				<Box display="flex" justifyContent="flex-end">
					<Button
						className={classes.importButton}
						component={Link}
						to="/import/customers"
					>
						Import
					</Button>
					<CSVLink
						data={exportData(data)}
						filename={`CustomersExport${getDate()}.csv`}
					>
						<Button className={classes.exportButton}>Export</Button>
					</CSVLink>

					<Button color="primary" variant="contained">
						Add customer
					</Button>
				</Box>
				<Box mt={3}>
					<Card>
						<CardContent>
							<Box maxWidth={500}>
								<TextField
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action">
													<SearchIcon />
												</SvgIcon>
											</InputAdornment>
										),
									}}
									placeholder="Search customer"
									variant="outlined"
									onChange={handleChange}
									value={searchValue}
								/>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</div>
		</>
	);
};

export default Toolbar;
